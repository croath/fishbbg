import { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();
  
  const urls: MetadataRoute.Sitemap = [
    {
      url: 'https://fishbbg.com',
      lastModified: new Date(),
      changeFrequency: 'daily', // 首页经常更新
      priority: 1,
    },
    {
      url: 'https://fishbbg.com/web3',
      lastModified: new Date(),
      changeFrequency: 'daily', // 内容目录页经常更新
      priority: 0.9,
    },
  ];

  // 添加所有内容页面
  pages.forEach((page) => {
    if (page.url && !page.url.includes('api')) {
      let changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
      
      if (page.url.includes('/videos/')) {
        changeFreq = 'weekly'; // 视频内容偶尔更新
      } else if (page.url === '/web3/index') {
        changeFreq = 'daily'; // 主要介绍页面
      } else {
        changeFreq = 'weekly'; // 其他静态内容
      }
      
      urls.push({
        url: `https://fishbbg.com${page.url}`,
        lastModified: page.data.date ? new Date(page.data.date) : new Date(),
        changeFrequency: changeFreq,
        priority: page.url.includes('/videos/') ? 0.8 : 0.7,
      });
    }
  });

  return urls;
}