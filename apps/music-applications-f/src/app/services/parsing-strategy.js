export const Strategy = {
  ParseGraphDbObj: function (rawData) {
    return rawData.data.records.map((value) => {
      const record = value['_fields'][0];
      return {
        type: [record.labels],
        properties: record.properties,
        label:
          record.properties.title ||
          record.properties.name ||
          record.properties.kind,
      };
    });
  },
  ParseWebSpotifyObj: function (rawData) {
    return rawData.data.items.map((value) => {
      return {
        type: value.type,
        spotify_id: value.id,
        label: value.name,
        artists: value.artists,
        album: value.album,
      };
    });
  },
};
