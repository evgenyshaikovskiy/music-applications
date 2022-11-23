// this could be extended by passing fields of object instead of object itself
const InteractiveItemList = ({ item, onItemClickCallback }) => {
  return (
    <div
      className="clickable-dropdown-item"
      onClick={() => onItemClickCallback(item)}
    >
      {item.type}: {item.label}
    </div>
  );
};

export default InteractiveItemList;
