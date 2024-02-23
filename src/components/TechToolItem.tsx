/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface Item {
  id: string | number
  name: string
  imageUrl: string
  status: string
}

interface TechToolItemProps {
  item: Item
  hoveredItemId: string | number | null
  handleMouseEnter: (id: string | number) => void
  handleMouseLeave: () => void
}

const TechToolItem: React.FC<TechToolItemProps> = ({
  item,
  hoveredItemId,
  handleMouseEnter,
  handleMouseLeave,
}) => {
  return (
    <div
      onMouseEnter={() => handleMouseEnter(item.id)}
      onMouseLeave={handleMouseLeave}
      className="item-tech flex cursor-pointer items-center gap-2 rounded border border-blue-700 px-2 py-2 hover:bg-blue-700 hover:bg-opacity-10 md:gap-3 lg:px-3"
    >
      <div className="flex h-12 w-12 items-center justify-center p-0 lg:h-16 lg:w-16 lg:p-2">
        <img
          alt={item.name}
          className="img-tech h-[65%] w-[65%] drop-shadow-xl transition-all duration-300 lg:h-[85%] lg:w-[85%]"
          style={{
            transform: hoveredItemId === item.id ? 'scale(1)' : 'scale(0.7)',
          }}
          src={item.imageUrl}
          loading="lazy"
          width={32}
          height={32}
          decoding="async"
        />
      </div>
      <div className="relative flex flex-col items-center">
        <div
          className="tech font-medium transition-all duration-300"
          style={{
            transform:
              hoveredItemId === item.id ? 'translateY(-12px)' : 'translateY(0)',
          }}
        >
          {item.name}
        </div>
        <div className="status mt-5 text-[10px] text-blue-700 opacity-0 transition-all duration-300 md:text-xs lg:text-sm">
          {item.status}
        </div>
      </div>
    </div>
  )
}

export default TechToolItem
