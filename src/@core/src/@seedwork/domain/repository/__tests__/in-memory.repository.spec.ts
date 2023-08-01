import Entity from "../../entity/entity";
import NotFoundError from "../../errors/not-found.error";
import UniqueEntityid from "../../value-objects/unique-entity-id.vo";
import { InMemoryRepository } from "../in-memory.repository";

type StubEntityProps = {
    name: string;
    price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe("InMemoryRepository Unit Tests", () => {
    let repository: StubInMemoryRepository;
    beforeEach(() => (repository = new StubInMemoryRepository()));

    it("should inserts a new entity", async () => {
        const entity = new StubEntity({ name: "name value", price: 5 });
        await repository.insert(entity);
        expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it("should throws error when entity not found", async () => {
        await expect(repository.findById("fake id")).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));

        await expect(repository.findById(new UniqueEntityid("94b421e3-c60b-4b07-a947-590176bf827e"))).rejects.toThrow(
            new NotFoundError(`Entity Not Found using ID 94b421e3-c60b-4b07-a947-590176bf827e`)
        );
    });

    it("should finds a entity by id", async () => {
        const entity = new StubEntity({ name: "name value", price: 5 });
        await repository.insert(entity);

        let entityFound = await repository.findById(entity.id);
        expect(entityFound.toJSON()).toStrictEqual(repository.items[0].toJSON());

        entityFound = await repository.findById(entity.uniqueEntityid);
        expect(entityFound.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it("should returns all entities", async () => {
        const entity = new StubEntity({ name: "name value", price: 5 });
        await repository.insert(entity);

        const entities = await repository.findAll();

        expect(entities).toStrictEqual([entity]);
    });

    it("should throws error on update when entity not found", () => {
        const entity = new StubEntity({ name: "name value", price: 5 });
        expect(repository.update(entity)).rejects.toThrow(new NotFoundError(`Entity Not Found using ID ${entity.id}`));
    });

    it("should updates an entity", async () => {
        const entity = new StubEntity({ name: "name value", price: 5 });
        await repository.insert(entity);

        const entityUpdate = new StubEntity({ name: "updated", price: 1 }, entity.uniqueEntityid);

        await repository.update(entityUpdate);

        expect(entityUpdate.toJSON()).toStrictEqual(repository.items[0].toJSON());
    });

    it("should throws error on delete when entity not found", () => {
        expect(repository.delete("fake id")).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));

        expect(repository.delete(new UniqueEntityid("94b421e3-c60b-4b07-a947-590176bf827e"))).rejects.toThrow(
            new NotFoundError(`Entity Not Found using ID 94b421e3-c60b-4b07-a947-590176bf827e`)
        );
    });

    it("should delete an entity", async () => {
        let entity = new StubEntity({ name: "name value", price: 5 });
        await repository.insert(entity);

        await repository.delete(entity.id);
        expect(repository.items).toHaveLength(0);

        entity = new StubEntity({ name: "name value", price: 5 });
        await repository.insert(entity);

        await repository.delete(entity.uniqueEntityid);
        expect(repository.items).toHaveLength(0);
    });
});
