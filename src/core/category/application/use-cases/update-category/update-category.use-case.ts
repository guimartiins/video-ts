import { IUseCase } from '../../../../shared/application/use-case.interface'
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error'
import { UUID } from '../../../../shared/domain/value-objects/uuid.vo'
import { Category } from '../../../domain/category.aggregate'
import { ICategoryRepository } from '../../../domain/category.repository'
import { EntityValidationError } from '../../../domain/validators/validation.error'
import { CategoryOutput, CategoryOutputMapper } from '../common/category-output'
import { UpdateCategoryInput } from './update-category.input'
export class UpdateCategoryUseCase
  implements IUseCase<UpdateCategoryInput, UpdateCategoryOutput>
{
  constructor(private categoryRepo: ICategoryRepository) {}
  async execute(input: UpdateCategoryInput): Promise<UpdateCategoryOutput> {
    const uuid = new UUID(input.id)
    const category = await this.categoryRepo.findById(uuid)
    if (!category) {
      throw new NotFoundError(input.id, Category)
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    input.name && category.changeName(input.name)
    if (input.description !== undefined) {
      category.changeDescription(input.description)
    }
    if (input.is_active === true) {
      category.activate()
    }
    if (input.is_active === false) {
      category.deactivate()
    }

    if (category.notification.hasErrors()) {
      throw new EntityValidationError(category.notification.toJSON())
    }

    await this.categoryRepo.update(category)
    return CategoryOutputMapper.toOutput(category)
  }
}
export type UpdateCategoryOutput = CategoryOutput
