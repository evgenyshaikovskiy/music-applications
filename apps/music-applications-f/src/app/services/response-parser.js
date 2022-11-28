export class ResponseParser {
  static parseResponseData(data, strategyName) {
    return strategyName(data);
  }
}
