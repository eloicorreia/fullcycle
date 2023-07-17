export default class InvalidUuidError extends Error {
    constructor(message?: string) {
        super(message || "ID mest be a valid UUID");
        this.name = 'InvalidUUidError';
    }
}