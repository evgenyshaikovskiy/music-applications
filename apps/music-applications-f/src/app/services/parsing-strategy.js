export const Strategy = {
  ParseNames: function (rawData) {
    return rawData.map((value) => value['_fields'][0])
  },
};
