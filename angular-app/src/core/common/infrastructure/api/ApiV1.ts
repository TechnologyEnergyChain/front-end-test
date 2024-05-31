import {ApiClientImpl} from "@src/core/common/infrastructure/api/ApiClientImpl";
import {environment} from "@src/enviroments/environment";

export class ApiV1 extends ApiClientImpl {
  constructor() {
    super(environment.apiV1Url);
  }
}
