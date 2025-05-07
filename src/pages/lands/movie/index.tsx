import dayjs from 'dayjs';
import { useState } from 'react';

interface Sticker {
  date: string;
  id: number;
  image?: string;
  text: string;
}

export function Component() {
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Sticker, 'id'>>({
    date: dayjs().format('YYYY-MM-DD HH:mm'),
    image: '',
    text: ''
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm(prev => ({ ...prev, image: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (editingId !== null) {
      setStickers(prev => prev.map(sticker => (sticker.id === editingId ? { ...sticker, ...form } : sticker)));
      setEditingId(null);
    } else {
      setStickers(prev => [
        ...prev,
        {
          ...form,
          id: Date.now()
        }
      ]);
    }

    setForm({
      date: dayjs().format('YYYY-MM-DD HH:mm'),
      image: '',
      text: ''
    });
  };

  const handleEdit = (sticker: Sticker) => {
    setEditingId(sticker.id);
    setForm({
      date: sticker.date,
      image: sticker.image,
      text: sticker.text
    });
  };

  const handleClosePreview = () => setPreviewImage(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Form */}
      <div className="mx-auto mb-4 max-w-2xl rounded-lg bg-white p-4 shadow-md">
        <textarea
          className="mb-2 h-[120px] w-full resize-none border border-gray-300 rounded-md p-2"
          placeholder="写点什么..."
          value={form.text}
          onChange={e => setForm(prev => ({ ...prev, text: e.target.value }))}
        />
        <div className="flex items-center gap-4">
          <input
            accept="image/*"
            type="file"
            onChange={handleImageUpload}
          />
          <button
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            onClick={handleSave}
          >
            {editingId !== null ? '更新' : '添加'}
          </button>
        </div>
      </div>

      {/* Sticker Grid */}
      <div className="grid grid-cols-1 mx-auto max-w-2xl gap-4 lg:grid-cols-3 sm:grid-cols-2">
        {stickers.map(sticker => (
          <div
            className="h-[300px] flex flex-col rounded-lg bg-white shadow-md"
            key={sticker.id}
          >
            <div className="flex items-center justify-between border-b p-3">
              <span className="text-sm text-gray-500">{sticker.date}</span>
              <button
                className="text-blue-500 hover:text-blue-600"
                onClick={() => handleEdit(sticker)}
              >
                编辑
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-3">
              <p className="mb-2 break-all text-sm">{sticker.text}</p>
              {sticker.image && (
                <div className="flex justify-center">
                  <img
                    alt="Sticker"
                    className="h-[160px] w-[130px] cursor-pointer rounded-md object-cover"
                    src={sticker.image}
                    onClick={() => setPreviewImage(sticker.image)}
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={handleClosePreview}
        >
          <div className="relative max-h-[90%] max-w-[90%]">
            <img
              alt="Preview"
              className="max-h-[90vh] max-w-full object-contain"
              src={previewImage}
              onClick={e => e.stopPropagation()}
            />
            <button
              className="absolute right-4 top-4 h-8 w-8 flex items-center justify-center rounded-full bg-black bg-opacity-50 text-white"
              onClick={handleClosePreview}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
