import { OnlyLettersDirective } from './only-letters.directive';

describe('OnlyLettersDirective', () => {
    let onlyLettersDirective: OnlyLettersDirective;

    beforeEach(() => {
        onlyLettersDirective = new OnlyLettersDirective();
    });

    it('Comprobamos instanci', () => {
        expect(onlyLettersDirective).toBeDefined();
    });

    it('Comprobamos el match correcto', () => {
        const event = { key: 'llosus' } as KeyboardEvent;
        const match = onlyLettersDirective.onKeydown(event);
        expect(match).toBe(true)
    });

    it('Comprobamos el match incorrecto', () => {
        const event = { key: '123aa5' } as KeyboardEvent;
        const match = onlyLettersDirective.onKeydown(event);
        expect(match).toBe(false)
    });
});