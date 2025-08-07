import { MetadataRoute } from 'next';
import { source } from '@/lib/source';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = source.getPages();
  
  const urls: MetadataRoute.Sitemap = [
    {
      url: 'https://fishbbg.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://fishbbg.com/web3',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // 添加所有内容页面，按类型分类优化
  pages.forEach((page) => {
    if (page.url && !page.url.includes('api')) {
      let changeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
      let priority: number;
      
      // 根据内容类型优化SEO参数
      if (page.url.includes('/videos/')) {
        // 视频内容 - 高价值内容，更新频率适中
        changeFreq = 'monthly';
        priority = 0.8;
      } else if (page.url === '/web3' || page.url === '/web3/index') {
        // 主要介绍页面 - 高优先级
        changeFreq = 'weekly';
        priority = 0.9;
      } else if (page.url.includes('aboutme')) {
        // 个人介绍页面 - 中等优先级，偶尔更新
        changeFreq = 'monthly';
        priority = 0.6;
      } else if (page.url.includes('exchange') || page.url.includes('solana-validator')) {
        // 技术分析文章 - 高价值内容
        changeFreq = 'monthly';
        priority = 0.75;
      } else {
        // 其他内容页面
        changeFreq = 'monthly';
        priority = 0.7;
      }
      
      // 根据内容新鲜度调整最后修改时间
      const lastModified = page.data.date 
        ? new Date(page.data.date) 
        : new Date('2025-01-01'); // 为没有日期的内容设置默认日期
      
      urls.push({
        url: `https://fishbbg.com${page.url}`,
        lastModified,
        changeFrequency: changeFreq,
        priority,
      });
    }
  });

  // 按优先级排序，SEO友好
  return urls.sort((a, b) => (b.priority || 0) - (a.priority || 0));
}