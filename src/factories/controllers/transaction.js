import {
    GetUserByIdRepository,
    PostgresCreateTransictionRepository,
    PostgresDeleteTransactionRepository,
    PostgresGetTransactionByUserIdRepository,
    PostgresUpadateTransactionRepository,
} from './../../repositories/postegres/index.js'

import {
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    GetTransanctionByUserIdUseCase,
    UpdateTransactionUseCase,
} from './../../use-cases/index.js'

import {
    CreateTransactionController,
    DeleteTransactionController,
    GetTransanctionByUserIdController,
    UpdateTransactionController,
} from './../../controllers/index.js'

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

export const makeGetTransactionByUserId = () => {
    const postgresGetTransictionRepository =
        new PostgresGetTransactionByUserIdRepository()
    const postgresGetUserByIdRepository = new GetUserByIdRepository()
    const getTransanctionByUserIdUseCase = new GetTransanctionByUserIdUseCase(
        postgresGetTransictionRepository,
        postgresGetUserByIdRepository,
    )
    const getTransanctionByUserIdController =
        new GetTransanctionByUserIdController(getTransanctionByUserIdUseCase)

    return getTransanctionByUserIdController
}

export const makeUpdateTransaction = () => {
    const postgresUpadateTransactionRepository =
        new PostgresUpadateTransactionRepository()
    const updateTransactionUseCase = new UpdateTransactionUseCase(
        postgresUpadateTransactionRepository,
    )
    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    )

    return updateTransactionController
}

export const makeDeleteTransaction = () => {
    const postgresDeleteTransactionRepository =
        new PostgresDeleteTransactionRepository()
    const deleteTransactionUseCase = new DeleteTransactionUseCase(
        postgresDeleteTransactionRepository,
    )
    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactionUseCase,
    )

    return deleteTransactionController
}
