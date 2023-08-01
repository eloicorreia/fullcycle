import { DataType } from "sequelize-typescript";
import { CategoryModel } from "./category-model";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

describe("CategoryModel Unit Tests", () => {
    setupSequelize({ models: [CategoryModel] });

    test("mapping props", () => {
        const attributesMap = CategoryModel.getAttributes();
        const attributes = Object.keys(CategoryModel.getAttributes());

        expect(attributes).toStrictEqual(["id", "name", "description", "is_active", "created_at"]);

        const idAttr = attributesMap.id;
        expect(idAttr).toMatchObject({
            field: "id",
            fieldName: "id",
            primaryKey: true,
            type: DataType.UUID()
        });

        const nameAttr = attributesMap.name;
        expect(nameAttr).toMatchObject({
            field: "name",
            fieldName: "name",
            allowNull: false,
            type: DataType.STRING(255)
        });

        const descriptionAttr = attributesMap.description;
        expect(descriptionAttr).toMatchObject({
            field: "description",
            fieldName: "description",
            allowNull: true,
            type: DataType.TEXT()
        });

        const isActiveAttr = attributesMap.is_active;
        expect(isActiveAttr).toMatchObject({
            field: "is_active",
            fieldName: "is_active",
            allowNull: false,
            type: DataType.BOOLEAN()
        });

        const createdAt = attributesMap.created_at;
        expect(createdAt).toMatchObject({
            field: "created_at",
            fieldName: "created_at",
            allowNull: false,
            type: DataType.DATE()
        });
    });

    it("create", async () => {
        const arrange = {
            id: "7f4c4163-2a16-4039-bf67-c9b110a6d8c3",
            name: "test",
            is_active: true,
            created_at: new Date()
        };

        const category = await CategoryModel.create(arrange);
        expect(category.toJSON()).toStrictEqual(arrange);
    });
});
