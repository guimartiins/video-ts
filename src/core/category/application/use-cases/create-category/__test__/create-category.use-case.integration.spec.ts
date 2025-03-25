import { UUID } from '../../../../../shared/domain/value-objects/uuid.vo'
import { setupSequelize } from '../../../../../shared/infra/testing/helpers'
import { CategorySequelizeRepository } from '../../../../infra/db/sequelize/category-sequelize.repository'
import { CategoryModel } from '../../../../infra/db/sequelize/category.model'
import { CreateCategoryUseCase } from '../create-category.use-case'

describe('CreateCategoryUseCase Integration Tests', () => {
  let useCase: CreateCategoryUseCase
  let repository: CategorySequelizeRepository
  setupSequelize({ models: [CategoryModel] })
  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel)
    useCase = new CreateCategoryUseCase(repository)
  })

  it('should throw an error when aggregate is not valid', async () => {
    const input = { name: 't'.repeat(256) }
    await expect(() => useCase.execute(input)).rejects.toThrow(
      'Entity Validation Error'
    )
  })

  it('should create a category', async () => {
    let output = await useCase.execute({ name: 'test' })
    let entity = await repository.findById(new UUID(output.id))
    expect(output).toStrictEqual({
      id: entity.category_id.id,
      name: 'test',
      description: null,
      is_active: true,
      created_at: entity.created_at
    })
    output = await useCase.execute({
      name: 'test',
      description: 'some description'
    })
    entity = await repository.findById(new UUID(output.id))
    expect(output).toStrictEqual({
      id: entity.category_id.id,
      name: 'test',
      description: 'some description',
      is_active: true,
      created_at: entity.created_at
    })
    output = await useCase.execute({
      name: 'test',
      description: 'some description',
      is_active: true
    })
    entity = await repository.findById(new UUID(output.id))
    expect(output).toStrictEqual({
      id: entity.category_id.id,
      name: 'test',
      description: 'some description',
      is_active: true,
      created_at: entity.created_at
    })
    output = await useCase.execute({
      name: 'test',
      description: 'some description',
      is_active: false
    })
    entity = await repository.findById(new UUID(output.id))
    expect(output).toStrictEqual({
      id: entity.category_id.id,
      name: 'test',
      description: 'some description',
      is_active: false,
      created_at: entity.created_at
    })
  })
})
