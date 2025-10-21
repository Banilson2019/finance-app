import {
    GetUserByIdRepository,
    PostgresCreateTransictionRepository,
} from './../../repositories/postegres/index.js'

import { CreateTransactionUseCase } from './../../use-cases/index.js'

import { CreateTransactionController } from './../../controllers/index.js'

export const makeCreateTransaction = () => {
    const createTansactionRepository = new PostgresCreateTransictionRepository()
    const getUserByIdUseCase = new GetUserByIdRepository()
    const createTansactionUseCase = new CreateTransactionUseCase(
        createTansactionRepository,
        getUserByIdUseCase,
    )
    const createTransactionController = new CreateTransactionController(
        createTansactionUseCase,
    )

    return createTransactionController
}
