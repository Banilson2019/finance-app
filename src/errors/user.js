export class EmailAlreadyInUserError extends Error {
    constructor(email) {
        super(`The email ${email} is already in use`)
        this.name = 'EmailAlreadyInUserError'
    }
}

export class UserNotFoundError extends Error {
    constructor(userId) {
        super(`The user with id ${userId} is not found`)
        this.name = 'UserNotFoundError'
    }
}
