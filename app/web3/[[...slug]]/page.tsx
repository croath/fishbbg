import { source } from '@/lib/source';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';
import { createRelativeLink } from 'fumadocs-ui/mdx';
import { getMDXComponents } from '@/mdx-components';
import { 
  ArticleStructuredData, 
  VideoStructuredData, 
  BreadcrumbStructuredData 
} from '@/components/StructuredData';

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;
  
  // 构建面包屑导航数据
  const breadcrumbItems = [
    { name: '首页', url: '/' },
    { name: 'Web3', url: '/web3' },
  ];
  
  // 根据页面路径添加面包屑
  if (params.slug && params.slug.length > 0) {
    const segments = params.slug;
    let currentPath = '/web3';
    
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      if (index === segments.length - 1) {
        breadcrumbItems.push({ name: page.data.title, url: currentPath });
      } else {
        // 对于中间路径，可以从source中获取页面标题
        const intermediatePage = source.getPage(segments.slice(0, index + 1));
        breadcrumbItems.push({ 
          name: intermediatePage?.data.title || segment, 
          url: currentPath 
        });
      }
    });
  }

  const isVideoContent = page.url?.includes('/videos/');
  const hasDate = !!page.data.date;

  return (
    <>
      {/* 面包屑结构化数据 */}
      <BreadcrumbStructuredData items={breadcrumbItems} />
      
      {/* 根据内容类型添加对应的结构化数据 */}
      {isVideoContent && page.data.image && hasDate && page.data.date ? (
        <VideoStructuredData
          title={page.data.title}
          description={page.data.description || ''}
          thumbnailUrl={page.data.image}
          uploadDate={new Date(page.data.date).toISOString()}
          embedUrl={`https://fishbbg.com${page.url}`}
        />
      ) : hasDate && page.data.date ? (
        <ArticleStructuredData
          title={page.data.title}
          description={page.data.description || ''}
          datePublished={new Date(page.data.date).toISOString()}
          keywords={page.data.keywords}
          image={page.data.image}
          url={page.url}
        />
      ) : null}
      
      <DocsPage toc={page.data.toc} full={page.data.full}>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDXContent
            components={getMDXComponents({
              // this allows you to link to other pages with relative file paths
              a: createRelativeLink(source, page),
            })}
          />
        </DocsBody>
      </DocsPage>
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const pageUrl = `https://fishbbg.com${page.url}`;
  const imageUrl = page.data.image || '/fishbbg.svg';
  const pageTitle = page.data.title || '小鱼币币机';
  const pageDescription = page.data.description || '8年区块链从业者分享Web3见闻、DeFi分析与投资策略';
  const keywords = page.data.keywords || 'Web3,区块链,DeFi,加密货币,小鱼币币机';

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: '小鱼币币机',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: 'zh_CN',
      type: 'article',
      publishedTime: page.data.date ? new Date(page.data.date).toISOString() : undefined,
      authors: ['小鱼·币币机'],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@cr0ath',
      creator: '@cr0ath',
      title: pageTitle,
      description: pageDescription,
      images: [imageUrl],
    },
  };
}
