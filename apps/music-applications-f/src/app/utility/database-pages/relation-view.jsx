const RelationViewPage = ({ item }) => {
  console.log(item);

  const authorToTrackRelations = item.relations.filter(
    (relation) => relation.type === 'Author' && relation.target.type === 'Track'
  );
  const authorToArtistRelations = item.relations.filter(
    (relation) =>
      relation.type === 'Author' && relation.target.type === 'Artist'
  );
  const appearedAtRelations = item.relations.filter(
    (relation) => relation.type === 'AppearedAt'
  );
  const performsInGenreToGenreRelations = item.relations.filter(
    (relation) =>
      relation.type === 'PerformsInGenre' && relation.target.type === 'Genre'
  );
  const performsInGenreToArtistRelations = item.relations.filter(
    (relation) =>
      relation.type === 'PerformsInGenre' && relation.target.type === 'Artist'
  );
  const containsToTrackRelations = item.relations.filter(
    (relation) =>
      relation.type === 'Contains' && relation.target.type === 'Track'
  );
  const containsToAlbumRelations = item.relations.filter(
    (relation) =>
      relation.type === 'Contains' && relation.target.type === 'Album'
  );
  const containsToPlaylistRelations = item.relations.filter(
    (relation) =>
      relation.type === 'Contains' && relation.target.type === 'Playlist'
  );

  console.log(
    authorToTrackRelations,
    authorToArtistRelations,
    appearedAtRelations,
    performsInGenreToGenreRelations,
    performsInGenreToArtistRelations,
    containsToTrackRelations,
    containsToAlbumRelations,
    containsToPlaylistRelations
  );

  return (
    <div className="database-item-page-text">
      <div className="database-item-name-author-text">
        <div className="database-item-name-text">
          {item.properties.name.toUpperCase()}
        </div>
        <div className="database-item-author-toartist-relation">
          <div className="database-item-by">By</div>
          {authorToArtistRelations.map((relation, index) => {
            return (
              <ToRelation target={relation.target} key={index}></ToRelation>
            );
          })}
        </div>
      </div>
      <div className="database-item-description-text">
        <div>
          {authorToTrackRelations.length > 0 ? (
            <div>
              <div className="database-item-contains-head-text">Tracks</div>
              <div className="database-item-scroll">
                {authorToTrackRelations.map((relation, index) => {
                  return (
                    <ToRelation
                      target={relation.target}
                      key={index}
                    ></ToRelation>
                  );
                })}
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="database-item-contains-totrack-text">
          {containsToTrackRelations.length > 0 ? (
            <div>
              <div className="database-item-contains-head-text">Tracks</div>
              {containsToTrackRelations.map((relation, index) => {
                return (
                  <ToRelation target={relation.target} key={index}></ToRelation>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="database-item-contains-toalbum-text">
          {containsToAlbumRelations.length > 0 ? (
            <div>
              <div className="database-item-contains-head-text">Albums</div>
              {containsToAlbumRelations.map((relation, index) => {
                return (
                  <ToRelation target={relation.target} key={index}></ToRelation>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="database-item-contains-toplaylist-text">
          {containsToPlaylistRelations.length > 0 ? (
            <div>
              <div className="database-item-contains-head-text">Playlists</div>
              {containsToPlaylistRelations.map((relation, index) => {
                return (
                  <ToRelation target={relation.target} key={index}></ToRelation>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="database-item-perfomsingenre-togenre-text">
          {performsInGenreToGenreRelations.length > 0 ? (
            <div>
              <div className="database-item-contains-head-text">Genres</div>
              {performsInGenreToGenreRelations.map((relation, index) => {
                return (
                  <ToRelation target={relation.target} key={index}></ToRelation>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <div className="database-item-perfomsingenre-toartist-text">
          {performsInGenreToArtistRelations.length > 0 ? (
            <div>
              <div className="database-item-contains-head-text">Artists</div>
              {performsInGenreToArtistRelations.map((relation, index) => {
                return (
                  <ToRelation target={relation.target} key={index}></ToRelation>
                );
              })}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RelationViewPage;

const ToRelation = ({ target }) => {
  return (
    <div className="database-item-torelation">{target.properties.name}</div>
  );
};
