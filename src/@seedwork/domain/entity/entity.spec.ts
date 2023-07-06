import UniqueEntityid from "../value-objects/unique-entity-id.vo";
import Entity from "./entity";
import {validate as uuidValidate} from 'uuid';

class StubEntity extends Entity<{prop1: string; prop2: number}> {}

describe('Entity Unit Tests', () => {

    it("shold set props and id", () => {
        const arrange = {prop1: "prop1 value", prop2: 10};
        const entity = new StubEntity(arrange);
        expect(entity.props).toStrictEqual(arrange);
        expect(entity.uniqueEntityid).toBeInstanceOf(UniqueEntityid);
        expect(entity.id).not.toBeNull();
        expect(uuidValidate(entity.id)).toBeTruthy();
    });

    it('should accept a valid uuid', () => {
        const arrange = {prop1: "prop1 value", prop2: 10};
        const uniqueEntityid = new UniqueEntityid();
        const entity = new StubEntity(arrange, uniqueEntityid);
        expect(entity.uniqueEntityid).toBeInstanceOf(UniqueEntityid);
        expect(entity.id).toBe(uniqueEntityid.value);

    });

    it('should convert a entity to a JavaScript Object', () => {
        const arrange = {prop1: "prop1 value", prop2: 10};
        const uniqueEntityid = new UniqueEntityid();
        const entity = new StubEntity(arrange, uniqueEntityid);  
        
        expect(entity.toJSON()).toStrictEqual({
            id: entity.id,
            ...arrange,
        });
    })
    
});