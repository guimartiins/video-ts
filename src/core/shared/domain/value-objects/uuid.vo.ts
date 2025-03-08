import { ValueObject } from './value-object'
import { v4 as uuidv4, validate as validateUUID } from 'uuid'

export class UUID extends ValueObject {
  readonly id: string

  constructor(id?: string) {
    super()
    this.id = id || uuidv4()
    this.validate()
  }

  private validate() {
    const isValid = validateUUID(this.id)
    if (!isValid) {
      throw new Error('Invalid UUID')
    }
  }

  toString() {
    return this.id
  }
}

export class InvalidUUIDError extends Error {
  constructor(message?: string) {
    super(message || 'Invalid UUID')
    this.name = 'InvalidUUIDError'
  }
}
