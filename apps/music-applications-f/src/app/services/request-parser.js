export class RequestParser {
  static parseResponseData(data, strategyName) {
    return strategyName(data);
  }
}
