import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { KellyCalculator } from '@/components/KellyCalculator';
import KellySimulation from '@/components/KellySimulation';
import CopyEmailButton from '@/components/CopyEmailButton';
import GaltonBoard from '@/components/GaltonBoard';
import MobilePersonalSidebar from '@/components/MobilePersonalSidebar';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    KellyCalculator,
    KellySimulation,
    CopyEmailButton,
    GaltonBoard,
    // 在所有内容前添加个人信息面板
    wrapper: ({ children, ...props }) => (
      <>
        {/* 个人信息面板 - 在正文上方，所有设备都显示 */}
        <div className="mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <MobilePersonalSidebar />
        </div>
        
        {defaultMdxComponents.wrapper ? (
          <defaultMdxComponents.wrapper {...props}>
            {children}
          </defaultMdxComponents.wrapper>
        ) : (
          children
        )}
      </>
    ),
    ...components,
  };
}
