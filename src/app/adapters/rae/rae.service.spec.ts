import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../../environments/environment';
import { RAE_URL, RaeService } from './rae.service';

describe('RaeService', () => {

    let service: RaeService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientModule],
            providers: [
                RaeService,
                {
                    provide: RAE_URL,
                    useValue: environment.api
                }]
        });
        service = TestBed.inject(RaeService);
    });

    it('Comprovamos existWorld', () => {
        firstValueFrom(service.existWord('pepe')).then(res => {
            expect(res.exist).toBe(true);
        });
    });

    it('Comprovamos no existe', () => {
        firstValueFrom(service.existWord('aaaaa')).then(res => {
            expect(res.exist).toBe(false);
        });
    });
});
