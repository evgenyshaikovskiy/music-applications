import React from 'react';
import InteractiveItemList from './dropdown-item';

const InteractiveDropdown = ({ list }) => {
  function callback(item) {
    console.log(`callback for this ${item}`);
  }

  if (list.length === 0) {
    return <div>Nothing was found</div>;
  } else {
    return list.map((item, index) => (
      <InteractiveItemList
        item={item}
        onItemClickCallback={callback}
        key={index}
      ></InteractiveItemList>
    ));
  }
};

export default InteractiveDropdown;
