// this could be extended by passing fields of object instead of object itself
const InteractiveItemList = ({ item, onItemClickCallback }) => {
  console.log(item);
  // consider using different print strategies for different objects
  return (
    <div
      className="clickable-dropdown-item"
      onClick={() => onItemClickCallback(item)}
    >
      {item.type}: {item.label},{' '}
      {item.artists.map((artist) => artist.name).join(',')}
    </div>
  );
};

export default InteractiveItemList;
