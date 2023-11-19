export const Trigger = (
  { label, onClick }: { label: string; onClick: () => void },
) => {
  return (
    <div
      className="trigger"
      tabIndex={0}
      onClick={onClick}
    >
      <span className="selection">
        {label}
      </span>
    </div>
  );
};
