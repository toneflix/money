import { add, ceil, divide, floor, mod, multiply, round, share, subtract } from '../src/calculator'
import { describe, expect, it } from 'vitest'

describe('Calculator', () => {
    describe('value helper function', () => {
        it('should convert string to number correctly', () => {
            expect(add('10.5', 5)).toBe(15.5)
        })

        it('should handle negative numbers correctly', () => {
            expect(add(-10, '5')).toBe(-5)
        })
    })

    describe('add', () => {
        it('should add two numbers correctly', () => {
            expect(add(1, 2)).toBe(3)
        })

        it('should add number and string correctly', () => {
            expect(add(1, '2')).toBe(3)
        })

        it('should add two strings correctly', () => {
            expect(add('1', '2')).toBe(3)
        })
    })

    describe('subtract', () => {
        it('should subtract two numbers correctly', () => {
            expect(subtract(5, 3)).toBe(2)
        })

        it('should subtract number and string correctly', () => {
            expect(subtract(5, '3')).toBe(2)
        })

        it('should subtract two strings correctly', () => {
            expect(subtract('5', '3')).toBe(2)
        })
    })

    describe('multiply', () => {
        it('should multiply two numbers correctly', () => {
            expect(multiply(2, 3)).toBe(6)
        })

        it('should multiply number and string correctly', () => {
            expect(multiply(2, '3')).toBe(6)
        })

        it('should multiply two strings correctly', () => {
            expect(multiply('2', '3')).toBe(6)
        })
    })

    describe('divide', () => {
        it('should divide two numbers correctly', () => {
            expect(divide(6, 3)).toBe(2)
        })

        it('should divide number and string correctly', () => {
            expect(divide(6, '3')).toBe(2)
        })

        it('should divide two strings correctly', () => {
            expect(divide('6', '3')).toBe(2)
        })
    })

    describe('ceil', () => {
        it('should round up the number correctly', () => {
            expect(ceil(4.3)).toBe(5)
        })

        it('should round up the string number correctly', () => {
            expect(ceil('4.3')).toBe(5)
        })
    })

    describe('floor', () => {
        it('should round down the number correctly', () => {
            expect(floor(4.7)).toBe(4)
        })

        it('should round down the string number correctly', () => {
            expect(floor('4.7')).toBe(4)
        })
    })

    describe('round', () => {
        it('should round the number to nearest integer correctly', () => {
            expect(round(4.5)).toBe(5)
            expect(round(4.4)).toBe(4)
        })

        describe('share', () => {
            it('should calculate share correctly', () => {
                expect(share(50, 200, 100)).toBe(25)
            })

            it('should calculate share with string inputs correctly', () => {
                expect(share('50', '200', '100')).toBe(25)
            })
        })
    })

    describe('mod', () => {
        it('should calculate modulus correctly', () => {
            expect(mod(10, 3)).toBe(1)
        })

        it('should calculate modulus with string inputs correctly', () => {
            expect(mod('10', '3')).toBe(1)
        })
    })

    describe('absolute', () => {
        it('should return absolute value for negative number', () => {
            expect(Math.abs(-5)).toBe(5)
        })

        it('should return absolute value for string negative number', () => {
            expect(Math.abs(Number('-5'))).toBe(5)
        })
    })
})