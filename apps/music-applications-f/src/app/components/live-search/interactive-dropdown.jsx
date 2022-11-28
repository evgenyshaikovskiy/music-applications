import InteractiveItemList from './dropdown-item';

const InteractiveDropdown = ({ list, onClickCallback, onViewCallback }) => {
  if (list.length === 0) {
    return <div className='error-message'>Nothing was found</div>;
  } else {
    return list.map((item, index) => (
      <InteractiveItemList
        item={item}
        onItemClickCallback={onClickCallback}
        onViewCallback={onViewCallback}
        key={index}
      ></InteractiveItemList>
    ));
  }
};

export default InteractiveDropdown;
