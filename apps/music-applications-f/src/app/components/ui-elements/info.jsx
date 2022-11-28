const ItemInformation = (item) => {
  // not working properly
  function decompose(obj) {
    for (const key in obj) {
      if (typeof obj[key] === 'object') {
        decompose(obj[key]);
      } else {
        return `${key}: ${obj[key]}`;
      }
    }
  }

  return <div>{decompose(item)}</div>;
};

export default ItemInformation;
