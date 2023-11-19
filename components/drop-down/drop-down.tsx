import Image from "next/image";
import { useState } from "react";
import { Trigger } from "./trigger";
import { DropdownMenu } from "./drop-down-menu";

export interface Item {
  icon?: string | null;
  text: string;
  description: string;
}

type DropDownProps = {
  items: Item[];
};

const Dropdown = ({ items }: DropDownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <div className="dropdown">
      <Trigger
        label={selectedItem?.text ?? "Select an item..."}
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && <DropdownMenu items={items} onItemClick={setSelectedItem} />}
    </div>
  );
};

export default Dropdown;
