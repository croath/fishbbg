#!/usr/bin/env node
/**
 * 翻译 API 诊断脚本 - 检测 Google / MyMemory 翻译失败原因
 * 运行: node scripts/test-translate.mjs
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// 加载 .env
const envPath = join(ROOT, '.env');
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.+?)\s*$/);
    if (m) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '').trim();
  }
}

const API_KEY = process.env.YOUTUBE_API_KEY || process.env.GOOGLE_TRANSLATE_API_KEY;
const testText = '我在北京买房亏了300万';

async function testGoogle() {
  console.log('\n========== Google Cloud Translation API ==========');
  if (!API_KEY) {
    console.log('❌ 未设置 YOUTUBE_API_KEY 或 GOOGLE_TRANSLATE_API_KEY');
    return;
  }
  console.log('API Key 前8位:', API_KEY.slice(0, 8) + '...');

  const url = `https://translation.googleapis.com/language/translate/v2?q=${encodeURIComponent(testText)}&target=en&key=${API_KEY}`;
  try {
    const res = await fetch(url);
    const text = await res.text();

    console.log('HTTP 状态:', res.status, res.statusText);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.log('❌ 响应非 JSON，前 500 字符:', text.slice(0, 500));
      return;
    }

    if (data?.data?.translations?.[0]?.translatedText) {
      console.log('✅ 成功:', data.data.translations[0].translatedText);
      return;
    }

    if (data?.error) {
      const err = data.error;
      console.log('❌ API 错误:');
      console.log('   错误码:', err.code);
      console.log('   信息:', err.message);
      if (err.status) console.log('   Status:', err.status);
      if (err.details) console.log('   详情:', JSON.stringify(err.details, null, 2));

      // 常见原因说明
      if (err.code === 403) {
        if (err.message?.includes('API has not been used') || err.message?.includes('not enabled')) {
          console.log('\n💡 可能原因: Cloud Translation API 未启用');
          console.log('   解决: https://console.cloud.google.com/apis/library/translate.googleapis.com');
        } else if (err.message?.includes('dailyLimitExceeded') || err.message?.includes('quota')) {
          console.log('\n💡 可能原因: 日配额已用完');
        } else if (err.message?.includes('referer') || err.message?.includes('restricted')) {
          console.log('\n💡 可能原因: API Key 有域名/IP 限制，Node 脚本无法通过');
        }
      }
      if (err.code === 400 && err.message?.includes('key')) {
        console.log('\n💡 可能原因: API Key 无效或类型错误（需用公开 API Key，不是 OAuth）');
      }
    } else {
      console.log('❌ 未知响应:', JSON.stringify(data, null, 2).slice(0, 500));
    }
  } catch (e) {
    console.log('❌ 请求异常:', e.message);
  }
}

async function testMyMemory() {
  console.log('\n========== MyMemory 免费 API（备用） ==========');
  const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(testText)}&langpair=zh|en`;
  try {
    const res = await fetch(url);
    const data = await res.json();

    console.log('HTTP 状态:', res.status);

    const translated = data?.responseData?.translatedText;
    if (translated) {
      console.log('✅ 成功:', translated);
      if (data.responseStatus === 200 && data.responseDetails) {
        console.log('   备注:', data.responseDetails);
      }
    } else {
      console.log('❌ 失败:', JSON.stringify(data, null, 2).slice(0, 400));
    }
  } catch (e) {
    console.log('❌ 请求异常:', e.message);
  }
}

async function main() {
  console.log('测试文本:', testText);
  await testGoogle();
  await testMyMemory();
  console.log('\n');
}

main();
