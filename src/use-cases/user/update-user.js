import bcrypt from 'bcrypt'
import {
    PostgresUpdateUserRepository,
    GetUserByEmailRepository,
} from '../../repositories/postegres/user/index.js'
import { EmailAlreadyInUserError } from '../../errors/user.js'

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const getUserByEmailRepository = new GetUserByEmailRepository()
            const userWithProvidedEmail =
                await getUserByEmailRepository.execute(updateUserParams.email)
            if (userWithProvidedEmail) {
                throw new EmailAlreadyInUserError(updateUserParams.email)
            }
        }

        const user = { ...updateUserParams }

        if (updateUserParams.password) {
            const hashedPassword = await bcrypt.hash(
                updateUserParams.password,
                10,
            )
            user.password = hashedPassword
        }
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
        const updateUser = await postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updateUser
    }
}
