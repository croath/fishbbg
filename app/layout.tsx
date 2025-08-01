import '@/app/global.css';
import { RootProvider } from 'fumadocs-ui/provider';
import { Inter } from 'next/font/google';
import { GoogleAnalytics } from '@next/third-parties/google';
import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: '小鱼币币机 | 专业Web3区块链分析与投资策略',
    template: '%s | 小鱼币币机'
  },
  description: '小鱼币币机是专业的Web3区块链内容频道，由8年行业从业者小鱼创建。提供DeFi、加密货币、投资策略等深度分析，帮助用户理解区块链技术与数字资产投资。',
  keywords: 'Web3,区块链,DeFi,加密货币,比特币,以太坊,数字资产,投资策略,币圈,小鱼币币机',
  authors: [{ name: '小鱼·币币机 | Croath' }],
  creator: '小鱼·币币机',
  publisher: '小鱼币币机',
  metadataBase: new URL('https://fishbbg.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://fishbbg.com',
    title: '小鱼币币机 | 专业Web3区块链分析与投资策略',
    description: '8年区块链从业者分享Web3见闻、DeFi分析与投资策略。探索加密世界，发现真实价值。',
    siteName: '小鱼币币机',
    images: [
      {
        url: '/fishbbg.svg',
        width: 1200,
        height: 630,
        alt: '小鱼币币机 - Web3区块链内容频道',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cr0ath',
    creator: '@cr0ath',
    title: '小鱼币币机 | 专业Web3区块链分析与投资策略',
    description: '8年区块链从业者分享Web3见闻、DeFi分析与投资策略。',
    images: ['/fishbbg.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/fishbbg.svg',
    shortcut: '/fishbbg.svg',
    apple: '/fishbbg.svg',
  },
};

const inter = Inter({
  subsets: ['latin'],
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" className={inter.className} suppressHydrationWarning>
      <body className="flex flex-col min-h-screen">
        <RootProvider>{children}</RootProvider>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ''} />
      </body>
    </html>
  );
}
