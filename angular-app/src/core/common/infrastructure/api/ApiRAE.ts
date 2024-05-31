import {ApiClientImpl} from "@src/core/common/infrastructure/api/ApiClientImpl";
import {environment} from "@src/enviroments/environment";

export class ApiRAE extends ApiClientImpl {
  constructor() {
    super(environment.apiDictionaryUrl);
  }
}
