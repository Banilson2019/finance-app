import { EmailAlreadyInUserError } from '../../errors/user.js'
import {
    badRequest,
    created,
    serverError,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseResponse,
    invalidPasswordResponse,
    validateRequireFields,
} from '../helpers/index.js'

export class CreateUserController {
    constructor(createUseCase) {
        this.createUseCase = createUseCase
    }
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const { ok: someRequiredFieldsWereProvided, missingField } =
                validateRequireFields(params, requiredFields)
            if (!someRequiredFieldsWereProvided) {
                return badRequest({
                    message: `The field ${missingField} is required.`,
                })
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password)
            if (!passwordIsValid) {
                return invalidPasswordResponse()
            }

            const emailIsValid = checkIfEmailIsValid(params.email)
            if (!emailIsValid) {
                return emailIsAlreadyInUseResponse()
            }

            const createUser = await this.createUseCase.execute(params)
            return created(createUser)
        } catch (error) {
            console.error(error)
            if (error instanceof EmailAlreadyInUserError) {
                return badRequest({
                    message: error.message,
                })
            }
            return serverError()
        }
    }
}
