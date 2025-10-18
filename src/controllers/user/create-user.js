import { EmailAlreadyInUserError } from '../../errors/user.js'
import {
    badRequest,
    created,
    serverError,
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    emailIsAlreadyInUseResponse,
    invalidPasswordResponse,
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

            for (const fields of requiredFields) {
                if (!params[fields] || params[fields].trim().length === 0) {
                    return badRequest({
                        message: `Missing param: ${fields} `,
                    })
                }
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
