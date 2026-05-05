"use client";

import React, { useRef } from "react";

interface DragAndDropProps {
  value: string | null;
  onChange: (value: string | null) => void;
  type: string;
}

export const DragAndDrop = ({ value, onChange, type }: DragAndDropProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange(file.name);
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.click()}
      className="group relative flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-all cursor-pointer"
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleFileChange}
        accept="image/*"
      />

      {value ? (
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-green-600">Файл вибрано:</p>
          <p className="text-xs text-gray-500">{value}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="p-2 bg-white rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
            ☁️
          </div>
          <p className="text-sm text-gray-600">
            <span className="font-semibold text-blue-500">Натисніть</span> або
            перетягніть
          </p>
          <p className="text-xs text-gray-400 mt-1 uppercase">
            {type.replace("team:", "")}
          </p>
        </div>
      )}
    </div>
  );
};
