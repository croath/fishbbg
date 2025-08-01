'use client';

interface VideoStructuredDataProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  embedUrl: string;
}

export function VideoStructuredData({
  title,
  description,
  thumbnailUrl,
  uploadDate,
  duration = 'PT10M',
  embedUrl,
}: VideoStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: description,
    thumbnailUrl: thumbnailUrl,
    uploadDate: uploadDate,
    duration: duration,
    embedUrl: embedUrl,
    author: {
      '@type': 'Person',
      name: '小鱼·币币机',
      url: 'https://fishbbg.com',
    },
    publisher: {
      '@type': 'Organization',
      name: '小鱼币币机',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fishbbg.com/fishbbg.svg',
      },
    },
    inLanguage: 'zh-CN',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function OrganizationStructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: '小鱼币币机',
    url: 'https://fishbbg.com',
    logo: 'https://fishbbg.com/fishbbg.svg',
    description: '专业的Web3区块链内容频道，提供DeFi分析、加密货币投资策略、区块链技术解读',
    founder: {
      '@type': 'Person',
      name: '小鱼·币币机',
    },
    sameAs: [
      'https://www.youtube.com/@fishbbg',
      'https://x.com/cr0ath',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `https://fishbbg.com${item.url}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}