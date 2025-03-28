import { IUseCase } from '../../../../shared/application/use-case.interface'
import { NotFoundError } from '../../../../shared/domain/errors/not-found.error'
import { UUID } from '../../../../shared/domain/value-objects/uuid.vo'
import { Category } from '../../../domain/category.aggregate'
import { ICategoryRepository } from '../../../domain/category.repository'
import { CategoryOutput, CategoryOutputMapper } from '../common/category-output'
export class GetCategoryUseCase
  implements IUseCase<GetCategoryInput, GetCategoryOutput>
{
  constructor(private categoryRepo: ICategoryRepository) {}
  async execute(input: GetCategoryInput): Promise<GetCategoryOutput> {
    const uuid = new UUID(input.id)
    const category = await this.categoryRepo.findById(uuid)
    if (!category) {
      throw new NotFoundError(input.id, Category)
    }
    return CategoryOutputMapper.toOutput(category)
  }
}
export type GetCategoryInput = {
  id: string
}
export type GetCategoryOutput = CategoryOutput
