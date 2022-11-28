// this could be extended by passing fields of object instead of object itself
const InteractiveItemList = ({ item, onItemClickCallback }) => {
  // consider using different print strategies for different objects
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
