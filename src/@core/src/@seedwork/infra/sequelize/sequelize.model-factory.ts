import { Model } from "sequelize-typescript";

export class SequelizeModelFactory<ModelClass extends Model, ModelProps = any> {
    private _count = 1;

    constructor(private model, private defaultFactoryProps: () => ModelProps) {}

    count(count: number) {
        this._count = count;
        return this;
    }

    // Cria só no banco de dados
    async create(data?: ModelProps): Promise<ModelClass> {
        return this.model.create(data ? data : this.defaultFactoryProps());
    }

    // Cria só em memoria
    make(data?: ModelProps): ModelClass {
        return this.model.build(data ? data : this.defaultFactoryProps());
    }

    // Cria só no banco de dados
    async bulkCreate(factoryProps?: (index: number) => ModelProps): Promise<ModelClass[]> {
        const data = new Array(this._count)
            .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
            .map((factory, index) => factory(index));
        return this.model.bulkCreate(data);
    }

    // Cria só em memoria
    bulkMake(factoryProps?: (index: number) => ModelProps): ModelClass[] {
        const data = new Array(this._count)
            .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
            .map((factory, index) => factory(index));
        return this.model.bulkBuild(data);
    }
}
