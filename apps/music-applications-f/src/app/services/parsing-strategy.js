export const Strategy = {
  ParseObj: function (rawData) {
    return rawData.map((value) => {
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
};
