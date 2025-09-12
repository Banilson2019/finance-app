import { v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcrypt'
import { PostgresCreateUserRepository } from '../repositories/postegres/create-user.js'

export class CreateUserUseCase {
    async execute(createUserParams) {
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
