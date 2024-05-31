import { Inject, Injectable, InjectionToken, inject } from "@angular/core";
import { IRAEPort } from "../../domain/ports/i-rae-port";
import { Observable } from "rxjs";
import { HttpClient, HttpParams } from "@angular/common/http";
import { RAEResponse } from "../../domain/model/rae-response";

export const RAE_URL = new InjectionToken<string>('RAE_URL');

@Injectable()
export class RaeService implements IRAEPort {

    constructor(
        @Inject(RAE_URL) private raeApi: string,
        private http: HttpClient) { }

    existWord(word: string): Observable<RAEResponse> {
        const encodeWord = encodeURI(word);
        const params = new HttpParams().set('word', encodeWord);
        return this.http.get(`${this.raeApi}/exist-word`, { params });
    }
}