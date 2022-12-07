const RelationViewPage = ({ item }) => {
  console.log(item);

  const timer = setTimeout(() => console.log('vanya pediks'), 5000);
  const wrapper = async () => await timer;

  wrapper();
  return <div>{item.label}</div>;
};

export default RelationViewPage;
