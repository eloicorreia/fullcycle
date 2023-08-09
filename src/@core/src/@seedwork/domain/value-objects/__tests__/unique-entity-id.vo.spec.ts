import InvalidUuidError from "../../errors/invalid-uuid.error";
import UniqueEntityId from "../unique-entity-id.vo";
import {validate as uuidValidate} from 'uuid';

describe("UniqueEntityId Unit Tests", () => {

    const validateSpy = jest.spyOn(UniqueEntityId.prototype as any, 'validate');

    it('should throw erro when uuid is invalid', () => {
        expect(() => new UniqueEntityId('fake id')).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should accept a uuid passed in constructor', () => {
        const uuid = '94b421e3-c60b-4b07-a947-590176bf827e';
        const vo = new UniqueEntityId(uuid);
        expect(vo.value).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should accept a uuid passed in constructor', () => {
        const vo = new UniqueEntityId();
        expect(uuidValidate(vo.value)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});

