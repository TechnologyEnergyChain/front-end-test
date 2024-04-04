import { TestBed } from '@angular/core/testing';

import { WordleStateService } from './wordleState.service.ts.service';

describe('WordleStateServiceTsService', () => {
    let service: WordleStateService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(WordleStateService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
