import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineLetterComponent } from './line-letter.component';

describe('LineLetterComponent', () => {
    let component: LineLetterComponent;
    let fixture: ComponentFixture<LineLetterComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [LineLetterComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(LineLetterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
