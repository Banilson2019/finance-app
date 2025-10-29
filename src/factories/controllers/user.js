import {
    GetUserByEmailRepository,
    GetUserByIdRepository,
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUSerBalanceRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postegres/index.js'
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserBalenceUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from '../../use-cases/index.js'
import {
    CreateUserController,
    DeleteUserController,
    GetUserBalenceController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/index.js'

export const makeGetUserByID = () => {
    const postgreGetUserByIdRepository = new GetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgreGetUserByIdRepository,
    )
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    return getUserByIdController
}

export const makeCreateUser = () => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    const getUserByEmailRepository = new GetUserByEmailRepository()
    const createUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        getUserByEmailRepository,
    )
    const createUserController = new CreateUserController(createUseCase)

    return createUserController
}

export const makeUpdateUser = () => {
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
    const getUserByEmailRepository = new GetUserByEmailRepository()
    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        postgresUpdateUserRepository,
    )
    const updateUserController = new UpdateUserController(updateUserUseCase)

    return updateUserController
}

export const makeDeleteUser = () => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()
    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    )
    const deleteUser = new DeleteUserController(deleteUserUseCase)

    return deleteUser
}

export const makeGetUserBalanceUser = () => {
    const postgresGetUserBalanceRepository =
        new PostgresGetUSerBalanceRepository()
    const postgreGetUserByIdRepository = new GetUserByIdRepository()
    const getUserBalanceUseCase = new GetUserBalenceUseCase(
        postgresGetUserBalanceRepository,
        postgreGetUserByIdRepository,
    )
    const getUserByIdController = new GetUserBalenceController(
        getUserBalanceUseCase,
    )

    return getUserByIdController
}
