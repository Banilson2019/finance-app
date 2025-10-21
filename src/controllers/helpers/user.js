import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 characters',
    })

export const emailIsAlreadyInUseResponse = () =>
    badRequest({
        message: 'Email is already in use.',
    })

export const userNotFound = () =>
    notFound({
        message: 'User not found',
    })
export const checkIfPasswordIsValid = (password) => password.length >= 6
export const checkIfEmailIsValid = (email) => validator.isEmail(email)
