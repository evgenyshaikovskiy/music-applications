import InteractiveItemList from './dropdown-item';

const InteractiveDropdown = ({ list, onClickCallback }) => {
  if (list.length === 0) {
    return <div>Nothing was found</div>;
  } else {
    return list.map((item, index) => (
      <InteractiveItemList
        item={item}
        onItemClickCallback={onClickCallback}
        key={index}
      ></InteractiveItemList>
    ));
  }
};

export default InteractiveDropdown;
