import { FieldsErrors } from "./src/category/domain/validators/validator-fields-interface";

declare global {
    namespace jest {
        interface Matchers<R> {
            notificationContainsErrorMessages: (expected: Array<string | { [key: string]: string[] }>) => R
        }
    }
}