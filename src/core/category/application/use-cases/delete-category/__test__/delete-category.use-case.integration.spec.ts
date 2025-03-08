import { setupSequelize } from '../../../../../shared/infra/testing/helpers'
import { CategorySequelizeRepository } from '../../../../domain/infra/db/sequelize/category-sequelize.repository'
import { CategoryModel } from '../../../../domain/infra/db/sequelize/category.model'
import { NotFoundError } from '../../../../../shared/domain/errors/not-found.error'
import { Category } from '../../../../domain/category.entity'
import { UUID } from '../../../../../shared/domain/value-objects/uuid.vo'
import { DeleteCategoryUseCase } from '../delete-category.use-case'

describe('DeleteCategoryUseCase Integration Tests', () => {
  let useCase: DeleteCategoryUseCase
  let repository: CategorySequelizeRepository
  setupSequelize({ models: [CategoryModel] })
  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel)
    useCase = new DeleteCategoryUseCase(repository)
  })
  it('should throws error when entity not found', async () => {
    const uuid = new UUID()
    await expect(() => useCase.execute({ id: uuid.id })).rejects.toThrow(
      new NotFoundError(uuid.id, Category)
    )
  })
  it('should delete a category', async () => {
    const category = Category.fake().aCategory().build()
    await repository.insert(category)
    await useCase.execute({
      id: category.category_id.id
    })
    await expect(repository.findById(category.category_id)).resolves.toBeNull()
  })
})
