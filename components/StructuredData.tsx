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

interface ArticleStructuredDataProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  keywords?: string;
  image?: string;
  url: string;
}

export function ArticleStructuredData({
  title,
  description,
  datePublished,
  dateModified,
  keywords,
  image,
  url,
}: ArticleStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: '小鱼·币币机',
      url: 'https://fishbbg.com/web3/aboutme',
    },
    publisher: {
      '@type': 'Organization',
      name: '小鱼币币机',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fishbbg.com/fishbbg.svg',
      },
    },
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://fishbbg.com${url}`,
    },
    inLanguage: 'zh-CN',
    ...(keywords && { keywords: keywords.split(',').map(k => k.trim()) }),
    ...(image && {
      image: {
        '@type': 'ImageObject',
        url: image,
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface PersonStructuredDataProps {
  name: string;
  description: string;
  url: string;
  sameAs?: string[];
  jobTitle?: string;
  worksFor?: string;
}

export function PersonStructuredData({
  name,
  description,
  url,
  sameAs = [],
  jobTitle = 'Web3 内容创作者',
  worksFor = '小鱼币币机',
}: PersonStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: name,
    description: description,
    url: url,
    jobTitle: jobTitle,
    worksFor: {
      '@type': 'Organization',
      name: worksFor,
    },
    sameAs: sameAs,
    knowsAbout: [
      'Web3',
      '区块链',
      'DeFi',
      '加密货币',
      'Solana',
      '投资策略',
      '凯利公式',
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}

interface WebSiteStructuredDataProps {
  name: string;
  url: string;
  description: string;
  potentialAction?: {
    '@type': string;
    target: string;
    'query-input': string;
  };
}

export function WebSiteStructuredData({
  name,
  url,
  description,
  potentialAction,
}: WebSiteStructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: name,
    url: url,
    description: description,
    inLanguage: 'zh-CN',
    publisher: {
      '@type': 'Organization',
      name: '小鱼币币机',
      logo: {
        '@type': 'ImageObject',
        url: 'https://fishbbg.com/fishbbg.svg',
      },
    },
    ...(potentialAction && { potentialAction }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}