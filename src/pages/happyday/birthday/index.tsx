import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Component() {
  const emojis = ['💖', '🎈', '⭐', '🍰'];
  const messages = [
    '愿你的生日如璀璨星辰般闪耀，幸福永远与你相伴！',
    '在这个特别的日子里，祝你生日快乐，梦想成真！',
    '生日快乐！愿生活的每一天都充满阳光和欢笑。',
    '愿你的生日是一场奇妙的冒险，快乐永不止步！',
    '祝你生日快乐，岁岁年年都有今朝的快乐！'
  ];
  const [message, setMessage] = useState(messages[0]);
  const [fallingEmojis, setFallingEmojis] = useState([]);

  const handleClick = () => {
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
  };

  const createFallingEmoji = () => {
    const newEmoji = {
      animationDuration: Math.random() * 3 + 2,
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      id: uuidv4(),
      left: Math.random() * window.innerWidth
    };
    setFallingEmojis([...fallingEmojis, newEmoji]);
    setTimeout(() => {
      setFallingEmojis(fallingEmojis.filter(e => e.id !== newEmoji.id));
    }, 5000);
  };

  useEffect(() => {
    const interval = setInterval(createFallingEmoji, 500);
    return () => clearInterval(interval);
  }, [fallingEmojis]);

  const handleMouseMove = e => {
    const newCake = {
      animationDuration: Math.random() * 3 + 2,
      emoji: '🍰',
      id: uuidv4(),
      left: e.clientX,
      top: e.clientY
    };
    setFallingEmojis([...fallingEmojis, newCake]);
    setTimeout(() => {
      setFallingEmojis(fallingEmojis.filter(e => e.id !== newCake.id));
    }, 5000);
  };

  return (
    <div
      style={{
        alignItems: 'center',
        background: 'radial-gradient(circle, #ffb6c1, #ffd700)',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        margin: 0,
        overflow: 'hidden'
      }}
      onClick={handleClick}
      onMouseMove={handleMouseMove}
    >
      <h1
        style={{
          animation: 'pulse 0.5s infinite alternate',
          color: 'white',
          fontFamily: "'Dancing Script', cursive",
          fontSize: '60px',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'
        }}
      >
        Happy Birthday!
      </h1>
      <div
        style={{
          fontFamily: 'YouYuan',
          fontSize: '24px',
          margin: '20px 0'
        }}
      >
        {message}
      </div>
      <img
        alt="Birthday Image"
        src="https://p9-flow-imagex-sign.byteimg.com/ocean-cloud-tos/image_generation/6a30c75a0b0b77cb595a1b3362796d3b_1741678103707880520.png~tplv-a9rns2rl98-image.png?rk3s=25bff839&x-expires=1773214103&x-signature=5jO6t3cI6T8Ksk9oeiKTkDnP%2BOY%3D"
        style={{ height: 'auto', width: '300px' }}
      />
      {fallingEmojis.map(emojiObj => (
        <span
          key={emojiObj.id}
          style={{
            animation: `fall ${emojiObj.animationDuration}s linear infinite`,
            left: `${emojiObj.left}px`,
            position: 'absolute',
            top: '-50px'
          }}
        >
          {emojiObj.emoji}
        </span>
      ))}
      <style jsx>{`
        @keyframes pulse {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.1);
          }
        }
        @keyframes fall {
          to {
            top: 100vh;
          }
        }
      `}</style>
    </div>
  );
}

export { Component };
