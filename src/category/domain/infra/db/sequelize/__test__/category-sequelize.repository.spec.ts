import { Sequelize } from "sequelize-typescript";
import { CategorySequelizeRepository } from "../category-sequelize.repository";
import { CategoryModel } from "../category.model";
import { Category } from "../../../../category.entity";
import { UUID } from "../../../../../../shared/domain/value-objects/uuid.vo";

describe('CategorySequelizeRepository integration test', () => {
    let sequelize: Sequelize;
    let repository: CategorySequelizeRepository

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            models: [CategoryModel],
            logging: false
        })

        await sequelize.sync({ force: true })
        repository = new CategorySequelizeRepository(CategoryModel)
    })

    test('should insert a new category', async () => {
        const category = Category.fake().aCategory().build()
        repository.insert(category)

        const model = await CategoryModel.findByPk(category.category_id.id)

        expect(model.toJSON()).toMatchObject({
            category_id: category.category_id.id,
            name: category.name,
            description: category.description,
            is_active: category.is_active,
            created_at: category.created_at
        })
    })

    test('should update a category', async () => {
        const category = Category.fake().aCategory().build()
        repository.insert(category)

        const updatedCategory = Category.fake().aCategory().build()

        category.description = updatedCategory.description
        category.is_active = updatedCategory.is_active
        category.name = updatedCategory.name

        await repository.update(category)

        const model = await CategoryModel.findByPk(category.category_id.id)

        expect(model.toJSON()).toMatchObject({
            category_id: category.category_id.id,
            name: updatedCategory.name,
            description: updatedCategory.description,
            is_active: updatedCategory.is_active,
            created_at: category.created_at
        })
    })

    test('should delete a category', async () => {
        const category = Category.fake().aCategory().build()
        repository.insert(category)

        await repository.delete(category.category_id)

        const model = await CategoryModel.findByPk(category.category_id.id)

        expect(model).toBeNull()
    })

    test('should find a category by id', async () => {
        const category = Category.fake().aCategory().build()
        repository.insert(category)

        const model = await repository.findById(category.category_id)

        expect(model).toMatchObject(category)
    })

    test('should return all categories', async () => {
        const categories = Category.fake().theCategories(3).build()
        categories.forEach(async (c) => await repository.insert(c))

        const models = await repository.findAll()

        expect(models).toMatchObject(categories)
    })

    test('should bulk insert categories', async () => {
        const categories = Category.fake().theCategories(3).build()

        await repository.bulkInsert(categories)

        const models = await CategoryModel.findAll()

        expect(models).toHaveLength(3)
    })

    test('should throw an error on delete when a entity not found', async () => {
        const category = Category.fake().aCategory().build()

        await expect(repository.delete(category.category_id)).rejects.toThrow()
    })

    test('should throw an error on update when a entity not found', async () => {
        const category = Category.fake().aCategory().build()

        await expect(repository.update(category)).rejects.toThrow()
    })

    test('should return null when a entity not found', async () => {
        const category = Category.fake().aCategory().build()

        const model = await repository.findById(category.category_id)

        expect(model).toBeNull()
    })

})