"use client";

import { useState } from 'react';

export function KellyCalculator() {
  const [winRate, setWinRate] = useState(50);
  const [winLossRatio, setWinLossRatio] = useState(1.5);
  const [kellyPercentage, setKellyPercentage] = useState(0);
  const [isCalculated, setIsCalculated] = useState(false);

  const calculateKelly = () => {
    const p = winRate / 100; // 胜率
    const b = winLossRatio; // 盈亏比
    const kelly = (b * p - (1 - p)) / b;
    setKellyPercentage(kelly * 100); // 保留原始值，包括负数
    setIsCalculated(true);
  };

  const resetValues = () => {
    setWinRate(50);
    setWinLossRatio(1.5);
    setKellyPercentage(0);
    setIsCalculated(false);
  };

  const handleWinRateChange = (value: number) => {
    setWinRate(Math.max(0, Math.min(100, value)));
  };

  const handleWinLossRatioChange = (value: number) => {
    setWinLossRatio(Math.max(0.1, value));
  };

  return (
    <div className="border-2 border-gray-300 dark:border-gray-600 rounded-xl p-6 my-5 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg">
      <h3 className="mt-0 mb-5 text-gray-800 dark:text-gray-100 text-center text-2xl font-semibold">
        🎯 凯利公式计算器
      </h3>
      
      <div className="grid gap-5 mb-5">
        {/* 胜率控制区域 */}
        <div>
          <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-base">
            📊 胜率 (Win Rate): {winRate.toFixed(1)}%
          </label>
          
          <div className="flex gap-3 items-center mb-2">
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={winRate}
              onChange={(e) => handleWinRateChange(Number(e.target.value))}
              className="w-20 px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md text-sm font-semibold text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">%</span>
            <div className="flex-1 ml-3">
              <input
                type="range"
                min="1"
                max="99"
                step="0.1"
                value={winRate}
                onChange={(e) => handleWinRateChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            滑块范围: 1-99% | 输入框范围: 0-100%
          </div>
        </div>
        
        {/* 盈亏比控制区域 */}
        <div>
          <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-300 text-base">
            💰 盈亏比 (Win/Loss Ratio): {winLossRatio.toFixed(2)}
          </label>
          
          <div className="flex gap-3 items-center mb-2">
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={winLossRatio}
              onChange={(e) => handleWinLossRatioChange(Number(e.target.value))}
              className="w-20 px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-md text-sm font-semibold text-center bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">:1</span>
            <div className="flex-1 ml-3">
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.1"
                value={winLossRatio}
                onChange={(e) => handleWinLossRatioChange(Number(e.target.value))}
                className="w-full h-2 bg-gray-300 dark:bg-gray-600 rounded-md appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">
            滑块范围: 0.5-10 | 输入框范围: 0.1+
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 mb-5 justify-center">
        <button
          onClick={calculateKelly}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-lg font-semibold cursor-pointer text-sm transition-colors duration-200"
        >
          🧮 计算凯利比例
        </button>
        
        <button
          onClick={resetValues}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white border-none rounded-lg font-semibold cursor-pointer text-sm transition-colors duration-200"
        >
          🔄 重置
        </button>
      </div>
      
      {isCalculated && (
        <div className={`p-5 rounded-xl text-center border-2 ${
          kellyPercentage < 0 
            ? 'bg-red-50 dark:bg-red-900/30 border-red-500 dark:border-red-400' 
            : kellyPercentage > 25 
              ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-500 dark:border-yellow-400' 
              : 'bg-green-50 dark:bg-green-900/30 border-green-500 dark:border-green-400'
        }`}>
          <h4 className={`m-0 mb-3 text-xl font-semibold ${
            kellyPercentage < 0 
              ? 'text-red-600 dark:text-red-400' 
              : kellyPercentage > 25 
                ? 'text-yellow-600 dark:text-yellow-400' 
                : 'text-green-600 dark:text-green-400'
          }`}>
            {kellyPercentage < 0 ? '🚫 投资建议' : '📈 建议仓位比例'}
          </h4>
          
          <div className={`text-4xl font-bold mb-3 ${
            kellyPercentage < 0 
              ? 'text-red-600 dark:text-red-400' 
              : kellyPercentage > 25 
                ? 'text-yellow-600 dark:text-yellow-400' 
                : 'text-green-600 dark:text-green-400'
          }`}>
            {kellyPercentage < 0 ? '不建议投资' : `${kellyPercentage.toFixed(2)}%`}
          </div>
          
          <div className="p-3 bg-white/70 dark:bg-gray-800/70 rounded-lg mb-2">
            <p className="m-0 text-base text-gray-700 dark:text-gray-300 font-medium leading-6">
              {kellyPercentage < 0 
                ? '❌ 凯利公式结果为负数，说明在当前胜率和盈亏比条件下，长期来看投资会亏损。建议：' 
                : kellyPercentage > 25 
                  ? '⚠️ 风险较高，建议降低仓位或提高胜率/盈亏比'
                  : '✅ 风险可控的投资比例，适合长期投资'
              }
            </p>
          </div>
          
          {kellyPercentage < 0 && (
            <div className="p-3 bg-red-100 dark:bg-red-900/40 rounded-lg border border-red-300 dark:border-red-600">
              <div className="text-sm text-red-800 dark:text-red-300 font-semibold mb-2">
                🔍 改进建议：
              </div>
              <ul className="text-left text-xs text-red-700 dark:text-red-300 m-0 pl-5 leading-relaxed">
                <li>提高交易胜率（学习更好的分析方法）</li>
                <li>改善盈亏比（及时止损，让利润奔跑）</li>
                <li>寻找更好的投资机会</li>
                <li>先进行模拟交易验证策略</li>
              </ul>
            </div>
          )}
          
          {kellyPercentage >= 0 && kellyPercentage <= 25 && (
            <div className="text-xs text-green-600 dark:text-green-400 font-medium">
              💡 这是一个相对安全的投资比例
            </div>
          )}
          
          {kellyPercentage > 25 && kellyPercentage > 0 && (
            <div className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">
              ⚠️ 高仓位意味着高风险，请谨慎考虑
            </div>
          )}
        </div>
      )}
      
      <div className="mt-5 p-3 bg-gray-100 dark:bg-gray-700 rounded-md text-xs text-gray-600 dark:text-gray-400">
        <strong className="text-gray-800 dark:text-gray-200">凯利公式：</strong> f* = (bp - q) / b<br/>
        <strong className="text-gray-800 dark:text-gray-200">其中：</strong> f* = 最优投资比例, b = 盈亏比, p = 胜率, q = 败率(1-p)
      </div>
    </div>
  );
}