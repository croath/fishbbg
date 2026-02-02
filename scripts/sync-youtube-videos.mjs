#!/usr/bin/env node
/**
 * 从 YouTube 频道 @fishbbg 同步未添加的视频到 content/docs/videos/
 *
 * 使用方法:
 *   YOUTUBE_API_KEY=your_api_key npm run sync-youtube
 *   或 在 .env 中设置 YOUTUBE_API_KEY
 *
 * 可选: --dry-run 仅预览，不写入文件
 *
 * 获取 API Key: https://console.cloud.google.com/apis/credentials
 * 需要启用: YouTube Data API v3、Cloud Translation API（用于翻译无英文标题）
 */

import { readFileSync, readdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const VIDEOS_DIR = join(ROOT, 'content/docs/videos');
const META_PATH = join(VIDEOS_DIR, 'meta.json');

// 加载 .env
const envPath = join(ROOT, '.env');
if (existsSync(envPath)) {
  const env = readFileSync(envPath, 'utf-8');
  for (const line of env.split('\n')) {
    const keyVal = line.match(/^\s*([A-Z_]+)\s*=\s*(.+?)\s*$/);
    if (keyVal) {
      const val = keyVal[2].replace(/^["']|["']$/g, '').trim();
      process.env[keyVal[1]] = val;
    }
  }
}

const API_KEY = process.env.YOUTUBE_API_KEY;
const TRANSLATE_API_KEY = process.env.GOOGLE_TRANSLATE_API_KEY || process.env.YOUTUBE_API_KEY;
const CHANNEL_HANDLE = 'fishbbg';
const DRY_RUN = process.argv.includes('--dry-run');

if (!API_KEY) {
  console.error('请设置 YOUTUBE_API_KEY 环境变量');
  console.error('获取 API Key: https://console.cloud.google.com/apis/credentials');
  console.error('需启用: YouTube Data API v3、Cloud Translation API（标题翻译用）');
  process.exit(1);
}

// 解析 ISO 8601 时长 (PT1H2M3S) 为秒数
function parseDuration(duration) {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  const hours = parseInt(match[1] || 0);
  const minutes = parseInt(match[2] || 0);
  const seconds = parseInt(match[3] || 0);
  return hours * 3600 + minutes * 60 + seconds;
}

function isShorts(durationSeconds) {
  return durationSeconds > 0 && durationSeconds <= 60;
}

// 从标题生成英文 slug（仅保留英文、数字、连字符）
function titleToSlug(title, videoId) {
  const cleaned = title
    .replace(/[#@]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const words = cleaned.match(/[a-zA-Z0-9]+/g) || [];
  const slug = words.join('-').toLowerCase().replace(/-+/g, '-').replace(/^-|-$/g, '');
  return { slug: slug.length >= 3 ? slug : null, needsTranslate: slug.length < 3 };
}

// 翻译为英文（标题无英文时使用）- 优先 MyMemory（无 key、稳定），备用 Google
async function translateToEnglish(text) {
  const input = text.slice(0, 500).trim();
  if (!input) return null;

  // 1. 优先 MyMemory（免费、无需 key、无速率限制问题）
  try {
    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(input)}&langpair=zh|en`;
    const res = await fetch(url);
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (translated && translated !== input) {
      await new Promise(r => setTimeout(r, 400)); // 限速，避免 MyMemory 日限额
      return translated;
    }
  } catch (e) {
    console.warn('MyMemory 翻译失败:', e.message);
  }

  // 2. 备用 Google（易触发 User Rate Limit Exceeded，批量翻译时慎用）
  if (TRANSLATE_API_KEY) {
    try {
      const url = `https://translation.googleapis.com/language/translate/v2?q=${encodeURIComponent(input)}&target=en&key=${TRANSLATE_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      const translated = data?.data?.translations?.[0]?.translatedText;
      if (translated) {
        await new Promise(r => setTimeout(r, 500)); // Google 速率限制严格
        return translated;
      }
      if (data?.error) {
        console.warn('Google 翻译:', data.error.message);
      }
    } catch (e) {
      console.warn('Google 翻译失败:', e.message);
    }
  }
  return null;
}

// 提取已有的 videoId（支持 vi/xxx, embed/xxx, videoId="xxx"）
function getExistingVideoIds() {
  const files = readdirSync(VIDEOS_DIR).filter(f => f.endsWith('.mdx'));
  const ids = new Set();
  const regex = /(?:vi|embed)\/([A-Za-z0-9_-]{11})|videoId="([A-Za-z0-9_-]{11})"/g;
  for (const file of files) {
    const content = readFileSync(join(VIDEOS_DIR, file), 'utf-8');
    let m;
    while ((m = regex.exec(content)) !== null) ids.add(m[1] || m[2]);
  }
  return ids;
}

async function fetchChannelId() {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=id,contentDetails&forHandle=${CHANNEL_HANDLE}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  if (!data.items?.length) throw new Error('频道未找到');
  return data.items[0];
}

async function fetchAllUploads(channel) {
  const uploadsPlaylistId = channel.contentDetails.relatedPlaylists.uploads;
  const videos = [];
  let pageToken = '';

  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&playlistId=${uploadsPlaylistId}&maxResults=50&pageToken=${pageToken}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    videos.push(...(data.items || []));
    pageToken = data.nextPageToken || '';
  } while (pageToken);

  return videos;
}

async function fetchVideoDetails(videoIds) {
  const details = new Map();
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50);
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${batch.join(',')}&key=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    for (const item of data.items || []) {
      details.set(item.id, item);
    }
  }
  return details;
}

