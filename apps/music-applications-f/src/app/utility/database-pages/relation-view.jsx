const RelationViewPage = ({ item }) => {
  console.log(item);
  /*{album.tracks.map((track, index) => {
    return (
      <AlbumTrackInfo
        track={track}
        key={index}
        onTrackClickCallback={trackNameClickCallback}
        onArtistClickCallback={artistNameClickCallback}
      />
    );
  })} */
  return (
    <div className="database-item-page-text">
      {item.relations.map((relation, index) => {
        switch (relation.type) {
          case 'Author':
            return (
              <AuthorRelation
                target={relation.target}
                key={index}
              ></AuthorRelation>
            );
          case 'AppearedAt':
            return <AppearedAtRelation></AppearedAtRelation>;
          case 'PerformsInGenre':
            return (<PerfomsInGenreRelation target={relation.target} key={index}></PerfomsInGenreRelation>);
          case 'Contains':
            return <ContainsRelation></ContainsRelation>;
          default:
            return <div></div>;
        }
      })}
    </div>
  );
};

export default RelationViewPage;

const AuthorRelation = ({ target }) => {
  return (
    <div>
      {target.type === 'Track' ? (
        <div>{target.properties.name}</div>
      ) : (
        <div>{/*if album*/}</div>
      )}
    </div>
  );
};

const AppearedAtRelation = ({ target }) => {
  return <div></div>;
};

const PerfomsInGenreRelation = ({ target }) => {
  return (
  <div>
    {target.properties.name}
  </div>);
};

const ContainsRelation = ({ target }) => {
  return <div></div>;
};
