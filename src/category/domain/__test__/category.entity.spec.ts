import { UUID } from '../../../shared/value-objects/uuid.vo'
import { Category } from '../category.entity'

describe('Category Unit tests', () => {
	test('constructor should create correctly', () => {
		let category = new Category({
			name: 'movie',
		})
		expect(category.category_id).toBeInstanceOf(UUID)
		expect(category.name).toBe('movie')
		expect(category.is_active).toBeTruthy()
		expect(category.description).toBeNull()
		expect(category.created_at).toBeInstanceOf(Date)
	})

	describe('category_id field', () => {
		const arrange = [
			{ category_id: null },
			{
				category_id: undefined,
			},
			{ category_id: new UUID() },
		]

		test.each(arrange)('id = %j', ({ category_id }) => {
			const category = new Category({
				name: 'Movie',
				category_id: category_id as any,
			})

			expect(category.category_id).toBeInstanceOf(UUID)

			if (category_id) {
				expect(category.category_id.id).toBe(category_id.id)
			}
		})
	})
})
