import { Category } from "category/domain/entities/category";
import { InMemorySearchableRepository } from "../../../@seedwork/domain/repository/in-memory.repository";
import CategoryRepository from "category/domain/repository/CategoryRepository";


export default class CategoryInMemoryRepository 
    extends InMemorySearchableRepository<Category> 
    implements CategoryRepository {



}