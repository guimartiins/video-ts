import { DataType } from "sequelize-typescript"
import { CategoryModel } from "../category.model"
import { Category } from "../../../../category.entity"
import { setupSequelize } from "../../../../../../shared/infra/testing/helpers";

describe('CategoryModel Integration Tests', () => {
    setupSequelize({ models: [CategoryModel] });

    test('should create a category', async () => {
        const fakeCategory = Category.fake().aCategory().build()

        const arrange = {
            category_id: fakeCategory.category_id.id,
            name: fakeCategory.name,
            description: fakeCategory.description,
            is_active: fakeCategory.is_active,
            created_at: fakeCategory.created_at
        }
        const category = await CategoryModel.create(arrange)

        expect(category.toJSON()).toStrictEqual(arrange)
    })

    test('mapping props', () => {
        const attributesMap = CategoryModel.getAttributes()
        const attributes = Object.keys(CategoryModel.getAttributes())
        expect(attributes).toStrictEqual(['category_id', 'name', 'description', 'is_active', 'created_at'])

        const categoryIdAttr = attributesMap.category_id
        expect(categoryIdAttr).toMatchObject({
            field: 'category_id',
            fieldName: 'category_id',
            primaryKey: true,
            type: DataType.UUID()
        })

        const nameAttr = attributesMap.name
        expect(nameAttr).toMatchObject({
            field: 'name',
            fieldName: 'name',
            allowNull: false,
            type: DataType.STRING(255)
        })

        const descriptionAttr = attributesMap.description
        expect(descriptionAttr).toMatchObject({
            field: 'description',
            fieldName: 'description',
            allowNull: true,
            type: DataType.TEXT()
        })

        const isActiveAttr = attributesMap.is_active
        expect(isActiveAttr).toMatchObject({
            field: 'is_active',
            fieldName: 'is_active',
            allowNull: false,
            type: DataType.BOOLEAN()
        })

        const createdAtAttr = attributesMap.created_at
        expect(createdAtAttr).toMatchObject({
            field: 'created_at',
            fieldName: 'created_at',
            allowNull: false,
            type: DataType.DATE(3)
        })
    })
})