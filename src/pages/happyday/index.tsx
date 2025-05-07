import { Button } from 'antd';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Component() {
  const [stickers, setStickers] = useState<any>([]);
  const [newSticker, setNewSticker] = useState({ image: '', text: '' });

  const handleAddSticker = () => {
    if (!newSticker.text && !newSticker.image) return;
    setStickers([...stickers, { id: uuidv4(), ...newSticker }]);
    setNewSticker({ image: '', text: '' });
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewSticker((prev: any) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div>111111111111112222222222222222222222222222222222222</div>
      <div className="mx-auto mb-6 max-w-2xl">
        <textarea
          className="mb-2 w-full border border-gray-300 rounded-md p-2"
          placeholder="写点什么..."
          value={newSticker.text}
          onChange={e => setNewSticker({ ...newSticker, text: e.target.value })}
        />
        <input
          accept="image/*"
          className="mb-2"
          type="file"
          onChange={handleImageUpload}
        />
        <Button onClick={handleAddSticker}>添加贴纸</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 sm:grid-cols-2">
        {stickers.map((sticker: any) => (
          <div
            className="relative rounded-xl bg-white p-4 shadow-md"
            key={sticker.id}
          >
            {sticker.image && (
              <img
                alt="sticker"
                className="mb-2 h-48 w-full rounded-md object-cover"
                src={sticker.image}
              />
            )}
            {sticker.text && <p className="whitespace-pre-wrap text-gray-800">{sticker.text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}

export { Component };
