import { MIN_LENGTH, MIN_LENGTH_NAME } from '../consts/profile'

const validateLength = (value: string, length: number): boolean => {
  if (value.length < length) {
    return false
  }
  return true
}

export const validateLengthCommon = (value: string): boolean => {
  return validateLength(value, MIN_LENGTH)
}

export const validateLengthName = (value: string): boolean => {
  return validateLength(value, MIN_LENGTH_NAME)
}
