// DropdownList.jsx
import React, { useState } from 'react';

const options = [
  'Fresh Mart',
  'Urban Wear',
  'Tech Hub',
  'Book Nest',
  'Green Roots',
  'Sweet Bite',
];

const DropdownList = ({setSelectedShop }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');

  const handleSelect = (option) => {
    setSelected(option);
    setSelectedShop(option);
    setIsOpen(false);
  };

  return (
    <div className="space-y-1">
      <label className="inline-block text-sm font-medium">Choose a Shop Name</label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-white px-4 py-2.5 text-left text-sm font-medium text-zinc-500 hover:border-zinc-300 focus:border-zinc-500 focus:ring-3 focus:ring-zinc-500/50 focus:outline-hidden"
        >
          <span className="truncate">{selected || 'Please select..'}</span>
          <svg
            className="hi-mini hi-chevron-down inline-block size-5 text-zinc-400 transition group-hover:text-zinc-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {isOpen && (
          <ul className="absolute z-10 mt-2 w-full rounded-lg border border-zinc-200 bg-white py-2 shadow-md max-h-60 overflow-y-auto">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => handleSelect(option)}
                className="cursor-pointer px-4 py-2 text-sm text-zinc-700 hover:bg-zinc-100"
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DropdownList;
