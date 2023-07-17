import UniqueEntityid from "../value-objects/unique-entity-id.vo";

export default abstract class Entity<Props = any> {
    public readonly uniqueEntityid: UniqueEntityid;

    constructor(public readonly props: Props, id?: UniqueEntityid) {   
        this.uniqueEntityid = id || new UniqueEntityid();     
    }

    get id(): string {
        return this.uniqueEntityid.value;
    }

    toJSON(): Required<{id: string} & Props> {
        return {
            id: this.id,
            ...this.props
        } as Required<{id: string} & Props>;
    }
}