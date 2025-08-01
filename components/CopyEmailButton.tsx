'use client';

import { useState } from 'react';
import { FaCopy, FaCheck } from 'react-icons/fa';

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export default function CopyEmailButton({ email, className = '' }: CopyEmailButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault(); // 阻止默认行为
    e.stopPropagation(); // 阻止事件冒泡
    
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // 2秒后恢复
    } catch (err) {
      console.error('复制失败:', err);
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className={`p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors ${className}`}
      title={copied ? '已复制!' : '复制邮箱地址'}
    >
      {copied ? (
        <FaCheck className="text-green-600" size={16} />
      ) : (
        <FaCopy size={16} />
      )}
    </button>
  );
}