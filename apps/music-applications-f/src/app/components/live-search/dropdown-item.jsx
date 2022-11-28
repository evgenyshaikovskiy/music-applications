// this could be extended by passing fields of object instead of object itself
const InteractiveItemList = ({ item, onItemClickCallback, onViewCallback }) => {
  // consider using different print strategies for different objects
  return (
    <div className="clickable-dropdown-item">
      {item.type}: {item.label}
      <button
        className="view-details-btn"
        onClick={() => onItemClickCallback(item)}
      >
        View details
      </button>
      <button
        className="view-all-details-btn"
        onClick={() => onViewCallback(item)}
      >
        View web version
      </button>
    </div>
  );
};

export default InteractiveItemList;