function generateMdx(video, isShort) {
  const { id, snippet } = video;
  const title = snippet.title.replace(/\s*\|\s*.*$/, '').trim();
  const date = snippet.publishedAt.slice(0, 10);
  const fullDescription = (snippet.description || title).trim();
  const keywords = snippet.tags?.slice(0, 5).join(',') || '加密货币,区块链,小鱼币币机,fishbbg';

  const frontmatter = `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(fullDescription)}
keywords: ${keywords}
date: "${date}"
image: "https://img.youtube.com/vi/${id}/maxresdefault.jpg"
---
`;

  if (isShort) {
    return frontmatter + `
import YouTubeShorts from '@/components/YouTubeShorts';

<YouTubeShorts videoId="${id}" title="${title.replace(/"/g, '&quot;')} 小鱼币币机 fishbbg" />


## 本期内容

${fullDescription}
`;
  }

  return frontmatter + `
<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
  <iframe 
    src="https://www.youtube.com/embed/${id}" 
    title="${title.replace(/"/g, '&quot;')} 小鱼币币机 fishbbg" 
    style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      border: 'none',
      borderRadius: '8px'
    }}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
    referrerPolicy="strict-origin-when-cross-origin" 
    allowFullScreen
  />
</div>

## 本期视频内容

${fullDescription}
`;
}

async function main() {
  console.log('正在获取频道信息...');
  const channel = await fetchChannelId();
  console.log('正在获取视频列表...');
  const playlistItems = await fetchAllUploads(channel);
  const videoIds = playlistItems.map(i => i.contentDetails.videoId);

  console.log(`找到 ${videoIds.length} 个视频，正在获取详情...`);
  const detailsMap = await fetchVideoDetails(videoIds);

  const existingIds = getExistingVideoIds();
  const meta = JSON.parse(readFileSync(META_PATH, 'utf-8'));
  const existingSlugs = new Set(
    readdirSync(VIDEOS_DIR)
      .filter(f => f.endsWith('.mdx'))
      .map(f => f.replace(/\.mdx$/, ''))
  );

  const newVideos = [];
  for (const item of playlistItems) {
    const videoId = item.contentDetails.videoId;
    if (existingIds.has(videoId)) continue;

    const details = detailsMap.get(videoId);
    if (!details) continue;

    const duration = parseDuration(details.contentDetails?.duration || 'PT0S');
    const isShort = isShorts(duration);
    const title = details.snippet.title.replace(/\s*\|\s*.*$/, '').trim();
    let { slug, needsTranslate } = titleToSlug(title, videoId);

    if (needsTranslate) {
      const translated = await translateToEnglish(title);
      if (translated) {
        const fromTranslated = titleToSlug(translated, videoId);
        if (fromTranslated.slug) {
          slug = fromTranslated.slug;
          console.log(`翻译: "${title.slice(0, 30)}..." -> "${translated.slice(0, 40)}..." -> ${slug}`);
        }
      }
    }
    if (!slug) slug = videoId;

    let finalSlug = slug;
    if (existingSlugs.has(slug)) {
      finalSlug = `${slug}-${videoId}`;
      console.log(`注意: "${title}" 的 slug 与已有重复，使用 ${finalSlug}`);
    }
    existingSlugs.add(finalSlug);

    newVideos.push({ ...details, _isShort: isShort, _slug: finalSlug });
  }

  if (newVideos.length === 0) {
    console.log('没有发现新视频，列表已是最新！');
    return;
  }

  console.log(`\n发现 ${newVideos.length} 个新视频:`);
  for (const v of newVideos) {
    const type = v._isShort ? '[Shorts]' : '[长视频]';
    console.log(`  ${type} ${v.snippet.title} -> ${v._slug}.mdx`);
  }

  if (DRY_RUN) {
    console.log('\n[--dry-run] 仅预览，未写入文件');
    return;
  }

  for (const video of newVideos) {
    const slug = video._slug;
    const mdx = generateMdx(video, video._isShort);
    const filepath = join(VIDEOS_DIR, `${slug}.mdx`);
    writeFileSync(filepath, mdx);
    console.log(`已创建: ${slug}.mdx`);
    meta.pages.push(slug);
  }

  // 按日期倒序排列（最新的在前）
  const allMdx = readdirSync(VIDEOS_DIR).filter(f => f.endsWith('.mdx'));
  const slugToDate = new Map();
  for (const file of allMdx) {
    const content = readFileSync(join(VIDEOS_DIR, file), 'utf-8');
    const dateMatch = content.match(/date:\s*["']([^"']+)["']/);
    slugToDate.set(file.replace('.mdx', ''), dateMatch?.[1] || '1970-01-01');
  }
  meta.pages.sort((a, b) => (slugToDate.get(b) || '').localeCompare(slugToDate.get(a) || ''));

  writeFileSync(META_PATH, JSON.stringify(meta, null, 2) + '\n');
  console.log('\n已更新 meta.json');
  console.log('完成！');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
