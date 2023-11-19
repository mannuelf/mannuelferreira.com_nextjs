import { useState } from "react";
import { Item } from "./drop-down";

export const useDropown = (items: Item[]) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const getAriaAttributes = () => ({
    role: "combobox",
    "aria-expanded": isOpen,
    "aria-activedescendant": selectedItem?.text ?? undefined,
  });

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
    }
  };

  const toggleDropdown = () => setIsOpen((isOpen) => !isOpen);

  return {
    isOpen,
    toggleDropdown,
    handleKeyDown,
    selectedItem,
    setSelectedItem,
    selectedIndex,
  };
};
