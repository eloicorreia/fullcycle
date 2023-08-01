import { Category } from "#category/domain";
import { CategoryModel, CategoryModelMapper } from "#category/infra";
import { LoadEntityError } from "#seedwork/domain";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

describe("CategoryMapper Unit tests", () => {
    setupSequelize({ models: [CategoryModel] });

    it("should throws error when category is invalid", () => {
        const model = CategoryModel.build({ id: "bebe80eb-7a4a-4df2-9e14-fe812455d913" });
        try {
            CategoryModelMapper.toEntity(model);
            fail("The category is valid, but is need throws a LoadEntityError");
        } catch (e) {
            if (e instanceof LoadEntityError) {
                expect(e).toBeInstanceOf(LoadEntityError);
                expect(e.error).containsErrorMessages({
                    name: ["name should not be empty"]
                });
            }
        }
    });

    it("should throw a generic error", () => {
        const error = new Error("Generic Error");
        const spyValidate = jest.spyOn(Category, "validate").mockImplementation(() => {
            throw error;
        });
        const model = CategoryModel.build({ id: "bebe80eb-7a4a-4df2-9e14-fe812455d913" });
        expect(() => CategoryModelMapper.toEntity(model)).toThrow(error);
        expect(spyValidate).toHaveBeenCalled();
    });
});
