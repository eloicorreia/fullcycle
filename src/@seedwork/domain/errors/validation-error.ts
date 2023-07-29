import { FieldsErrors } from "../validators/validator-fields-interface";

export default class ValidationError extends Error {}

export abstract class BaseValidationError extends Error {
    constructor(public error: FieldsErrors = {}, message = "Validation Error") {
      super(message);
    }
  }
  
  export class EntityValidationError extends BaseValidationError {
    constructor(error: FieldsErrors = {}) {
      super(error, "Entity Validation Error");
      this.name = "EntityValidationError";
    }
  }
  
  export class SearchValidationError extends BaseValidationError {
    constructor(public error: FieldsErrors = {}) {
      super(error, "Search Validation Error");
      this.name = "SearchValidationError";
    }
  }