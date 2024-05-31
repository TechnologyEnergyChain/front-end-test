import {ApiClientImpl} from "@src/core/common/infrastructure/api/ApiClientImpl";

export class ApiV1 extends ApiClientImpl {
  // FIXME: Use an environment variable to set the value of baseURL instead of a hardcoded string
  constructor() {
    super('http://localhost:3001/v1');
  }
}
