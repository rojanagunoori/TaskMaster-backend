// components/ClothingItem.tsx
'use client';
export default function ClothingItem({ type }: { type: string }) {
  return (
    <img
    src={`/icons/${type}.png`}
    alt={type}
    draggable
    onDragStart={(e) => {
      e.dataTransfer.setData('clothing-type', type);
    }}
    style={{ width: '48px', height: '48px', objectFit: 'contain', margin: '0.5rem', cursor: 'grab' }}
    className="w-12 h-12 m-2 cursor-grab  object-contain" // change w-16 h-16 to w-12 h-12
  />
  );
}