import React from 'react';
import { Tag } from '../../types';

interface ButtonGroupProps {
  buttons: Tag[];
  setButtons: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons, setButtons }) => {
  const handleToggle = (id: number) => {
    const selectedCount = buttons.filter((button) => button.selected).length;
    const newButtons = buttons.map((button) => {
      if (button.tag_id === id) {
        if (button.selected)
          return {
            ...button,
            selected: false,
          };
        return {
          ...button,
          selected: selectedCount < 10,
        };
      }
      return button;
    });
    setButtons(newButtons);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {buttons.map((button) => (
        <button
          key={button.tag_id}
          type="button"
          onClick={() => handleToggle(button.tag_id)}
          className={`focus:shadow-outline rounded-3xl border-2 px-4 py-2 text-center text-sm font-medium focus:outline-none ${
            button.selected ? 'bg-regal-blue text-white' : 'text-primary-text'
          }`}
        >
          {button.tag_name}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
