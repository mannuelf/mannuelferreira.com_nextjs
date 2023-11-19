import Image from "next/image";
import { useState } from "react";
import { Trigger } from "./trigger";
import { DropdownMenu } from "./drop-down-menu";
import { useDropown } from "./useDropdown";

export interface Item {
  icon?: string | null;
  text: string;
  description: string;
}

type DropDownProps = {
  items: Item[];
};

const Dropdown = ({ items }: DropDownProps) => {
  const [
    isOpen,
    selectedItem,
    selectedIndex,
    toggleDropdown,
    handleKeyDown,
    setSelectedItem,
  ] = useDropown(items);

  return (
    <div className="dropdown" onKeyDown={handleKeyDown}>
      <Trigger
        label={selectedItem?.text ?? "Select an item..."}
        onClick={toggleDropdown}
      />
      {isOpen && (
        <DropdownMenu
          onItemClick={setSelectedItem}
          selectedIndex={selectedIndex}
          items={items}
        />
      )}
    </div>
  );
};

export default Dropdown;
