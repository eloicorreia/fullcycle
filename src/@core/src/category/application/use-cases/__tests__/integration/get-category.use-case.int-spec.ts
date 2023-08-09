import GetCategoryUseCase from "#category/application/use-cases/get-category.use-case";
import NotFoundError from "#seedwork/domain/errors/not-found.error";
import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

const { CategoryRepository, CategoryModel } = CategorySequelize;

describe("GetCategoryUseCase Unit Tests", () => {
    let useCase: GetCategoryUseCase.UseCase;
    let repository: CategorySequelize.CategoryRepository;

    setupSequelize({ models: [CategoryModel] });

    beforeEach(() => {
        repository = new CategoryRepository(CategoryModel);
        useCase = new GetCategoryUseCase.UseCase(repository);
    });

    it("should throws error when entity not found", async () => {
        await expect(() => useCase.execute({ id: "fake id" })).rejects.toThrow(new NotFoundError(`Entity Not Found using ID fake id`));
    });

    it("should returns a category", async () => {
        const model = await CategoryModel.factory().create();
        const output = await useCase.execute({ id: model.id });
        expect(output).toStrictEqual({
            id: output.id,
            name: output.name,
            description: output.description,
            is_active: output.is_active,
            created_at: output.created_at
        });
    });
});
