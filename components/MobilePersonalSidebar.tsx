import React from 'react';
import Link from 'next/link';
import { BinanceIcon, OKXIcon, BitgetIcon, TradingViewIcon, BybitIcon, OneKeyIcon } from '@/components/SocialIcons';

export default function MobilePersonalSidebar() {
  const affiliateLinks = [
    {
      name: 'Binance',
      href: 'https://accounts.maxweb.cc/register?ref=B93ZC80D',
      icon: BinanceIcon,
      title: '币安 Binance',
      description: '返佣20% + 专属优惠',
      bgGradient: 'from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100',
      darkBgGradient: 'dark:from-yellow-900/20 dark:to-orange-900/20 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30',
      borderColor: 'border-yellow-200 dark:border-yellow-700',
      iconColor: 'text-yellow-500'
    },
    {
      name: 'OKX',
      href: 'https://okx.com/join/1885948',
      icon: OKXIcon,
      title: 'OKX',
      description: '全球领先加密交易所',
      bgGradient: 'from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100',
      darkBgGradient: 'dark:from-blue-900/20 dark:to-cyan-900/20 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30',
      borderColor: 'border-blue-200 dark:border-blue-700',
      iconColor: 'text-black dark:text-white'
    },
    {
      name: 'Bybit',
      href: 'https://partner.bybit.com/b/FISHBBG',
      icon: BybitIcon,
      title: 'Bybit',
      description: '全球领先衍生品交易所',
      bgGradient: 'from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100',
      darkBgGradient: 'dark:from-orange-900/20 dark:to-red-900/20 dark:hover:from-orange-900/30 dark:hover:to-red-900/30',
      borderColor: 'border-orange-200 dark:border-orange-700',
      iconColor: ''
    },
    {
      name: 'OKX Wallet',
      href: 'https://web3.okx.com/ul/joindex?ref=FISHBBG',
      icon: OKXIcon,
      title: 'OKX 钱包',
      description: '返佣20% + Web3钱包',
      bgGradient: 'from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100',
      darkBgGradient: 'dark:from-orange-900/20 dark:to-amber-900/20 dark:hover:from-orange-900/30 dark:hover:to-amber-900/30',
      borderColor: 'border-orange-200 dark:border-orange-700',
      iconColor: 'text-black dark:text-white'
    },
    {
      name: 'Bitget',
      href: 'https://www.bitget.com/zh-CN/referral/register?clacCode=90ALNAHU',
      icon: BitgetIcon,
      title: 'Bitget',
      description: '跟单交易和衍生品',
      bgGradient: 'from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100',
      darkBgGradient: 'dark:from-green-900/20 dark:to-teal-900/20 dark:hover:from-green-900/30 dark:hover:to-teal-900/30',
      borderColor: 'border-green-200 dark:border-green-700',
      iconColor: ''
    },
    {
      name: 'TradingView',
      href: 'https://www.tradingview.com/?aff_id=155903&source=fishbbgcom',
      icon: TradingViewIcon,
      title: 'TradingView',
      description: '专业图表分析工具',
      bgGradient: 'from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100',
      darkBgGradient: 'dark:from-indigo-900/20 dark:to-purple-900/20 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30',
      borderColor: 'border-indigo-200 dark:border-indigo-700',
      iconColor: ''
    },
    {
      name: 'OneKey',
      href: 'https://onekey.so/r/ATXWM9',
      icon: OneKeyIcon,
      title: 'OneKey 硬件钱包',
      description: '下单立减 $10',
      bgGradient: 'from-emerald-50 to-green-50 hover:from-emerald-100 hover:to-green-100',
      darkBgGradient: 'dark:from-emerald-900/20 dark:to-green-900/20 dark:hover:from-emerald-900/30 dark:hover:to-green-900/30',
      borderColor: 'border-emerald-200 dark:border-emerald-700',
      iconColor: ''
    }
  ];

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">🎁 优惠注册</h3>
      
      {/* iPhone: 一行2个 (grid-cols-2) */}
      {/* iPad: 一行4个 (md:grid-cols-4) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {affiliateLinks.map((link) => {
          const IconComponent = link.icon;
          return (
            <Link
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                flex items-center gap-3 p-3
                bg-gradient-to-r ${link.bgGradient} ${link.darkBgGradient}
                rounded-lg transition-all group border ${link.borderColor}
                no-underline hover:no-underline
              `}
            >
              <IconComponent 
                className={`${link.iconColor} flex-shrink-0`} 
                size={18} 
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {link.title}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400 truncate">
                  {link.description}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
