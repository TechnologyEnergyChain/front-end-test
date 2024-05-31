import { DragDropModule } from "@angular/cdk/drag-drop";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatCardModule } from "@angular/material/card";
import { KeyboardComponent } from "./keyboard.component";


describe('KeyboardComponent', () => {

    let component: KeyboardComponent;
    let fixture: ComponentFixture<KeyboardComponent>;

    beforeEach(async () => {

        await TestBed.configureTestingModule({
            imports: [
                MatCardModule,
                DragDropModule
            ],
            declarations: [
                KeyboardComponent
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(KeyboardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Comprobar KeyboardComponent', () => {
        expect(component).toBeTruthy();
    });

    it('Comprobar alternate', () => {
        spyOn(component, 'alternate').and.callThrough();
        component.alternate();
        component.alternate();
        fixture.detectChanges();
        fixture.whenStable().then(() => {
            expect(component.alternate).toHaveBeenCalledTimes(2);
            expect(component.isShow).toBe(false);
        });
    });

    it('Comprobar show', () => {
        component.show();
        expect(component.isShow).toBe(true);
    });

    it('Comprobar keyPress', () => {
        component['keyPress']('a');
    });

    it('Comprobar hide', () => {
        component.hide();
        expect(component.isShow).toBe(false);
    });

    it('Comprobar ngOnDestroy', () => {
        component.ngOnDestroy();
        expect(component.isShow).toBe(false);
    });
});
