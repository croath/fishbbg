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
    <div style={{
      border: '2px solid #e2e8f0',
      borderRadius: '12px',
      padding: '24px',
      margin: '20px 0',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <h3 style={{ 
        marginTop: 0, 
        marginBottom: '20px', 
        color: '#1e293b',
        textAlign: 'center',
        fontSize: '1.5rem'
      }}>
        🎯 凯利公式计算器
      </h3>
      
      <div style={{ display: 'grid', gap: '20px', marginBottom: '20px' }}>
        {/* 胜率控制区域 */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '16px'
          }}>
            📊 胜率 (Win Rate): {winRate.toFixed(1)}%
          </label>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
            <input
              type="number"
              min="0"
              max="100"
              step="0.1"
              value={winRate}
              onChange={(e) => handleWinRateChange(Number(e.target.value))}
              style={{
                width: '80px',
                padding: '8px 12px',
                border: '2px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                textAlign: 'center',
                outline: 'none'
              }}
            />
            <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>%</span>
            <div style={{ flex: 1, marginLeft: '12px' }}>
              <input
                type="range"
                min="1"
                max="99"
                step="0.1"
                value={winRate}
                onChange={(e) => handleWinRateChange(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: '#e2e8f0',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
            滑块范围: 1-99% | 输入框范围: 0-100%
          </div>
        </div>
        
        {/* 盈亏比控制区域 */}
        <div>
          <label style={{ 
            display: 'block', 
            marginBottom: '12px', 
            fontWeight: '600',
            color: '#374151',
            fontSize: '16px'
          }}>
            💰 盈亏比 (Win/Loss Ratio): {winLossRatio.toFixed(2)}
          </label>
          
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '8px' }}>
            <input
              type="number"
              min="0.1"
              step="0.1"
              value={winLossRatio}
              onChange={(e) => handleWinLossRatioChange(Number(e.target.value))}
              style={{
                width: '80px',
                padding: '8px 12px',
                border: '2px solid #e2e8f0',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                textAlign: 'center',
                outline: 'none'
              }}
            />
            <span style={{ fontSize: '14px', color: '#6b7280', fontWeight: '500' }}>:1</span>
            <div style={{ flex: 1, marginLeft: '12px' }}>
              <input
                type="range"
                min="0.5"
                max="10"
                step="0.1"
                value={winLossRatio}
                onChange={(e) => handleWinLossRatioChange(Number(e.target.value))}
                style={{
                  width: '100%',
                  height: '8px',
                  borderRadius: '4px',
                  background: '#e2e8f0',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              />
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>
            滑块范围: 0.5-10 | 输入框范围: 0.1+
          </div>
        </div>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '12px', 
        marginBottom: '20px',
        justifyContent: 'center' 
      }}>
        <button
          onClick={calculateKelly}
          style={{
            padding: '12px 24px',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#3b82f6'}
        >
          🧮 计算凯利比例
        </button>
        
        <button
          onClick={resetValues}
          style={{
            padding: '12px 24px',
            backgroundColor: '#6b7280',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: '14px',
            transition: 'background-color 0.2s'
          }}
          onMouseOver={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#4b5563'}
          onMouseOut={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#6b7280'}
        >
          🔄 重置
        </button>
      </div>
      
      {isCalculated && (
        <div style={{
          padding: '20px',
          backgroundColor: kellyPercentage < 0 ? '#fef2f2' : kellyPercentage > 25 ? '#fef3c7' : '#dcfce7',
          border: `2px solid ${kellyPercentage < 0 ? '#ef4444' : kellyPercentage > 25 ? '#f59e0b' : '#22c55e'}`,
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <h4 style={{ 
            margin: '0 0 12px 0', 
            color: kellyPercentage < 0 ? '#dc2626' : kellyPercentage > 25 ? '#d97706' : '#16a34a',
            fontSize: '1.3rem'
          }}>
            {kellyPercentage < 0 ? '🚫 投资建议' : '📈 建议仓位比例'}
          </h4>
          
          <div style={{ 
            fontSize: '2.2rem', 
            fontWeight: 'bold',
            color: kellyPercentage < 0 ? '#dc2626' : kellyPercentage > 25 ? '#d97706' : '#16a34a',
            marginBottom: '12px'
          }}>
            {kellyPercentage < 0 ? '不建议投资' : `${kellyPercentage.toFixed(2)}%`}
          </div>
          
          <div style={{
            padding: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '8px',
            marginBottom: '8px'
          }}>
            <p style={{ 
              margin: 0, 
              fontSize: '15px',
              color: '#374151',
              fontWeight: '500',
              lineHeight: '1.5'
            }}>
              {kellyPercentage < 0 
                ? '❌ 凯利公式结果为负数，说明在当前胜率和盈亏比条件下，长期来看投资会亏损。建议：' 
                : kellyPercentage > 25 
                  ? '⚠️ 风险较高，建议降低仓位或提高胜率/盈亏比'
                  : '✅ 风险可控的投资比例，适合长期投资'
              }
            </p>
          </div>
          
          {kellyPercentage < 0 && (
            <div style={{
              padding: '12px',
              backgroundColor: '#fee2e2',
              borderRadius: '8px',
              border: '1px solid #fca5a5'
            }}>
              <div style={{ fontSize: '14px', color: '#7f1d1d', fontWeight: '600', marginBottom: '8px' }}>
                🔍 改进建议：
              </div>
              <ul style={{ 
                textAlign: 'left', 
                fontSize: '13px', 
                color: '#991b1b', 
                margin: '0',
                paddingLeft: '20px',
                lineHeight: '1.6'
              }}>
                <li>提高交易胜率（学习更好的分析方法）</li>
                <li>改善盈亏比（及时止损，让利润奔跑）</li>
                <li>寻找更好的投资机会</li>
                <li>先进行模拟交易验证策略</li>
              </ul>
            </div>
          )}
          
          {kellyPercentage >= 0 && kellyPercentage <= 25 && (
            <div style={{ fontSize: '13px', color: '#059669', fontWeight: '500' }}>
              💡 这是一个相对安全的投资比例
            </div>
          )}
          
          {kellyPercentage > 25 && kellyPercentage > 0 && (
            <div style={{ fontSize: '13px', color: '#d97706', fontWeight: '500' }}>
              ⚠️ 高仓位意味着高风险，请谨慎考虑
            </div>
          )}
        </div>
      )}
      
      <div style={{
        marginTop: '20px',
        padding: '12px',
        backgroundColor: '#f8fafc',
        borderRadius: '6px',
        fontSize: '12px',
        color: '#64748b'
      }}>
        <strong>凯利公式：</strong> f* = (bp - q) / b<br/>
        <strong>其中：</strong> f* = 最优投资比例, b = 盈亏比, p = 胜率, q = 败率(1-p)
      </div>
    </div>
  );
}