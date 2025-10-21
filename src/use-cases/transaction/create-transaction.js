import { v4 as uuidv4 } from 'uuid'
import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(postgrescreateTrasanctionRepository, getUserByIdRepository) {
        ;((this.postgrescreateTrasanctionRepository =
            postgrescreateTrasanctionRepository),
            (this.getUserByIdRepository = getUserByIdRepository))
    }
    async execute(createTransactionParams) {
        const userId = createTransactionParams.user_id
        const user = this.getUserByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }
        const idTransaction = uuidv4()

        const createTransaction =
            await this.postgrescreateTrasanctionRepository.execute({
                ...createTransactionParams,
                id: idTransaction,
            })

        return createTransaction
    }
}
