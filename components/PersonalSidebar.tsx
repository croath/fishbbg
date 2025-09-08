import Link from 'next/link';
import Image from 'next/image';
import { FaYoutube, FaEnvelope, FaInstagram, FaWeixin, FaPodcast } from 'react-icons/fa';
import { FaXTwitter, FaTiktok } from 'react-icons/fa6';
import { 
  XiaohongshuIcon, 
  BilibiliIcon, 
  BinanceIcon,
  OKXIcon,
  BitgetIcon,
  TradingViewIcon,
  BybitIcon 
} from '@/components/SocialIcons';
import CopyEmailButton from '@/components/CopyEmailButton';

export default function PersonalSidebar() {
  return (
    <div className="space-y-6">
      {/* 个人头像和社交链接 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 text-center">
        <div className="relative w-20 h-20 mx-auto mb-3">
          <Image
            src="/fishbbg.svg"
            alt="小鱼头像"
            width={80}
            height={80}
            className="rounded-full border-2 border-gray-200 dark:border-gray-600"
          />
        </div>
        <h3 className="text-lg font-bold mb-2 text-gray-900 dark:text-white">小鱼·币币机</h3>
        <p className="text-gray-600 dark:text-gray-300 text-xs mb-4">8年区块链从业者</p>
        
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
              href="https://partner.bybit.com/b/FISHBBG"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 dark:from-orange-900/20 dark:to-red-900/20 dark:hover:from-orange-900/30 dark:hover:to-red-900/30 rounded-lg transition-all group border border-orange-200 dark:border-orange-700"
            >
              <BybitIcon className="flex-shrink-0" size={18} />
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-white">Bybit</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">全球领先衍生品交易所</div>
              </div>
              <div className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 px-2 py-1 rounded-full font-medium">
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
    </div>
  );
}
