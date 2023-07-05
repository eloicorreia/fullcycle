import InvalidUuidError from "../errors/invalid-uuid.error";
import UniqueEntityid from "./unique-entity-id.vo";
import {validate as uuidValidate} from 'uuid';

describe("UniqueEntityId Unit Tests", () => {

    const validateSpy = jest.spyOn(UniqueEntityid.prototype as any, 'validate');

    it('should throw erro when uuid is invalid', () => {
        expect(() => new UniqueEntityid('fake id')).toThrow(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should accept a uuid passed in constructor', () => {
        const uuid = '94b421e3-c60b-4b07-a947-590176bf827e';
        const vo = new UniqueEntityid(uuid);
        expect(vo.id).toBe(uuid);
        expect(validateSpy).toHaveBeenCalled();
    });

    it('should accept a uuid passed in constructor', () => {
        const vo = new UniqueEntityid();
        expect(uuidValidate(vo.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalled();
    });
});

