import { Observable } from 'rxjs';
import { RAEResponse } from '../model/rae-response';

export interface IRAEPort {

    /**
     * Obtener si una palabra existe
     * 
     * @param word palabra
     */
    existWord(word: string): Observable<RAEResponse>;
}
