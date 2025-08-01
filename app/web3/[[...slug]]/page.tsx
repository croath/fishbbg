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

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>;
}) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();

  const MDXContent = page.data.body;

  return (
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
