import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { KellyCalculator } from '@/components/KellyCalculator';
import KellySimulation from '@/components/KellySimulation';
import CopyEmailButton from '@/components/CopyEmailButton';

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    KellyCalculator,
    KellySimulation,
    CopyEmailButton,
    ...components,
  };
}
