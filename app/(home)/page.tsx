import Link from 'next/link';
import Image from 'next/image';
import { source } from '@/lib/source';
import { FaYoutube, FaTelegram, FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

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

export default async function HomePage() {
  const videos = await getVideos();
  const featuredVideo = videos[0]; // 最新视频作为推荐

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Hero Section - 推荐视频 */}
      <section className="mb-12">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold">🐟 小鱼币币机</h1>
            <Link
              href="https://www.youtube.com/@fishbbg?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <FaYoutube />
              关注 YouTube
            </Link>
          </div>
          <p className="text-xl mb-6">探索加密世界，发现真实价值</p>
          
          {featuredVideo && (
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                🌟 最新推荐视频
              </h2>
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h3 className="text-lg font-medium mb-2">{featuredVideo.title}</h3>
                  <p className="text-white/80 mb-4">{featuredVideo.description}</p>
                  <Link 
                    href={featuredVideo.url}
                    className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg font-medium hover:bg-white/90 transition-colors"
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
                      className="rounded-lg hover:opacity-90 transition-opacity cursor-pointer"
                    />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* 左侧：频道介绍和个人信息 */}
        <div className="lg:col-span-1 space-y-6">
          {/* 个人头像和社交链接 */}
          <div className="bg-white rounded-lg border p-6 text-center">
            <div className="relative w-24 h-24 mx-auto mb-4">
              <Image
                src="/fishbbg.svg"
                alt="小鱼头像"
                width={96}
                height={96}
                className="rounded-full border-2 border-gray-200"
              />
            </div>
            <h3 className="text-xl font-bold mb-2">小鱼·币币机 | Croath</h3>
            <p className="text-gray-600 text-sm mb-4">8年区块链从业者 | 产品研发 | 经济模型设计</p>
            
            {/* 社交链接 */}
            <div className="flex justify-center space-x-4">
              <Link 
                href="https://www.youtube.com/@fishbbg?sub_confirmation=1"
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="YouTube 频道"
              >
                <FaYoutube size={20} />
              </Link>
              <Link 
                href="https://x.com/intent/user?screen_name=cr0ath"
                className="p-2 text-black hover:bg-gray-50 rounded-lg transition-colors"
                title="X / Twitter"
              >
                <FaXTwitter size={20} />
              </Link>
            </div>
          </div>

          {/* 频道信息 */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-bold mb-3">关于频道</h3>
            <p className="text-gray-700 text-sm leading-relaxed">
              欢迎来到小鱼币币机。我在 2017 年进入 web3 行业，在区块链领域已经做了 8 年时间的产品研发和经济模型设计工作。
            </p>
            <br />
            <p className="text-gray-700 text-sm leading-relaxed">
              在这个频道里，我会从一个从业者的角度出发，和大家分享 web3 领域的见闻、趋势、分析与洞察，用最通俗易懂的语言讨论最新行业动向。
            </p>
            <div className="mt-4 p-3 bg-blue-50 rounded">
              <p className="text-blue-800 text-xs font-medium">
                💡 技术在更新、市场在变革、流动性在涌动穿梭，唯有持续学习，才能立于不败之地。
              </p>
            </div>
          </div>

          {/* 统计信息 */}
          <div className="bg-white rounded-lg border p-6">
            <h3 className="text-lg font-bold mb-3">频道数据</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">视频总数</span>
                <span className="font-medium">{videos.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">更新频率</span>
                <span className="font-medium">每周更新</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">内容领域</span>
                <span className="font-medium">Web3 · DeFi · 区块链</span>
              </div>
            </div>
          </div>
        </div>

        {/* 右侧：所有视频目录 */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border p-6">
            <h2 className="text-2xl font-bold mb-6">📺 全部视频</h2>
            <div className="grid gap-6">
              {videos.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">暂无视频内容</p>
                  <p className="text-sm text-gray-400">视频总数: {videos.length}</p>
                </div>
              ) : (
                videos.map((video, index) => (
                <Link 
                  key={video.url}
                  href={video.url}
                  className="group block"
                >
                  <div className="flex gap-4 p-4 rounded-lg border hover:border-blue-300 hover:shadow-md transition-all">
                    <div className="relative flex-shrink-0">
                      <Image
                        src={video.image || '/fishbbg.svg'}
                        alt={video.title}
                        width={200}
                        height={112}
                        className="rounded-lg group-hover:opacity-90 transition-opacity"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-white/90 rounded-full p-2">
                          <svg className="w-6 h-6 text-gray-800" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                        {video.title}
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                        {video.description}
                      </p>
                      <div className="flex items-center text-xs text-gray-500">
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
  );
}
