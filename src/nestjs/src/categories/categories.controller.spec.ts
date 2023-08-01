import { SortDirection } from "@fc/micro-videos/@seedwork/domain";
import { CategoriesController } from "./categories.controller";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import {
    CreateCategoryUseCase,
    ListCategoriesUseCase,
    UpdateCategoryUseCase,
    GetCategoryUseCase
} from "@fc/micro-videos/category/application";

describe("CategoriesController Unit tests", () => {
    let controller: CategoriesController;

    beforeEach(async () => {
        controller = new CategoriesController();
    });

    it("should creates a category", async () => {
        const expectedOutput: CreateCategoryUseCase.Output = {
            id: "c59c61a1-3fa4-4aad-811d-b555430028d2",
            name: "Movie",
            description: "some description",
            is_active: true,
            created_at: new Date()
        };
        const mockCreateUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        };
        //@ts-expect-error
        controller["createUseCase"] = mockCreateUseCase;

        const input: CreateCategoryDto = {
            name: "Movie",
            description: "some description",
            is_active: true
        };
        const output = await controller.create(input);
        expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
        expect(expectedOutput).toStrictEqual(output);
    });

    it("should updates a category", async () => {
        const id = "c59c61a1-3fa4-4aad-811d-b555430028d2";
        const expectedOutput: UpdateCategoryUseCase.Output = {
            id,
            name: "Movie",
            description: "some description",
            is_active: true,
            created_at: new Date()
        };
        const mockUpdateUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        };
        //@ts-expect-error
        controller["updateUseCase"] = mockUpdateUseCase;
        const input: UpdateCategoryDto = {
            name: "Movie",
            description: "some description",
            is_active: true
        };
        const output = await controller.update(id, input);
        expect(mockUpdateUseCase.execute).toHaveBeenCalledWith({
            id,
            ...input
        });
        expect(expectedOutput).toStrictEqual(output);
    });

    it("should deletes a category", async () => {
        const expectedOutput = undefined;
        const mockDeleteUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        };
        //@ts-expect-error
        controller["deleteUseCase"] = mockDeleteUseCase;
        const id = "c59c61a1-3fa4-4aad-811d-b555430028d2";
        expect(controller.remove(id)).toBeInstanceOf(Promise);
        const output = await controller.remove(id);
        expect(mockDeleteUseCase.execute).toHaveBeenCalledWith({ id });
        expect(expectedOutput).toStrictEqual(output);
    });

    it("should get a category", async () => {
        const id = "c59c61a1-3fa4-4aad-811d-b555430028d2";
        const expectedOutput: GetCategoryUseCase.Output = {
            id,
            name: "Movie",
            description: "some description",
            is_active: true,
            created_at: new Date()
        };
        const mockGetUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        };
        //@ts-expect-error
        controller["getUseCase"] = mockGetUseCase;
        const output = await controller.findOne(id);
        expect(mockGetUseCase.execute).toHaveBeenCalledWith({ id });
        expect(expectedOutput).toStrictEqual(output);
    });

    it("should list a category", async () => {
        const expectedOutput: ListCategoriesUseCase.Output = {
            items: [
                {
                    id: "c59c61a1-3fa4-4aad-811d-b555430028d2",
                    name: "Movie",
                    description: "some description",
                    is_active: true,
                    created_at: new Date(),
                }
            ],
            current_page: 1,
            last_page: 1,
            per_page: 1,
            total: 1
        };
        const mockListUseCase = {
            execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput))
        };
        //@ts-expect-error
        controller["listUseCase"] = mockListUseCase;
        const searchParams = {
            page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: "desc" as SortDirection,
            filter: "test"
        };
        const output = await controller.search(searchParams);
        expect(mockListUseCase.execute).toHaveBeenCalledWith(searchParams);
        expect(expectedOutput).toStrictEqual(output);
    });
});
