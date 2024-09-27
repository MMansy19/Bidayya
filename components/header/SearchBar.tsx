// SearchBar.js
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
interface SearchBarProps {
  placeholder: string;
}
const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  return (
    <div className="flex w-full items-center rounded-full border bg-white px-2 shadow-sm">
      <Button
        icon="pi pi-search"
        className="p-button-text p-button-plain p-1 text-gray-400"
      />
      <InputText
        placeholder={placeholder}
        className="w-full flex-grow p-2 outline"
      />
      <Button
        icon="pi pi-sliders-h"
        className="p-button-text p-button-plain p-1 pr-2 text-gray-400"
      />
    </div>
  );
};

export default SearchBar;
