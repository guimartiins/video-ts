import { UUID } from '../../../../../shared/domain/value-objects/uuid.vo'
import { Category } from '../../../category.entity'
import { EntityValidationError } from '../../../validators/validation.error'
import { CategoryModel } from './category.model'

export class CategoryModelMapper {
  static toModel(entity: Category): CategoryModel {
    const model = CategoryModel.build({
      category_id: entity.category_id.id,
      name: entity.name,
      description: entity.description,
      is_active: entity.is_active,
      created_at: entity.created_at
    })

    return model
  }

  static toEntity(model: CategoryModel): Category {
    const category = new Category({
      category_id: new UUID(model.category_id),
      name: model.name,
      description: model.description,
      is_active: model.is_active,
      created_at: model.created_at
    })
    category.validate()

    if (category.notification.hasErrors()) {
      throw new EntityValidationError(category.notification.toJSON())
    }
    return category
  }
}
