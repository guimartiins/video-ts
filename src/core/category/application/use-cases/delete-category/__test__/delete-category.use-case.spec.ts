import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error'
import {
  InvalidUUIDError,
  UUID
} from '../../../../../shared/domain/value-objects/uuid.vo'
import { Category } from '../../../../domain/category.aggregate'
import { CategoryInMemoryRepository } from '../../../../infra/db/in-memory/category-in-memory.repository'
import { DeleteCategoryUseCase } from '../delete-category.use-case'

describe('DeleteCategoryUseCase Unit Tests', () => {
  let useCase: DeleteCategoryUseCase
  let repository: CategoryInMemoryRepository
  beforeEach(() => {
    repository = new CategoryInMemoryRepository()
    useCase = new DeleteCategoryUseCase(repository)
  })
  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new InvalidUUIDError()
    )
    const uuid = new UUID()
    await expect(() => useCase.execute({ id: uuid.id })).rejects.toThrow(
      new NotFoundError(uuid.id, Category)
    )
  })
  it('should delete a category', async () => {
    const items = [new Category({ name: 'test 1' })]
    repository.items = items
    await useCase.execute({
      id: items[0].category_id.id
    })
    expect(repository.items).toHaveLength(0)
  })
})
