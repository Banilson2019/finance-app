import { EmailAlreadyInUserError } from '../errors/user.js'
import { CreateUserUseCase } from '../use-cases/create-users.js'
import { badRequest, created, serverError } from './helper.js'
import validator from 'validator'

export class CreateUserController {
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

            const passwordIsValid = params.password.length < 6
            if (passwordIsValid) {
                return badRequest({
                    message: 'Password must be at least 6 characters',
                })
            }

            const emailIsValid = validator.isEmail(params.email)
            if (!emailIsValid) {
                return badRequest({
                    message: 'Invalid email. Please provide a valid email one',
                })
            }

            const createUseCase = new CreateUserUseCase()
            const createUser = await createUseCase.execute(params)
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
