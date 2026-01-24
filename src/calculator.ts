import { ErrorException } from './Exceptions/ErrorException'

/**
 * Subtracts the subtrahend from the amount.
 * 
 * @param amount 
 * @param subtrahend 
 * @returns 
 */
export const subtract = (amount: string | number, subtrahend: string | number): number => {
    return value(amount) - value(subtrahend)
}

/**
 * Adds the addend to the amount.
 * 
 * @param amount 
 * @param addend 
 * @returns 
 */
export const add = (amount: string | number, addend: string | number): number => {
    return value(amount) + value(addend)
}

/**
 * Multiplies the amount by the multiplier.
 * 
 * @param amount 
 * @param multiplier 
 * @returns 
 */
export const multiply = (amount: string | number, multiplier: string | number): number => {
    return value(amount) * value(multiplier)
}

/**
 * Divides the amount by the divisor.
 * 
 * @param amount 
 * @param divisor 
 * @returns 
 */
export const divide = (amount: string | number, divisor: string | number): number => {
    if (value(divisor) === 0) {
        throw new ErrorException('Division by zero')
    }

    return value(amount) / value(divisor)
}

/**
 * Rounds the amount up to the nearest integer.
 * 
 * @param amount 
 * @returns 
 */
export const ceil = (amount: string | number): number => {
    return Math.ceil(value(amount))
}

/**
 * Calculates the share of the amount based on the total and ratio.
 * 
 * @param amount 
 * @param total 
 * @param ratio 
 * @returns 
 */
export const share = (
    amount: string | number,
    total: string | number,
    ratio: string | number): number => {

    return Math.floor((value(amount) * value(ratio)) / value(total))
}

/**
 * Rounds the amount down to the nearest integer.
 * 
 * @param amount 
 * @returns 
 */
export const floor = (amount: string | number): number => {
    return Math.floor(value(amount))
}

/**
 * Rounds the amount to the specified number of digits.
 * 
 * @param amount 
 * @param digits 
 * @returns 
 */
export const round = (amount: string | number, digits: number = 0): number => {
    const factor = Math.pow(10, digits)

    return Math.round(value(amount) * factor) / factor
}

/**
 * Calculates the modulus of the amount by the divisor.
 * 
 * @param amount 
 * @param divisor 
 * @returns 
 */
export const mod = (amount: string | number, divisor: string | number): number => {
    return value(amount) % value(divisor)
}

/**
 * Returns the absolute value of the amount.
 * 
 * @param amount 
 * @returns 
 */
export const absolute = (amount: string | number): number => {
    return Math.abs(value(amount))
}

/**
 * Converts a string or number to a number.
 * 
 * @param value 
 * @returns 
 */
export const value = (value: string | number): number => {
    if (typeof value === 'number') {
        return value
    } else {
        return parseFloat(value)
    }
}