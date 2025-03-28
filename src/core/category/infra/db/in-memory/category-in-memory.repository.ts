import { SortDirection } from '../../../../shared/domain/repository/search-params'
import { UUID } from '../../../../shared/domain/value-objects/uuid.vo'
import { InMemorySearchableRepository } from '../../../../shared/infra/db/in-memory/in-memory.repository'
import { Category } from '../../../domain/category.aggregate'
import { ICategoryRepository } from '../../../domain/category.repository'

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category, UUID>
  implements ICategoryRepository
{
  sortableFields = ['name', 'created_at']
  protected async applyFilter(
    items: Category[],
    filter: string
  ): Promise<Category[]> {
    if (!filter) {
      return items
    }

    return items.filter((i) => {
      return i.name.toLowerCase().includes(filter.toLowerCase())
    })
  }
  getEntity(): new (...args: any[]) => Category {
    return Category
  }

  protected applySort(
    items: Category[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Category[] {
    return sort
      ? super.applySort(items, sort, sort_dir)
      : super.applySort(items, 'created_at', 'desc')
  }
}
