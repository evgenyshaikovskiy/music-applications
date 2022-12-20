import InteractiveItemList from '../dropdown-item/dropdown-item.component';
import './interactive-dropdown-item.styles.scss'

const InteractiveDropdown = ({
  list,
  ocurredError,
  setOcurredError,
  onClickCallback,
}) => {
  if (list.length === 0) {
    return <div className="error-message">{ocurredError}</div>;
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
