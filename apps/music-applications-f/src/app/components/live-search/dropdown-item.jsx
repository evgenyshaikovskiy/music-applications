const InteractiveItemList = ({ item, onItemClickCallback }) => {
  // consider using different print strategies for different objects
  return (
    <div className="clickable-dropdown-item">
      <div className="clickable-dropdown-item-text">
        <div className="dropdown-item-label">{item.label}</div>
        <div className="dropdown-item-type">{item.type}</div>
      </div>
      <button
        className="view-details-btn"
        onClick={() => onItemClickCallback(item)}
      >
        View details
      </button>
    </div>
  );
};

export default InteractiveItemList;
