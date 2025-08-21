interface YouTubeShortsProps {
  videoId: string;
  title: string;
}

/**
 * YouTube Shorts 优化组件
 * 专门为竖屏 Shorts 视频设计的响应式容器
 */
export default function YouTubeShorts({ videoId, title }: YouTubeShortsProps) {
  return (
    <div className="flex justify-center">
      {/* 移动端：全宽显示 */}
      <div className="w-full max-w-md">
        <div 
          style={{ 
            position: 'relative', 
            paddingBottom: '177.78%', // 9:16 比例 (16/9 * 100% = 177.78%)
            height: 0, 
            overflow: 'hidden' 
          }}
        >
          <iframe 
            src={`https://www.youtube.com/embed/${videoId}`}
            title={title}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%',
              border: 'none',
              borderRadius: '8px'
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
