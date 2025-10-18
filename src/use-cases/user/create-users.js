import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'

import { EmailAlreadyInUserError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(postgresCreateUserRepository, getUserByEmailRepository) {
        ;((this.postgresCreateUserRepository = postgresCreateUserRepository),
            (this.getUserByEmailRepository = getUserByEmailRepository))
    }
    async execute(createUserParams) {
        const userWithProvidedemail =
            await this.getUserByEmailRepository.execute(createUserParams.email)

        if (userWithProvidedemail) {
            throw new EmailAlreadyInUserError(createUserParams.email)
        }

        const userId = uuidv4()

        const hasHedPassword = await bcrypt.hash(createUserParams.password, 10)
        const user = {
            ...createUserParams,
            id: userId,
            password: hasHedPassword,
        }

        const createdUser = this.postgresCreateUserRepository.execute(user)
        return createdUser
    }
}
