import { animate, stagger } from 'animejs';
import React, { useRef } from 'react';

const Component = () => {
  const ballContainerRef = useRef(null);

  const handleExplode = () => {
    const numBalls = 20;
    const numFireworks = 30;
    const button = document.getElementById('explodeButton');
    const buttonRect = button.getBoundingClientRect();
    const buttonX = buttonRect.left + buttonRect.width / 2;
    const buttonY = buttonRect.top + buttonRect.height / 2;

    // 生成小球
    for (let i = 0; i < numBalls; i++) {
      const ball = document.createElement('div');
      ball.classList.add('ball');
      const randomRadius = Math.floor(Math.random() * 36) + 5;
      ball.style.width = `${randomRadius * 2}px`;
      ball.style.height = `${randomRadius * 2}px`;
      ball.style.backgroundColor = getRandomColor();
      ball.style.left = `${buttonX - randomRadius}px`;
      ball.style.top = `${buttonY - randomRadius}px`;

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 200;
      const targetX = buttonX + distance * Math.cos(angle) - randomRadius;
      const targetY = buttonY + distance * Math.sin(angle) - randomRadius;

      ballContainerRef.current.appendChild(ball);

      animate({
        complete: () => {
          ball.remove();
        },
        duration: 1000,
        easing: 'easeOutExpo',
        left: `${targetX}px`,
        opacity: [1, 0],
        scale: [0, 1],
        targets: ball,
        top: `${targetY}px`
      });
    }

    // 生成烟花
    for (let i = 0; i < numFireworks; i++) {
      const firework = document.createElement('div');
      firework.classList.add('firework');
      const randomFireworkRadius = Math.floor(Math.random() * 10) + 2;
      firework.style.width = `${randomFireworkRadius * 2}px`;
      firework.style.height = `${randomFireworkRadius * 2}px`;
      firework.style.backgroundColor = getRandomColor();
      firework.style.left = `${buttonX - randomFireworkRadius}px`;
      firework.style.top = `${buttonY - randomFireworkRadius}px`;

      const fireworkAngle = Math.random() * 2 * Math.PI;
      const fireworkDistance = Math.random() * 300 + 200;
      const fireworkTargetX = buttonX + fireworkDistance * Math.cos(fireworkAngle) - randomFireworkRadius;
      const fireworkTargetY = buttonY + fireworkDistance * Math.sin(fireworkAngle) - randomFireworkRadius;

      ballContainerRef.current.appendChild(firework);

      animate({
        complete: () => {
          firework.remove();
        },
        duration: 1500,
        easing: 'easeOutExpo',
        left: `${fireworkTargetX}px`,
        opacity: [1, 0],
        scale: [0, 1],
        targets: firework,
        top: `${fireworkTargetY}px`
      });
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <button
        className="rounded bg-blue-500 px-4 py-2 text-white font-bold hover:bg-blue-700"
        id="explodeButton"
        onClick={handleExplode}
      >
        点击爆炸
      </button>
      <div ref={ballContainerRef} />
    </div>
  );
};

export { Component };
