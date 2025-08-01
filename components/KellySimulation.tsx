"use client";

import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface SimulationDataPoint {
  game: number;
  kellyAvg: number;
  conservativeAvg: number;
  aggressiveAvg: number;
  kellyMedian: number;
  conservativeMedian: number;
  aggressiveMedian: number;
}

interface ResultData {
  strategy: string;
  average: number;
  median: number;
  max: number;
  min: number;
  bankruptCount: number;
  millionaireCount: number;
}

const KellySimulation = () => {
  const [simulationData, setSimulationData] = useState<SimulationDataPoint[]>([]);
  const [finalResults, setFinalResults] = useState<ResultData[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  
  // 游戏参数
  const PLAYERS = 100;
  const GAMES = 100;
  const WIN_PROB = 0.6;
  const PAYOUT = 1; // 1赔1
  const INITIAL_MONEY = 1000;
  
  // 凯利公式计算
  const kellyPercent = (WIN_PROB * PAYOUT - (1 - WIN_PROB)) / PAYOUT;
  
  const runSimulation = () => {
    setIsRunning(true);
    
    // 初始化玩家
    const players = Array.from({length: PLAYERS}, (_, i) => ({
      id: i,
      kelly: INITIAL_MONEY,
      conservative: INITIAL_MONEY,
      aggressive: INITIAL_MONEY
    }));
    
    const gameData = [];
    
    // 进行100轮游戏
    for (let game = 0; game <= GAMES; game++) {
      if (game === 0) {
        // 初始状态
        gameData.push({
          game: 0,
          kellyAvg: INITIAL_MONEY,
          conservativeAvg: INITIAL_MONEY,
          aggressiveAvg: INITIAL_MONEY,
          kellyMedian: INITIAL_MONEY,
          conservativeMedian: INITIAL_MONEY,
          aggressiveMedian: INITIAL_MONEY
        });
        continue;
      }
      
      // 每个玩家进行一轮游戏
      players.forEach(player => {
        const isWin = Math.random() < WIN_PROB;
        
        // 凯利策略 (20%)
        const kellyBet = player.kelly * kellyPercent;
        if (isWin) {
          player.kelly += kellyBet;
        } else {
          player.kelly -= kellyBet;
        }
        
        // 保守策略 (10%)
        const conservativeBet = player.conservative * 0.1;
        if (isWin) {
          player.conservative += conservativeBet;
        } else {
          player.conservative -= conservativeBet;
        }
        
        // 激进策略 (50%)
        const aggressiveBet = player.aggressive * 0.5;
        if (isWin) {
          player.aggressive += aggressiveBet;
        } else {
          player.aggressive -= aggressiveBet;
        }
      });
      
      // 计算平均值和中位数
      const kellyValues = players.map(p => p.kelly).sort((a, b) => a - b);
      const conservativeValues = players.map(p => p.conservative).sort((a, b) => a - b);
      const aggressiveValues = players.map(p => p.aggressive).sort((a, b) => a - b);
      
      gameData.push({
        game,
        kellyAvg: kellyValues.reduce((sum, val) => sum + val, 0) / PLAYERS,
        conservativeAvg: conservativeValues.reduce((sum, val) => sum + val, 0) / PLAYERS,
        aggressiveAvg: aggressiveValues.reduce((sum, val) => sum + val, 0) / PLAYERS,
        kellyMedian: kellyValues[Math.floor(PLAYERS / 2)],
        conservativeMedian: conservativeValues[Math.floor(PLAYERS / 2)],
        aggressiveMedian: aggressiveValues[Math.floor(PLAYERS / 2)]
      });
    }
    
    // 计算最终结果统计
    const finalKelly = players.map(p => p.kelly).sort((a, b) => b - a);
    const finalConservative = players.map(p => p.conservative).sort((a, b) => b - a);
    const finalAggressive = players.map(p => p.aggressive).sort((a, b) => b - a);
    
    const results = [
      {
        strategy: '凯利策略(20%)',
        average: Math.round(finalKelly.reduce((sum, val) => sum + val, 0) / PLAYERS),
        median: Math.round(finalKelly[Math.floor(PLAYERS / 2)]),
        max: Math.round(Math.max(...finalKelly)),
        min: Math.round(Math.min(...finalKelly)),
        bankruptCount: finalKelly.filter(val => val < 1).length,
        millionaireCount: finalKelly.filter(val => val >= 10000).length
      },
      {
        strategy: '保守策略(10%)',
        average: Math.round(finalConservative.reduce((sum, val) => sum + val, 0) / PLAYERS),
        median: Math.round(finalConservative[Math.floor(PLAYERS / 2)]),
        max: Math.round(Math.max(...finalConservative)),
        min: Math.round(Math.min(...finalConservative)),
        bankruptCount: finalConservative.filter(val => val < 1).length,
        millionaireCount: finalConservative.filter(val => val >= 10000).length
      },
      {
        strategy: '激进策略(50%)',
        average: Math.round(finalAggressive.reduce((sum, val) => sum + val, 0) / PLAYERS),
        median: Math.round(finalAggressive[Math.floor(PLAYERS / 2)]),
        max: Math.round(Math.max(...finalAggressive)),
        min: Math.round(Math.min(...finalAggressive)),
        bankruptCount: finalAggressive.filter(val => val < 1).length,
        millionaireCount: finalAggressive.filter(val => val >= 10000).length
      }
    ];
    
    setSimulationData(gameData);
    setFinalResults(results);
    setIsRunning(false);
  };
  
  useEffect(() => {
    runSimulation();
  }, []);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">凯利公式策略对比模拟</h1>
        <div className="bg-blue-50 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">游戏设定：</h2>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>100个玩家，每人初始资金1000元</li>
            <li>进行100轮游戏</li>
            <li>每轮胜率60%，1赔1</li>
            <li>凯利公式建议投注比例: {(kellyPercent * 100).toFixed(1)}%</li>
          </ul>
        </div>
        
        <button 
          onClick={runSimulation}
          disabled={isRunning}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isRunning ? '模拟中...' : '重新模拟'}
        </button>
      </div>

      {simulationData.length > 0 && (
        <>
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">资金变化趋势（平均值）</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={simulationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="game" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`$${value.toFixed(0)}`, '']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="kellyAvg" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="凯利策略(20%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="conservativeAvg" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="保守策略(10%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="aggressiveAvg" 
                  stroke="#ff7c7c" 
                  strokeWidth={2}
                  name="激进策略(50%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">资金变化趋势（中位数）</h2>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={simulationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="game" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`$${value.toFixed(0)}`, '']} />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="kellyMedian" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="凯利策略(20%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="conservativeMedian" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="保守策略(10%)"
                />
                <Line 
                  type="monotone" 
                  dataKey="aggressiveMedian" 
                  stroke="#ff7c7c" 
                  strokeWidth={2}
                  name="激进策略(50%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">最终结果对比</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={finalResults}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="strategy" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${value}`, '']} />
                <Legend />
                <Bar dataKey="average" fill="#8884d8" name="平均资金" />
                <Bar dataKey="median" fill="#82ca9d" name="中位数资金" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">破产人数对比</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={finalResults}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="strategy" />
                <YAxis />
                <Tooltip formatter={(value: any) => [`${value}人`, '']} />
                <Legend />
                <Bar dataKey="bankruptCount" fill="#ff7c7c" name="破产人数" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {finalResults.map((result, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg border">
                <h3 className="text-xl font-semibold mb-4 text-center">{result.strategy}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>平均资金:</span>
                    <span className="font-semibold">${result.average}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>中位数资金:</span>
                    <span className="font-semibold">${result.median}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>最高资金:</span>
                    <span className="font-semibold text-green-600">${result.max}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>最低资金:</span>
                    <span className="font-semibold text-red-600">${result.min}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>破产人数:</span>
                    <span className="font-semibold text-red-600">{result.bankruptCount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>万元户数:</span>
                    <span className="font-semibold text-green-600">{result.millionaireCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-yellow-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">结果分析：</h3>
            <div className="space-y-3 text-sm">
              <p><strong>凯利策略(20%)：</strong>在长期来看通常能实现最优的增长率，平均表现最好，但波动相对较大。</p>
              <p><strong>保守策略(10%)：</strong>增长较慢但稳定，破产风险最小，适合风险厌恶型投资者。</p>
              <p><strong>激进策略(50%)：</strong>虽然有机会获得最高收益，但破产风险极高，大部分玩家会损失惨重。</p>
              <p className="text-red-600 font-semibold">注意：这只是一次模拟结果，实际情况可能会有所不同。点击"重新模拟"可以看到不同的结果。</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default KellySimulation;