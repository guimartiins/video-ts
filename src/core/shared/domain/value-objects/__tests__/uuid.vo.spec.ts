import { InvalidUUIDError, UUID } from '../uuid.vo'

describe('UUID Value Object tests', () => {
  const validateSpy = jest.spyOn(UUID.prototype as any, 'validate')

  afterAll(() => {
    jest.restoreAllMocks()
  })

  test('should throw error when uuid is invalid', () => {
    expect(() => {
      new UUID('invalid-uuid')
    }).toThrow(new InvalidUUIDError())

    expect(validateSpy).toHaveBeenCalledTimes(1)
  })

  test('should create a valid  uuid', () => {
    const uuid = new UUID('6f3a2c5a-2b4e-4b7d-8e1f-1f4f1c3b0b4b')
    expect(uuid.id).toBe('6f3a2c5a-2b4e-4b7d-8e1f-1f4f1c3b0b4b')

    expect(validateSpy).toHaveBeenCalledTimes(1)
  })
})
