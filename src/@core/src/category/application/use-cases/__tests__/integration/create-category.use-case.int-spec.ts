import { CategorySequelize } from "#category/infra/db/sequelize/category-sequelize";
import CreateCategoryUseCase from "#category/application/use-cases/create-category.use-case";
import { setupSequelize } from "#seedwork/infra/testing/helpers/db";

const { CategoryRepository, CategoryModel } = CategorySequelize;

describe("CreateCategoryUseCase Integration Tests", () => {
    let useCase: CreateCategoryUseCase.UseCase;
    let repository: CategorySequelize.CategoryRepository;

    setupSequelize({ models: [CategoryModel] });

    beforeEach(() => {
        repository = new CategoryRepository(CategoryModel);
        useCase = new CreateCategoryUseCase.UseCase(repository);
    });

    describe("test with test.each", () => {
        const arrange = [
            {
                inputProps: { name: "test" },
                outputProps: {
                    name: "test",
                    description: null,
                    is_active: true
                }
            }
        ];
        test.each(arrange)("input $inputProps, output $outputProps", async ({ inputProps, outputProps }) => {
            const output = await useCase.execute(inputProps);
            const entity = await repository.findById(output.id);
            expect(output.id).toBe(entity.id);
            expect(output.created_at).toStrictEqual(entity.created_at);
            expect(output).toMatchObject(outputProps);
        });
    });

    it("should create a category", async () => {
        let output = await useCase.execute({ name: "test" });
        let entity = await repository.findById(output.id);
        expect(output).toStrictEqual({
            id: entity.id,
            name: "test",
            description: null,
            is_active: true,
            created_at: entity.props.created_at
        });

        output = await useCase.execute({
            name: "test",
            description: "some description"
        });
        entity = await repository.findById(output.id);
        expect(output).toStrictEqual({
            id: entity.id,
            name: "test",
            description: "some description",
            is_active: true,
            created_at: entity.props.created_at
        });

        output = await useCase.execute({
            name: "test",
            description: "some description",
            is_active: true
        });
        entity = await repository.findById(output.id);
        expect(output).toStrictEqual({
            id: entity.id,
            name: "test",
            description: "some description",
            is_active: true,
            created_at: entity.props.created_at
        });

        output = await useCase.execute({
            name: "test",
            description: "some description",
            is_active: false
        });
        entity = await repository.findById(output.id);
        expect(output).toStrictEqual({
            id: entity.id,
            name: "test",
            description: "some description",
            is_active: false,
            created_at: entity.props.created_at
        });
    });
});
