import { UserNotFoundError } from '../../errors/user.js'

export class GetUserBalenceUseCase {
    constructor(
        postgresGetUserBalanceRepository,
        postgresGetUserByIdRepository,
    ) {
        this.postgresGetUserBalanceRepository = postgresGetUserBalanceRepository
        this.postgresGetUserByIdRepository = postgresGetUserByIdRepository
    }
    async execute(params) {
        const user = await this.postgresGetUserByIdRepository.execute(
            params.userId,
        )

        if (!user) {
            throw new UserNotFoundError()
        }

        const balance = await this.postgresGetUserBalanceRepository.execute(
            user.id,
        )
        return balance
    }
}
