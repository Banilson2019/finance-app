import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import {
    PostgresCreateUserRepository,
    GetUserByEmailRepository,
} from '../../repositories/postegres/user/index.js'
import { EmailAlreadyInUserError } from '../../errors/user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
        const getUserByEmailRepository = new GetUserByEmailRepository()
        const userWithProvidedemail = await getUserByEmailRepository.execute(
            createUserParams.email,
        )

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

        const postgresCreateUserRepository = new PostgresCreateUserRepository()
        const createdUser = postgresCreateUserRepository.execute(user)
        return createdUser
    }
}
