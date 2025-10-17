import { PostgresDeleteUserRepository } from '../../repositories/postegres/user/index.js'

export class DeleteUserUseCase {
    async execute(userId) {
        const deleteUserRepository = new PostgresDeleteUserRepository()
        const deleteUser = await deleteUserRepository.execute(userId)
        return deleteUser
    }
}
