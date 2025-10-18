import 'dotenv/config'
import express from 'express'
import {
    CreateUserController,
    GetUserByIdController,
    UpdateUserController,
    DeleteUserController,
} from './src/controllers/user/index.js'
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from './src/use-cases/user/index.js'
import {
    GetUserByEmailRepository,
    GetUserByIdRepository,
    PostgresCreateUserRepository,
    PostgresDeleteUserRepository,
    PostgresUpdateUserRepository,
} from './src/repositories/postegres/user/index.js'

const app = express()
app.use(express.json())

app.get('/api/users/:userId', async (req, res) => {
    const postgreGetUserByIdRepository = new GetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(
        postgreGetUserByIdRepository,
    )
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
    const { statusCode, body } = await getUserByIdController.execute(req)
    res.status(statusCode).send(body)
})

app.post('/api/users', async (req, res) => {
    const postgresCreateUserRepository = new PostgresCreateUserRepository()
    const getUserByEmailRepository = new GetUserByEmailRepository()
    const createUseCase = new CreateUserUseCase(
        postgresCreateUserRepository,
        getUserByEmailRepository,
    )
    const createUserController = new CreateUserController(createUseCase)
    const { statusCode, body } = await createUserController.execute(req)
    res.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (req, res) => {
    const postgresUpdateUserRepository = new PostgresUpdateUserRepository()
    const getUserByEmailRepository = new GetUserByEmailRepository()
    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        postgresUpdateUserRepository,
    )
    const updateUserController = new UpdateUserController(updateUserUseCase)
    const { statusCode, body } = await updateUserController.execute(req)
    res.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (req, res) => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()
    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    )
    const deleteUser = new DeleteUserController(deleteUserUseCase)
    const { statusCode, body } = await deleteUser.execute(req)
    res.status(statusCode).send(body)
})
app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
