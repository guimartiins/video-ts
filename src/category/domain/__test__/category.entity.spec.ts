import { UUID } from '../../../shared/value-objects/uuid.vo'
import { Category } from '../category.entity'

describe('Category Unit tests', () => {
	let validateSpy: jest.SpyInstance;
	beforeEach(() => {
		validateSpy = jest.spyOn(Category, 'validate')
	})

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

	describe(('create command'), () => {
		test('should create a category', () => {
			const category = Category.create({
				name: 'Movie',
			})

			expect(category.category_id).toBeInstanceOf(UUID)
			expect(category.name).toBe('Movie')
			expect(category.is_active).toBeTruthy()
			expect(category.description).toBeNull()
			expect(category.created_at).toBeInstanceOf(Date)
			expect(validateSpy).toHaveBeenCalledTimes(1)
		})

		test('should create a category with description', () => {
			const category = Category.create({
				name: 'Movie',
				description: 'Movies category',
			})

			expect(category.category_id).toBeInstanceOf(UUID)
			expect(category.name).toBe('Movie')
			expect(category.is_active).toBeTruthy()
			expect(category.description).toBe('Movies category')
			expect(category.created_at).toBeInstanceOf(Date)
			expect(validateSpy).toHaveBeenCalledTimes(1)
		})

		test('should create a category with is_active false', () => {
			const category = Category.create({
				name: 'Movie',
				is_active: false,
			})

			expect(category.category_id).toBeInstanceOf(UUID)
			expect(category.name).toBe('Movie')
			expect(category.is_active).toBeFalsy()
			expect(category.description).toBeNull()
			expect(category.created_at).toBeInstanceOf(Date)
			expect(validateSpy).toHaveBeenCalledTimes(1)
		})

		test('should change name', () => {
			const category = Category.create({
				name: 'Movie',
			})

			category.changeName('Music')

			expect(category.name).toBe('Music')
			expect(validateSpy).toHaveBeenCalledTimes(2)
		})

		test('should change description', () => {
			const category = Category.create({
				name: 'Movie',
			})

			category.changeDescription('Movies category')

			expect(category.description).toBe('Movies category')
			expect(validateSpy).toHaveBeenCalledTimes(2)
		})

		test('should activate category', () => {
			const category = Category.create({
				name: 'Movie',
				is_active: false,
			})

			category.activate()

			expect(category.is_active).toBeTruthy()
			expect(validateSpy).toHaveBeenCalledTimes(2)
		})

		test('should deactivate category', () => {
			const category = Category.create({
				name: 'Movie',
			})

			category.deactivate()

			expect(category.is_active).toBeFalsy()
			expect(validateSpy).toHaveBeenCalledTimes(2)
		})
	})
})

describe('Category Validator', () => {
	describe('create command', () => {
		test('should an invalid category with name property', () => {
			expect(() => Category.create({ name: null })).containsErrorMessages({
				name: [
					'name should not be empty',
					'name must be a string',
					'name must be shorter than or equal to 255 characters'
				],
			})


			expect(() => Category.create({ name: '' })).containsErrorMessages({
				name: ['name should not be empty'],
			})

			expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
				name: [
					'name must be a string',
					'name must be shorter than or equal to 255 characters'
				],
			})


			expect(() => Category.create({ name: 'a'.repeat(256) })).containsErrorMessages({
				name: ['name must be shorter than or equal to 255 characters'],
			})
		})

		test('should an invalid category with description property', () => {
			expect(() => Category.create({ name: 'Movie', description: 5 as any })).containsErrorMessages({
				description: ['description must be a string'],
			})

			expect(() => Category.create({ name: 'Movie', description: 'a'.repeat(256) })).containsErrorMessages({
				description: ['description must be shorter than or equal to 255 characters'],
			})
		})
	})

	describe('changeName method', () => {
		test('should an invalid category with name property', () => {
			const category = Category.create({ name: 'Movie' })

			expect(() => category.changeName(null)).containsErrorMessages({
				name: [
					'name should not be empty',
					'name must be a string',
					'name must be shorter than or equal to 255 characters'
				],
			})

			expect(() => category.changeName('')).containsErrorMessages({
				name: ['name should not be empty'],
			})

			expect(() => category.changeName(5 as any)).containsErrorMessages({
				name: [
					'name must be a string',
					'name must be shorter than or equal to 255 characters'
				],
			})

			expect(() => category.changeName('a'.repeat(256))).containsErrorMessages({
				name: ['name must be shorter than or equal to 255 characters'],
			})
		})

	})

	describe('changeDescription method', () => {
		test('should an invalid category with description property', () => {
			const category = Category.create({ name: 'Movie' })

			expect(() => category.changeDescription(5 as any)).containsErrorMessages({
				description: ['description must be a string'],
			})

			expect(() => category.changeDescription('a'.repeat(256))).containsErrorMessages({
				description: ['description must be shorter than or equal to 255 characters'],
			})
		})
	})
})
