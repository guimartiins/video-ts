import { FieldsErrors } from "./src/category/domain/validators/validator-fields-interface";

declare global {
    namespace jest {
        interface Matchers<R> {
            containsErrorMessages: (expected: FieldsErrors) => R;
        }
    }
}