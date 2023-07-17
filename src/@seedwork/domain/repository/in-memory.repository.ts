import { RepositoryInterface, SearchableRepositoryInterface } from "./repository-contracts";
import Entity from "../entity/entity";
import UniqueEntityid from "../value-objects/unique-entity-id.vo";
import NotFoundError from "../errors/not-found.error";


export abstract class InMemoryRepository<E extends Entity> implements RepositoryInterface<E> {

    items: E[] = [];

    async insert(entity: E extends Entity<any> ? any : any): Promise<void> {
        this.items.push(entity);
    }
    async findById(id: string | UniqueEntityid): Promise<E extends Entity<any> ? any : any> {
        const _id = `${id}`;
        return this._get(_id);
    }
    async findAll(): Promise<(E extends Entity<any> ? any : any)[]> {
        return this.items;
    }
    async update(entity: E extends Entity<any> ? any : any): Promise<void> {
        await this._get(entity.id);
        const indexFound = this.items.findIndex(i => i.id === entity.id);
        this.items[indexFound] = entity;
    }
    async delete(id: string | UniqueEntityid): Promise<void> {
        const _id = `${id}`;
        await this._get(_id);
        const indexFound = this.items.findIndex(i => i.id === _id);
        this.items.splice(indexFound, 1);
    }

    protected async _get(id: string): Promise<E> {
        const item = this.items.find(i => i.id === id);

        if(!item) {
            throw new NotFoundError(`Entity Not Found using ID ${id}`);
        }

        return item;
    }

}


export abstract class InMemorySearchableRepository<E extends Entity> 
    extends InMemoryRepository<E> 
    implements SearchableRepositoryInterface<E, any, any> {


    async search(props: any): Promise<any> {
        throw new Error('Method not implemented.');
    }

}