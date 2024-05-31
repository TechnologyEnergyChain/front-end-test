import { TestBed } from "@angular/core/testing";
import { HttpGameMockCLient } from "./http-game-mock-client.service";

describe('HttpGameMockProvider', () => {

    let service: HttpGameMockCLient;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                HttpGameMockCLient,
            ]
        });
        service = TestBed.inject(HttpGameMockCLient);
    });

    it('Comprovamos gameEnpoint', () => {
        expect(service['worldGameMockService']);
    });

    it('Comprovamos get', () => {
        service.get('guess');
        service.get('game');
    });

    it('Comprovamos post', () => {
        service.post('http://ola.com', null, null);
    });

    it('Comprovamos httpNotFOund', () => {
        service['httpNotFOund']();
    });

});