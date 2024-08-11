import { ClassValidatorFields } from "../../../category/domain/validators/class-validator-fields"
import { EntityValidationError } from "../../../category/domain/validators/validation.error"
import { FieldsErrors } from "../../../category/domain/validators/validator-fields-interface"

type Expected =
    | {
        validator: ClassValidatorFields<any>
        data: any
    } | (() => any)

expect.extend({
    containsErrorMessages(expected: Expected, received: FieldsErrors) {
        if (typeof expected === 'function') {
            try {
                expected()
                return isValid()
            } catch (e) {
                const errors = e as EntityValidationError
                return assertContainsErrorsMessages(errors.error, received)
            }
        } else {
            const { validator, data } = expected
            const validated = validator.validate(data)


            if (validated) {
                return isValid()
            }

            return assertContainsErrorsMessages(validator.errors, received)
        }
    }
})

function assertContainsErrorsMessages(expected: FieldsErrors, received: FieldsErrors) {
    const isMatch = expect.objectContaining(received).asymmetricMatch(expected)

    return isMatch
        ? isValid()
        : {
            pass: false,
            message: () => `The validation errors not contains ${JSON.stringify(received)}. Current: ${JSON.stringify(expected)}`
        }
}

function isValid() {
    return {
        message: () => '',
        pass: true
    }
}
