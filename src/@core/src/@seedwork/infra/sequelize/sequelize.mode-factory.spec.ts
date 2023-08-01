import { Column, DataType, PrimaryKey, Model, Table } from "sequelize-typescript";
import { SequelizeModelFactory } from "./sequelize.model-factory";
import _chance from "chance";
import { validate as uuidValidate } from "uuid";
import { setupSequelize } from "../testing/helpers/db";

const chance = _chance();

@Table({})
class StubModel extends Model {
    @PrimaryKey
    @Column({ type: DataType.UUID })
    declare id;

    @Column({ allowNull: false, type: DataType.STRING(255) })
    declare name;

    static mockFactory = jest.fn(() => ({
        id: chance.guid({ version: 4 }),
        name: chance.word()
    }));

    static factory() {
        return new SequelizeModelFactory<StubModel, { id: string; name: string }>(StubModel, StubModel.mockFactory);
    }
}
describe("SequelizeModelFactory Unit tests", () => {
    setupSequelize({ models: [StubModel] });

    test("create method", async () => {
        let model = await StubModel.factory().create();
        expect(uuidValidate(model.id)).toBeTruthy();
        expect(model.id).not.toBeNull();
        expect(model.name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalled();
        let modelFound = await StubModel.findByPk(model.id);
        expect(model.id).toBe(modelFound.id);

        model = await StubModel.factory().create({
            id: "bebe80eb-7a4a-4df2-9e14-fe812455d913",
            name: "test"
        });
        expect(model.id).toBe("bebe80eb-7a4a-4df2-9e14-fe812455d913");
        expect(model.name).toBe("test");
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

        modelFound = await StubModel.findByPk(model.id);
        expect(model.id).toBe(modelFound.id);
    });

    test("make method", async () => {
        let model = StubModel.factory().make();
        expect(uuidValidate(model.id)).toBeTruthy();
        expect(model.id).not.toBeNull();
        expect(model.name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalled();

        model = await StubModel.factory().create({
            id: "bebe80eb-7a4a-4df2-9e14-fe812455d913",
            name: "test"
        });
        expect(model.id).toBe("bebe80eb-7a4a-4df2-9e14-fe812455d913");
        expect(model.name).toBe("test");
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
    });

    test("bulkCreate method using count = 1", async () => {
        let models = await StubModel.factory().bulkCreate();

        expect(models).toHaveLength(1);
        expect(models[0].id).not.toBeNull();
        expect(models[0].name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalled();
        let modelFound = await StubModel.findByPk(models[0].id);
        expect(models[0].id).toBe(modelFound.id);

        models = await StubModel.factory().bulkCreate(() => ({
            id: "bebe80eb-7a4a-4df2-9e14-fe812455d913",
            name: "test"
        }));
        expect(models[0].id).toBe("bebe80eb-7a4a-4df2-9e14-fe812455d913");
        expect(models[0].name).toBe("test");
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

        modelFound = await StubModel.findByPk(models[0].id);
        expect(models[0].id).toBe(modelFound.id);
        expect(models[0].name).not.toBeNull();
    });

    test("bulkCreate method using count > 1", async () => {
        let models = await StubModel.factory().count(2).bulkCreate();

        expect(models).toHaveLength(2);
        expect(models[0].id).not.toBeNull();
        expect(models[0].name).not.toBeNull();
        expect(models[1].id).not.toBeNull();
        expect(models[1].name).not.toBeNull();
        expect(models[0].id).not.toBe(models[1].name);
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);

        const modelFound1 = await StubModel.findByPk(models[0].id);
        expect(models[0].id).toBe(modelFound1.id);
        expect(models[0].name).toBe(modelFound1.name);

        const modelFound2 = await StubModel.findByPk(models[1].id);
        expect(models[1].id).toBe(modelFound2.id);
        expect(models[1].name).toBe(modelFound2.name);

        models = await StubModel.factory()
            .count(2)
            .bulkCreate(() => ({
                id: chance.guid({ version: 4 }),
                name: "test"
            }));
        expect(models[0].id).not.toBe(models[1].id);
        expect(models[0].name).toBe("test");
        expect(models[1].name).toBe("test");
        expect(models).toHaveLength(2);
    });

    test("bulkMake method using count = 1", async () => {
        let models = StubModel.factory().bulkMake();

        expect(models).toHaveLength(1);
        expect(models[0].id).not.toBeNull();
        expect(models[0].name).not.toBeNull();
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);

        models = await StubModel.factory().bulkCreate(() => ({
            id: "bebe80eb-7a4a-4df2-9e14-fe812455d913",
            name: "test"
        }));

        expect(models).toHaveLength(1);
        expect(models[0].id).toBe("bebe80eb-7a4a-4df2-9e14-fe812455d913");
        expect(models[0].name).toBe("test");
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(1);
    });

    test("bulkMake method using count > 1", async () => {
        let models = StubModel.factory().count(2).bulkMake();

        expect(models).toHaveLength(2);
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
        expect(models[0].id).not.toBeNull();
        expect(models[0].name).not.toBeNull();
        expect(models[1].id).not.toBeNull();
        expect(models[1].name).not.toBeNull();
        expect(models[0].id).not.toBe(models[1].name);

        models = StubModel.factory()
            .count(2)
            .bulkMake(() => ({
                id: chance.guid({ version: 4 }),
                name: "test"
            }));

        expect(models).toHaveLength(2);
        expect(models[0].id).not.toBe(models[1].id);
        expect(models[0].name).toBe("test");
        expect(models[1].name).toBe("test");
        expect(StubModel.mockFactory).toHaveBeenCalledTimes(2);
    });
});
