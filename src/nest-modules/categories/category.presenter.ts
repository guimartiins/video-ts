import { CategoryOutput } from '@core/category/application/use-cases/common/category-output'
import { ListCategoriesOutput } from '@core/category/application/use-cases/list-categories/list-categories.use-case'
import { Transform } from 'class-transformer'
import { CollectionPresenter } from '../shared/collection-presenter'

export class CategoryPresenter {
  id: string
  name: string
  description: string | null
  is_active: boolean

  @Transform(({ value }: { value: Date }) => value.toISOString())
  created_at: Date

  constructor(output: CategoryOutput) {
    this.id = output.id
    this.name = output.name
    this.description = output.description
    this.created_at = output.created_at
    this.is_active = output.is_active
  }
}

export class CategoryCollectionPresenter extends CollectionPresenter {
  data: CategoryPresenter[]

  constructor(outputs: ListCategoriesOutput) {
    const { items, ...paginationProps } = outputs
    super(paginationProps)
    this.data = items.map((i) => new CategoryPresenter(i))
  }
}
