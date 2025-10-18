import bcrypt from 'bcrypt'
import { EmailAlreadyInUserError } from '../../errors/user.js'

export class UpdateUserUseCase {
    constructor(getUserByEmailRepository, postgresUpdateUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository
        this.postgresUpdateUserRepository = postgresUpdateUserRepository
    }
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.getUserByEmailRepository.execute(
                    updateUserParams.email,
                )
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
        const updateUser = await this.postgresUpdateUserRepository.execute(
            userId,
            user,
        )

        return updateUser
    }
}
