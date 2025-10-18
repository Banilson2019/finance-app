import {
    GetUserByEmailRepository,
    GetUserByIdRepository,
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresUpdateUserRepository,
} from '../../repositories/postegres/user/index.js'
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from '../../use-cases/user/index.js'
import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/user/index.js'

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
