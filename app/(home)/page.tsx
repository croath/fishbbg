import Link from 'next/link';
import Image from 'next/image';
import { source } from '@/lib/source';
import { FaYoutube, FaTelegram, FaDiscord, FaEnvelope, FaInstagram, FaWeixin, FaPodcast } from 'react-icons/fa';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';
import { 
  XiaohongshuIcon, 
  BilibiliIcon, 
  BinanceIcon,
  OKXIcon,
  BitgetIcon,
  TradingViewIcon 
} from '@/components/SocialIcons';
import { OrganizationStructuredData, WebSiteStructuredData } from '@/components/StructuredData';
import CopyEmailButton from '@/components/CopyEmailButton';
import type { Metadata } from 'next';

// 获取所有视频
async function getVideos() {
  const pages = source.getPages();
  
  const videos = pages
    .filter(page => page.url.startsWith('/web3/videos/'))
    .map(page => ({
      title: page.data.title || '未命名视频',
      description: page.data.description || '暂无描述',
      url: page.url,
      date: page.data.date || '2025-01-01',
      image: page.data.image || '/fishbbg.svg',
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return videos;
}

// 生成首页的动态 metadata
export async function generateMetadata(): Promise<Metadata> {
  const videos = await getVideos();
  const latestVideo = videos[0];
  
  const description = latestVideo 
    ? `最新视频：${latestVideo.title}。8年区块链从业者分享Web3见闻、DeFi分析与投资策略。探索加密世界，发现真实价值。`
    : '8年区块链从业者分享Web3见闻、DeFi分析与投资策略。探索加密世界，发现真实价值。';
  
  const imageUrl = latestVideo?.image || '/fishbbg.svg';

  return {
    title: '小鱼币币机 | 专业Web3区块链分析与投资策略',
    description,
    keywords: 'Web3,区块链,DeFi,加密货币,比特币,以太坊,数字资产,投资策略,币圈,小鱼币币机,视频教程',
    alternates: {
      canonical: 'https://fishbbg.com',
    },
    openGraph: {
      title: '小鱼币币机 | 专业Web3区块链分析与投资策略',
      description,
      url: 'https://fishbbg.com',
      siteName: '小鱼币币机',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: latestVideo ? `最新视频：${latestVideo.title}` : '小鱼币币机 - Web3区块链内容频道',
        },
      ],
      locale: 'zh_CN',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      site: '@cr0ath',
      creator: '@cr0ath',
      title: '小鱼币币机 | 专业Web3区块链分析与投资策略',
      description,
      images: [imageUrl],
    },
  };
}

export default async function HomePage() {
  const videos = await getVideos();
  const featuredVideo = videos[0]; // 最新视频作为推荐

  return (
    <>
      <OrganizationStructuredData />
      <WebSiteStructuredData
        name="小鱼币币机"
        url="https://fishbbg.com"
        description="专业的Web3区块链内容频道，提供DeFi分析、加密货币投资策略、区块链技术解读"
      />
      <main className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
        {/* 左侧：频道介绍和个人信息 */}
        <div className="lg:col-span-1 space-y-4 lg:space-y-6">
          {/* 个人头像和社交链接 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/fishbbg.svg"
                alt="小鱼头像"
                width={96}
                height={96}
                className="rounded-full border-2 border-gray-200 dark:border-gray-600"
              />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-gray-900 dark:text-white">小鱼·币币机 | Croath</h3>
            <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-4">8年区块链从业者 | 产品研发 | 经济模型设计</p>
            
            {/* 社交链接卡片 - 每行2个 */}
            <div className="grid grid-cols-2 gap-2">
              <Link 
                href="https://www.youtube.com/@fishbbg?sub_confirmation=1"
                className="flex items-center gap-2 p-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-lg transition-colors group"
              >
                <FaYoutube className="text-red-600 text-sm flex-shrink-0" />
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">YouTube</div>
              </Link>

              <Link 
                href="https://space.bilibili.com/3546938572016024"
                className="flex items-center gap-2 p-2 bg-pink-50 hover:bg-pink-100 dark:bg-pink-900/20 dark:hover:bg-pink-900/30 rounded-lg transition-colors group"
              >
                <BilibiliIcon className="text-pink-500 text-sm flex-shrink-0" size={14} />
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">哔哩哔哩</div>
              </Link>

              <Link 
                href="https://www.xiaohongshu.com/user/profile/5ead00210000000001005654"
                className="flex items-center gap-2 p-2 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 rounded-lg transition-colors group"
              >
                <XiaohongshuIcon className="text-red-500 text-sm flex-shrink-0" size={14} />
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">小红书</div>
              </Link>

              <Link 
                href="https://www.instagram.com/fishbbgcrypto"
                className="flex items-center gap-2 p-2 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 rounded-lg transition-colors group"
              >
                <FaInstagram className="text-purple-600 text-sm flex-shrink-0" />
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">Instagram</div>
              </Link>

              <Link 
                href="https://www.binance.com/square/profile/fishbbg"
                className="flex items-center gap-2 p-2 bg-yellow-50 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:hover:bg-yellow-900/30 rounded-lg transition-colors group"
              >
                <BinanceIcon className="text-yellow-500 text-sm flex-shrink-0" size={14} />
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">币安广场</div>
              </Link>

              <Link 
                href="https://v.douyin.com/F9guq8ikIjI/"
                className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
              >
                <FaTiktok className="text-black dark:text-white text-sm flex-shrink-0" />
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">抖音</div>
              </Link>

              <Link 
                href="https://weixin.qq.com/sph/AcWKPJptO"
                className="flex items-center gap-2 p-2 bg-green-50 hover:bg-green-100 dark:bg-green-900/20 dark:hover:bg-green-900/30 rounded-lg transition-colors group"
              >
                <FaWeixin className="text-green-600 text-sm flex-shrink-0" />
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">微信视频号</div>
              </Link>

              <Link 
                href="https://www.xiaoyuzhoufm.com/podcast/68a2dc95f97ab192b5f6d0a6"
                className="flex items-center gap-2 p-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition-colors group"
              >
                <FaPodcast className="text-blue-500 text-sm flex-shrink-0" />
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">小宇宙播客</div>
              </Link>

              <Link 
                href="https://x.com/intent/user?screen_name=cr0ath"
                className="flex items-center gap-2 p-2 bg-gray-50 hover:bg-gray-100 dark:bg-gray-700/50 dark:hover:bg-gray-700 rounded-lg transition-colors group"
              >
                <FaXTwitter className="text-black dark:text-white text-sm flex-shrink-0" />
                <div className="text-xs font-medium text-gray-900 dark:text-white truncate">X / Twitter</div>
              </Link>

              <div className="col-span-2">
                <div className="flex items-center gap-2 p-2 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 rounded-lg transition-colors group">
                  <FaEnvelope className="text-blue-600 text-sm flex-shrink-0" />
                  <div className="text-xs font-medium text-gray-900 dark:text-white flex items-center gap-2 truncate">
                    <span className="truncate">business@fishbbg.com</span>
                    <CopyEmailButton email="business@fishbbg.com" />
                  </div>
                </div>
              </div>
            </div>

            {/* 优惠注册链接 */}
            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
              <h4 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">🎁 优惠注册</h4>
              <div className="space-y-2">
                <Link 
                  href="https://accounts.maxweb.cc/register?ref=B93ZC80D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 hover:from-yellow-100 hover:to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 dark:hover:from-yellow-900/30 dark:hover:to-orange-900/30 rounded-lg transition-all group border border-yellow-200 dark:border-yellow-700"
                >
                  <BinanceIcon className="text-yellow-500 text-lg flex-shrink-0" size={18} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">币安 Binance</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">返佣20% + 专属优惠</div>
                  </div>
                  <div className="text-xs bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full font-medium">
                    推荐
                  </div>
                </Link>

                <Link 
                  href="https://okx.com/join/1885948"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 dark:from-blue-900/20 dark:to-cyan-900/20 dark:hover:from-blue-900/30 dark:hover:to-cyan-900/30 rounded-lg transition-all group border border-blue-200 dark:border-blue-700"
                >
                  <OKXIcon className="text-black dark:text-white flex-shrink-0" size={18} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">OKX</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">全球领先加密交易所</div>
                  </div>
                  <div className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full font-medium">
                    推荐
                  </div>
                </Link>

                <Link 
                  href="https://web3.okx.com/ul/joindex?ref=FISHBBG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 hover:from-orange-100 hover:to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20 dark:hover:from-orange-900/30 dark:hover:to-amber-900/30 rounded-lg transition-all group border border-orange-200 dark:border-orange-700"
                >
                  <OKXIcon className="text-black dark:text-white flex-shrink-0" size={18} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">OKX 钱包</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">返佣20% + Web3钱包</div>
                  </div>
                  <div className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full font-medium">
                    推荐
                  </div>
                </Link>

                <Link 
                  href="https://www.bitget.com/zh-CN/referral/register?clacCode=90ALNAHU"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-teal-50 hover:from-green-100 hover:to-teal-100 dark:from-green-900/20 dark:to-teal-900/20 dark:hover:from-green-900/30 dark:hover:to-teal-900/30 rounded-lg transition-all group border border-green-200 dark:border-green-700"
                >
                  <BitgetIcon className="flex-shrink-0" size={18} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">Bitget</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">跟单交易和衍生品</div>
                  </div>
                  <div className="text-xs bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-200 px-2 py-1 rounded-full font-medium">
                    推荐
                  </div>
                </Link>

                <Link 
                  href="https://www.tradingview.com/?aff_id=155903&source=fishbbgcom"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 dark:from-indigo-900/20 dark:to-purple-900/20 dark:hover:from-indigo-900/30 dark:hover:to-purple-900/30 rounded-lg transition-all group border border-indigo-200 dark:border-indigo-700"
                >
                  <TradingViewIcon className="flex-shrink-0" size={18} />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">TradingView</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">专业图表分析工具</div>
                  </div>
                  <div className="text-xs bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 px-2 py-1 rounded-full font-medium">
                    优惠
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* 频道信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold mb-3 text-gray-900 dark:text-white">关于频道</h3>
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
              欢迎来到小鱼币币机。我在 2017 年进入 web3 行业，在区块链领域已经做了 8 年时间的产品研发和经济模型设计工作。
            </p>
            <br />
            <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
              在这个频道里，我会从一个从业者的角度出发，和大家分享 web3 领域的见闻、趋势、分析与洞察，用最通俗易懂的语言讨论最新行业动向。
            </p>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 rounded">
              <p className="text-blue-800 dark:text-blue-200 text-xs font-medium">
                💡 技术在更新、市场在变革、流动性在涌动穿梭，唯有持续学习，才能立于不败之地。
              </p>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold mb-3 text-gray-900 dark:text-white">频道数据</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600 dark:text-gray-400">视频总数</span>
                <span className="font-medium text-gray-900 dark:text-white">{videos.length}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600 dark:text-gray-400">更新频率</span>
                <span className="font-medium text-gray-900 dark:text-white">每周更新</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600 dark:text-gray-400">内容领域</span>
                <span className="font-medium text-gray-900 dark:text-white">Web3 · DeFi · 区块链</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：Hero背景板和全部视频 */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Section - 完整背景板 */}
          <div className="bg-gradient-to-br from-slate-900 via-emerald-900/80 to-black rounded-lg p-4 md:p-8 text-white shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">🐟 小鱼币币机</h1>
              <Link
                href="https://www.youtube.com/@fishbbg?sub_confirmation=1"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 text-sm sm:text-base whitespace-nowrap"
              >
                <FaYoutube />
                关注 YouTube
              </Link>
            </div>
            <p className="text-lg sm:text-xl mb-6">探索加密世界，发现真实价值</p>
            
            {featuredVideo && (
              <div className="bg-white/10 rounded-lg p-4 sm:p-6 backdrop-blur">
                <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center">
                  🌟 推荐视频
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
                  <div>
                    <h3 className="text-base sm:text-lg font-medium mb-2">{featuredVideo.title}</h3>
                    <p className="text-white/80 mb-4 text-sm sm:text-base">{featuredVideo.description}</p>
                    <Link 
                      href={featuredVideo.url}
                      className="inline-flex items-center px-3 sm:px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-white/90 transition-colors text-sm sm:text-base"
                    >
                      观看视频 →
                    </Link>
                  </div>
                  <div className="relative">
                    <Link href={featuredVideo.url}>
                      <Image
                        src={featuredVideo.image || '/fishbbg.svg'}
                        alt={featuredVideo.title}
                        width={480}
                        height={270}
                        className="rounded-lg hover:opacity-90 transition-opacity cursor-pointer w-full h-auto"
                      />
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* 全部视频列表 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-gray-900 dark:text-white">📺 全部视频</h2>
            <div className="space-y-3">
              {videos.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">暂无视频内容</p>
                  <p className="text-sm text-gray-400 dark:text-gray-500">视频总数: {videos.length}</p>
                </div>
              ) : (
                videos.map((video, index) => (
                <Link 
                  key={video.url}
                  href={video.url}
                  className="group block"
                >
                  <div className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 hover:shadow-sm dark:hover:shadow-lg transition-all bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={video.image || '/fishbbg.svg'}
                        alt={video.title}
                        width={120}
                        height={68}
                        className="rounded-md group-hover:opacity-90 transition-opacity w-[120px] h-[68px] object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 dark:bg-gray-800/90 rounded-full p-1.5">
                          <svg className="w-4 h-4 text-gray-800 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1 text-sm sm:text-base line-clamp-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm line-clamp-1 mb-2">
                        {video.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>{new Date(video.date || '2025-01-01').toLocaleDateString('zh-CN')}</span>
                        <span className="mx-2">•</span>
                        <span>小鱼币币机</span>
                      </div>
                    </div>
                  </div>
                </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
