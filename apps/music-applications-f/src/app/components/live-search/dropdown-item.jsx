// this could be extended by passing fields of object instead of object itself
const InteractiveItemList = ({ item, onItemClickCallback }) => {
  return <div className='clickable-dropdown-item' onClick={() => onItemClickCallback(item)}>this item is: {item}</div>;
};

export default InteractiveItemList;
