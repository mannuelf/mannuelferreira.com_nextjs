import { Item } from "./drop-down";

export const DropdownMenu = (
  { items, onItemClick }: { items: Item[]; onItemClick: (item: Item) => void },
) => {
  return (
    <div className="dropdown-menu">
      {items.map((item, index) => (
        <div
          key={index}
          onClick={() => onItemClick(item)}
          className="item-container"
        >
          <div className="details">
            <div>{item.text}</div>
            <small>{item.description}</small>
          </div>
        </div>
      ))}
    </div>
  );
};
