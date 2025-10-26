import { UserNotFoundError } from '../../errors/user.js'

export class GetTransanctionByUserIdUseCase {
    constructor(
        postgresGetTransactionByUserIdRepository,
        postgresGetUserByIdRepository,
    ) {
        ;((this.postgresGetTransactionByUserIdRepository =
            postgresGetTransactionByUserIdRepository),
            (this.postgresGetUserByIdRepository =
                postgresGetUserByIdRepository))
    }

    async execute(params) {
        const user = await this.postgresGetUserByIdRepository.execute(
            params.userId,
        )
        if (!user) {
            throw new UserNotFoundError(params.userId)
        }

        const transactions =
            await this.postgresGetTransactionByUserIdRepository.execute(
                params.userId,
            )
        return transactions
    }
}
