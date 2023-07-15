import ValidationError from '../errors/validation-error';
import ValidatorRules from "./validator-rules"

describe('ValidatorRules Unit Tests', () => {
    test('values method', () => {
        const validator = ValidatorRules.values('some value', 'field');
        expect(validator).toBeInstanceOf(ValidatorRules);
        expect(validator['value']).toBe('some value');
        expect(validator['property']).toBe('field');
    });

    test('required validator rules', () => {
        let arrange: {value: any; property: string; messageError: string }[] = [
            {value: null, property: 'field', messageError: 'The field is required'},
            {value: undefined, property: 'field', messageError: 'The field is required'},
            {value: "", property: 'field', messageError: 'The field is required'},
        ];

        arrange.forEach(item => {
            expect(() => {
                ValidatorRules.values(item.value, item.property).required();                
            }).toThrow(new ValidationError(item.messageError));
        });

        arrange = [
            {value: 'teste', property: 'field', messageError: 'The field is required'},
            {value: 5, property: 'field', messageError: 'The field is required'},
            {value: 0, property: 'field', messageError: 'The field is required'},
            {value: false, property: 'field', messageError: 'The field is required'},
        ];

        arrange.forEach(item => {
            expect(() => {
                ValidatorRules.values(item.value, item.property).required();                
            }).not.toThrow(new ValidationError(item.messageError));
        });


    });
})