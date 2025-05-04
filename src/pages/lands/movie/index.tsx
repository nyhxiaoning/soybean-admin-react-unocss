import dayjs from 'dayjs';
import { useState } from 'react';

interface Sticker {
  date: string;
  id: number;
  image?: string;
  text: string;
}

export function Component() {
  const [newSticker, setNewSticker] = useState<Sticker>({
    date: dayjs().format('YYYY-MM-DD HH:mm'),
    id: Date.now(),
    image: '',
    text: ''
  });
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSticker(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (editingId) {
      setStickers(prev => prev.map(sticker => (sticker.id === editingId ? { ...newSticker, id: editingId } : sticker)));
      setEditingId(null);
    } else {
      setStickers(prev => [...prev, { ...newSticker, id: Date.now() }]);
    }
    setNewSticker({
      date: dayjs().format('YYYY-MM-DD HH:mm'),
      id: Date.now(),
      image: '',
      text: ''
    });
  };

  const handleEdit = (sticker: Sticker) => {
    setEditingId(sticker.id);
    setNewSticker(sticker);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Create/Edit Form */}
      <div className="mx-auto mb-6 max-w-2xl rounded-lg bg-white p-4 shadow-md">
        <textarea
          className="mb-2 w-full border border-gray-300 rounded-md p-2"
          placeholder="写点什么..."
          value={newSticker.text}
          onChange={e => setNewSticker({ ...newSticker, text: e.target.value })}
        />
        <div className="mb-2 flex items-center gap-4">
          <input
            accept="image/*"
            className="flex-1"
            type="file"
            onChange={handleImageUpload}
          />
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleSave}
          >
            {editingId ? '更新' : '添加'}
          </button>
        </div>
      </div>

      {/* Stickers List */}
      <div className="grid mx-auto max-h-[600px] max-w-2xl gap-4 overflow-y-auto">
        {stickers.map(sticker => (
          <div
            className="rounded-lg bg-white p-4 shadow-md"
            key={sticker.id}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-gray-500">{sticker.date}</span>
              <button
                className="text-blue-500 hover:text-blue-600"
                onClick={() => handleEdit(sticker)}
              >
                编辑
              </button>
            </div>
            <p className="mb-2">{sticker.text}</p>
            {sticker.image && (
              <img
                alt="Sticker"
                className="h-40 w-full rounded-md object-cover"
                src={sticker.image}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
