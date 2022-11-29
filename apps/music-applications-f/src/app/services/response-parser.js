export class ResponseParser {
  static parseResponseData(data, strategyName) {
    return strategyName(data);
  }

  static collectData(data, collectStrategy) {
    return collectStrategy(data);
  }
}
