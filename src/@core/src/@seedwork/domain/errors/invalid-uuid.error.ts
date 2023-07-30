export class InvalidUuidError extends Error {
    constructor(message?: string) {
        super(message || "ID mest be a valid UUID");
        this.name = 'InvalidUUidError';
    }
}

export default InvalidUuidError;