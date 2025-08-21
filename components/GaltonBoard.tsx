'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';

interface GaltonBoardProps {
  className?: string;
}

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: string;
  finished: boolean;
  rightCount: number;
  currentRow: number;
}

interface Peg {
  x: number;
  y: number;
}

export default function GaltonBoard({ className = "" }: GaltonBoardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const [isRunning, setIsRunning] = useState(false);
  const [ballCount, setBallCount] = useState(0);
  const [avgPosition, setAvgPosition] = useState('-');
  const [stdDev, setStdDev] = useState('-');
  const [maxColumn, setMaxColumn] = useState('-');
  const [speed, setSpeed] = useState(5);

  // 游戏状态
  const ballsRef = useRef<Ball[]>([]);
  const binsRef = useRef<number[]>(new Array(15).fill(0));
  const totalBallsRef = useRef(0);
  const dropCounterRef = useRef(0);
  const pegsRef = useRef<Peg[][]>([]);

  // 配置参数
  const config = {
    rows: 12,
    pegRadius: 4,
    ballRadius: 6,
    pegSpacing: 40,
    rowSpacing: 30,
    dropSpeed: 4,
    gravity: 0.3
  };

  // 初始化钉子位置
  const initPegs = useCallback(() => {
    const pegs: Peg[][] = [];
    const startY = 100;
    const numCols = 14;
    const totalWidth = (numCols - 1) * config.pegSpacing;
    const baseStartX = (700 - totalWidth) / 2; // 画布宽度700

    for (let row = 0; row < config.rows; row++) {
      const rowPegs: Peg[] = [];
      const offset = (row % 2) * (config.pegSpacing / 2);
      
      for (let col = 0; col < numCols; col++) {
        rowPegs.push({
          x: baseStartX + col * config.pegSpacing + offset,
          y: startY + row * config.rowSpacing
        });
      }
      pegs.push(rowPegs);
    }
    pegsRef.current = pegs;
  }, []);

  // 绘制钉子
  const drawPegs = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.fillStyle = '#666';
    for (const row of pegsRef.current) {
      for (const peg of row) {
        ctx.beginPath();
        ctx.arc(peg.x, peg.y, config.pegRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, []);

  // 绘制收集槽
  const drawBins = useCallback((ctx: CanvasRenderingContext2D) => {
    const numBins = 15;
    const binWidth = config.pegSpacing;
    const totalWidth = (numBins - 1) * binWidth;
    const startX = (700 - totalWidth) / 2 - binWidth/2;
    const startY = 100 + config.rows * config.rowSpacing + 30;
    const binHeight = 500 - startY - 20; // 画布高度500

    // 绘制槽边框
    ctx.strokeStyle = '#999';
    ctx.lineWidth = 1;
    for (let i = 0; i <= numBins; i++) {
      ctx.beginPath();
      ctx.moveTo(startX + i * binWidth, startY);
      ctx.lineTo(startX + i * binWidth, 480);
      ctx.stroke();
    }

    // 绘制底部
    ctx.beginPath();
    ctx.moveTo(startX, 480);
    ctx.lineTo(startX + totalWidth, 480);
    ctx.stroke();

    // 绘制直方图
    const maxBalls = Math.max(...binsRef.current, 1);
    for (let i = 0; i < binsRef.current.length; i++) {
      if (binsRef.current[i] > 0) {
        const height = (binsRef.current[i] / maxBalls) * (binHeight - 10) * 0.95;
        
        // 渐变色
        const gradient = ctx.createLinearGradient(0, startY + binHeight - height, 0, startY + binHeight);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        
        ctx.fillRect(
          startX + i * binWidth + 2,
          startY + binHeight - height,
          binWidth - 4,
          height
        );
        
        // 显示数量
        if (binsRef.current[i] > 0) {
          ctx.fillStyle = '#333';
          ctx.font = '12px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(
            binsRef.current[i].toString(),
            startX + i * binWidth + binWidth / 2,
            startY + binHeight - height - 5
          );
        }
      }
    }

    // 绘制理论正态分布曲线
    if (totalBallsRef.current > 30) {
      drawNormalCurve(ctx, startX, startY, binWidth, binHeight);
    }
  }, []);

  // 绘制正态分布曲线
  const drawNormalCurve = useCallback((ctx: CanvasRenderingContext2D, startX: number, startY: number, binWidth: number, binHeight: number) => {
    const mean = 7;
    const stdDev = 2.5;
    const maxBalls = Math.max(...binsRef.current, 1);
    
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    
    for (let i = 0; i < 15; i += 0.1) {
      const x = startX + i * binWidth + binWidth / 2;
      const z = (i - mean) / stdDev;
      const probability = Math.exp(-z * z / 2) / (stdDev * Math.sqrt(2 * Math.PI));
      const expectedCount = probability * totalBallsRef.current * 0.8;
      const height = (expectedCount / maxBalls) * (binHeight - 10);
      const y = startY + binHeight - height;
      
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();
    ctx.setLineDash([]);
  }, []);

  // 创建小球
  const createBall = useCallback((): Ball => {
    return {
      x: 350 + (Math.random() - 0.5) * 5, // 画布中心350
      y: 60,
      vx: 0,
      vy: 1,
      color: `hsl(${Math.random() * 60 + 200}, 70%, 50%)`,
      finished: false,
      rightCount: 0,
      currentRow: -1
    };
  }, []);

  // 更新小球
  const updateBall = useCallback((ball: Ball): boolean => {
    if (ball.finished) return true;

    // 应用重力
    ball.vy += config.gravity;
    ball.vy = Math.min(ball.vy, config.dropSpeed);

    // 横向阻尼
    ball.vx *= 0.92;

    // 更新位置
    ball.x += ball.vx;
    ball.y += ball.vy;

    // 检查与钉子的碰撞
    for (let row = 0; row < pegsRef.current.length; row++) {
      if (row <= ball.currentRow) continue;
      
      for (let col = 0; col < pegsRef.current[row].length; col++) {
        const peg = pegsRef.current[row][col];
        const dx = ball.x - peg.x;
        const dy = ball.y - peg.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < config.pegRadius + config.ballRadius) {
          ball.currentRow = row;
          
          // 50%概率向左或向右
          if (Math.random() < 0.5) {
            ball.vx = -2.5 - Math.random() * 1.5;
          } else {
            ball.vx = 2.5 + Math.random() * 1.5;
            ball.rightCount++;
          }
          
          ball.vy *= 0.5;
          
          // 防止球卡在钉子里
          const angle = Math.atan2(dy, dx);
          const pushDistance = config.pegRadius + config.ballRadius + 1;
          ball.x = peg.x + Math.cos(angle) * pushDistance;
          ball.y = peg.y + Math.sin(angle) * pushDistance;
          
          break;
        }
      }
    }

    // 检查是否到达底部
    const bottomY = 100 + config.rows * config.rowSpacing + 30;
    if (ball.y >= bottomY) {
      ball.finished = true;
      
      // 确定落入哪个槽
      const numBins = 15;
      const binWidth = config.pegSpacing;
      const totalWidth = (numBins - 1) * binWidth;
      const startX = (700 - totalWidth) / 2 - binWidth/2;
      
      let binIndex = Math.floor((ball.x - startX) / binWidth);
      binIndex = Math.max(0, Math.min(numBins - 1, binIndex));
      
      binsRef.current[binIndex]++;
      totalBallsRef.current++;
      updateStats();
      return true;
    }

    // 防止球跑出画布
    if (ball.x < config.ballRadius) {
      ball.x = config.ballRadius;
      ball.vx = Math.abs(ball.vx) * 0.5;
    }
    if (ball.x > 700 - config.ballRadius) {
      ball.x = 700 - config.ballRadius;
      ball.vx = -Math.abs(ball.vx) * 0.5;
    }

    return false;
  }, []);

  // 绘制小球
  const drawBall = useCallback((ctx: CanvasRenderingContext2D, ball: Ball) => {
    if (ball.finished) return;
    
    ctx.fillStyle = ball.color;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, config.ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }, []);

  // 更新统计信息
  const updateStats = useCallback(() => {
    setBallCount(totalBallsRef.current);
    
    if (totalBallsRef.current > 0) {
      // 计算平均位置
      let weightedSum = 0;
      for (let i = 0; i < binsRef.current.length; i++) {
        weightedSum += i * binsRef.current[i];
      }
      const avg = weightedSum / totalBallsRef.current;
      setAvgPosition(avg.toFixed(2));
      
      // 计算标准差
      let variance = 0;
      for (let i = 0; i < binsRef.current.length; i++) {
        variance += binsRef.current[i] * Math.pow(i - avg, 2);
      }
      variance /= totalBallsRef.current;
      const stdDevValue = Math.sqrt(variance);
      setStdDev(stdDevValue.toFixed(2));
      
      // 最高柱
      const maxBin = Math.max(...binsRef.current);
      const maxIndex = binsRef.current.indexOf(maxBin);
      setMaxColumn(`第${maxIndex}槽`);
    }
  }, []);

  // 动画循环
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制标题
    ctx.fillStyle = '#333';
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('高尔顿钉板 - 正态分布形成过程', canvas.width / 2, 30);
    
    // 绘制元素
    drawBins(ctx);
    drawPegs(ctx);
    
    // 更新和绘制小球
    ballsRef.current = ballsRef.current.filter(ball => {
      const finished = updateBall(ball);
      drawBall(ctx, ball);
      return !finished;
    });
    
    // 持续投球
    dropCounterRef.current++;
    if (isRunning && dropCounterRef.current >= (11 - speed) * 3) {
      ballsRef.current.push(createBall());
      dropCounterRef.current = 0;
    }
    
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [isRunning, speed, drawBins, drawPegs, updateBall, drawBall, createBall]);

  // 控制函数
  const startSimulation = useCallback(() => {
    setIsRunning(true);
  }, []);

  const stopSimulation = useCallback(() => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  }, []);

  const resetSimulation = useCallback(() => {
    setIsRunning(false);
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
    
    ballsRef.current = [];
    binsRef.current = new Array(15).fill(0);
    totalBallsRef.current = 0;
    dropCounterRef.current = 0;
    
    setBallCount(0);
    setAvgPosition('-');
    setStdDev('-');
    setMaxColumn('-');
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 700, 500);
      initPegs();
      drawPegs(ctx);
      drawBins(ctx);
    }
  }, [initPegs, drawPegs, drawBins]);

  // 初始化
  useEffect(() => {
    initPegs();
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx) {
      drawPegs(ctx);
      drawBins(ctx);
    }
  }, [initPegs, drawPegs, drawBins]);

  // 动画效果
  useEffect(() => {
    if (isRunning) {
      animate();
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning, animate]);

  return (
    <div className={`bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl p-6 shadow-lg ${className}`}>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">🎲 高尔顿钉板模拟器</h1>
        <p className="text-sm text-gray-600">观察小球如何自然形成正态分布</p>
      </div>
      
      <canvas 
        ref={canvasRef}
        width={700}
        height={500}
        className="block mx-auto border-2 border-gray-300 rounded-lg bg-gray-50"
      />
      
      <div className="flex flex-wrap gap-3 justify-center mt-6">
        <button
          onClick={startSimulation}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
        >
          开始投球
        </button>
        <button
          onClick={stopSimulation}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          暂停
        </button>
        <button
          onClick={resetSimulation}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
        >
          重置
        </button>
        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
          <span className="text-sm text-gray-600">投球频率:</span>
          <input
            type="range"
            min="1"
            max="10"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            className="w-20"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <div className="bg-gradient-to-br from-gray-50 to-gray-200 p-4 rounded-lg text-center">
          <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">已投球数</div>
          <div className="text-xl font-bold text-gray-800">{ballCount}</div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-200 p-4 rounded-lg text-center">
          <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">平均位置</div>
          <div className="text-xl font-bold text-gray-800">{avgPosition}</div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-200 p-4 rounded-lg text-center">
          <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">标准差</div>
          <div className="text-xl font-bold text-gray-800">{stdDev}</div>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-gray-200 p-4 rounded-lg text-center">
          <div className="text-xs text-gray-600 uppercase tracking-wide mb-1">最高柱</div>
          <div className="text-xl font-bold text-gray-800">{maxColumn}</div>
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-6 rounded">
        <p className="text-sm text-gray-700 leading-relaxed">
          <strong>原理说明：</strong>小球从顶部落下，每次碰到钉子有50%概率向左或向右弹开。经过多层随机选择后，大部分小球会落在中间位置，形成钟形的正态分布曲线。这完美模拟了市场价格的分布规律：极端值少，中间值多。
        </p>
      </div>
    </div>
  );
}
