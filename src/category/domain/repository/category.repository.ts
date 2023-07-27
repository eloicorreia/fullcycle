import { 
    SearchParams as DefaultSearchParams,
    SearchResult as DefaultSearchResult,
    SearchableRepositoryInterface } from '../../../@seedwork/domain/repository/repository-contracts';
import { Category } from '../entities/category';

export namespace CategoryRepository {
    export type Filter = string;

    export class SearchParams extends DefaultSearchParams<Filter>{

    }

    export class SearchResults extends DefaultSearchResult<Category, Filter> {
    
    }
    export interface Repository 
        extends SearchableRepositoryInterface<Category, Filter, SearchParams, SearchResults> {
    
    }

}

export default CategoryRepository;