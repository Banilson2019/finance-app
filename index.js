import 'dotenv/config'
import express from 'express'
import {
    makeCreateUser,
    makeDeleteUser,
    makeGetUserByID,
    makeUpdateUser,
} from './src/factories/controllers/user.js'
import {
    makeCreateTransaction,
    makeGetTransactionByUserId,
    makeDeleteTransaction,
    makeUpdateTransaction,
} from './src/factories/controllers/transaction.js'

const app = express()
app.use(express.json())

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = makeGetUserByID()
    const { statusCode, body } = await getUserByIdController.execute(req)
    res.status(statusCode).send(body)
})

app.post('/api/users', async (req, res) => {
    const createUserController = makeCreateUser()
    const { statusCode, body } = await createUserController.execute(req)
    res.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (req, res) => {
    const updateUserController = makeUpdateUser()
    const { statusCode, body } = await updateUserController.execute(req)
    res.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUser = makeDeleteUser()
    const { statusCode, body } = await deleteUser.execute(req)
    res.status(statusCode).send(body)
})

app.get('/api/transaction', async (req, res) => {
    const getTransaction = makeGetTransactionByUserId()
    const { statusCode, body } = await getTransaction.execute(req)
    res.status(statusCode).send(body)
})

app.post('/api/transaction', async (req, res) => {
    const createTransaction = makeCreateTransaction()
    const { statusCode, body } = await createTransaction.execute(req)
    res.status(statusCode).send(body)
})
app.patch('/api/transaction/:transactionId', async (req, res) => {
    const updateTransaction = makeUpdateTransaction()
    const { statusCode, body } = await updateTransaction.execute(req)
    res.status(statusCode).send(body)
})

app.delete('/api/transaction/:transactionId', async (req, res) => {
    const deleteTransaction = makeDeleteTransaction()
    const { statusCode, body } = await deleteTransaction.execute(req)
    res.status(statusCode).send(body)
})
app.listen(process.env.PORT, () =>
    console.log(`listening on port ${process.env.PORT}`),
)
