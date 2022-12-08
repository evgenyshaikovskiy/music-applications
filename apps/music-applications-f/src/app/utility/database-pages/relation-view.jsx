const RelationViewPage = ({ item }) => {
  console.log(item);
  return (
    <div className="database-item-page-text">
      {/* {item.relations.length} */}
      <div className="database-item-name-text">{item.properties.name.toUpperCase()}</div>
      {item.relations.map((relation, index) => {
        switch (relation.type) {
          case 'Author':
            return (
              <AuthorRelation
                target={relation.target}
                key={index}
                item_type={item.type}
                relation_type={relation.type}
              ></AuthorRelation>
            );
          case 'AppearedAt':
            return (
              <AppearedAtRelation
                target={relation.target}
                key={index}
                item_type={item.type}
                relation_type={relation.type}
              ></AppearedAtRelation>
            );
          case 'PerformsInGenre':
            return (
              <PerfomsInGenreRelation
                target={relation.target}
                key={index}
                item_type={item.type}
              ></PerfomsInGenreRelation>
            );
          case 'Contains':
            return (
              <ContainsRelation
                target={relation.target}
                key={index}
                item_type={item.type}
              ></ContainsRelation>
            );
          default:
            return <div></div>;
        }
      })}
    </div>
  );
};

export default RelationViewPage;

const AuthorRelation = ({ target, item_type, relation_type }) => {
  switch (target.type) {
    case 'Track':
      return (
        <div className="database-item-author-text">
          {target.properties.name}
          {' - '}
          {relation_type}{"("}{}
        </div>
      );
    case 'Album':
      return (
        <div className="database-item-author-text">
          {target.properties.name}
          {' - '}
          {relation_type}
        </div>
      );
    case 'Artist':
      return (
        <div className="database-item-author-text">
          {target.properties.name}
          {' - '}
          {relation_type}
        </div>
      );
  }
  /*   return (
    <div>
      {target.type === 'Track' ? (
        <div>{target.properties.name}</div>
      ) : (
        <div>{if album}</div>
      )}
    </div>
  ); */
};

const AppearedAtRelation = ({ target, item_type, relation_type }) => {
  return (
    <div>
      {target.properties.name}
      {' - '}
      {target.type}{" ("}{relation_type}{")"}
    </div>
  );
};

const PerfomsInGenreRelation = ({ target, item_type }) => {
  return (
    <div>
      {item_type === 'Genre' ? (
        <div className="database-item-perfomsin-genre-artists-text">
          {/* add index */}{target.properties.name}{' - '}{target.type}
        </div>
      ) : (
        <div className="database-item-perfomsin-artist-genres-text">{target.properties.name}{' - '}{target.type}</div>
      )}
    </div>
  );
};

const ContainsRelation = ({ target, item_type }) => {
  return (
    <div className="database-item-contains-text">
      {target.properties.name}
      {' - '}
      {target.type}
    </div>
  );
};
