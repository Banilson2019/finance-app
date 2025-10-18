export class GetUserByIdUseCase {
    constructor(postgreGetUserByIdRepository) {
        this.postgreGetUserByIdRepository = postgreGetUserByIdRepository
    }
    async execute(userId) {
        const user = await this.postgreGetUserByIdRepository.execute(userId)
        return user
    }
}
