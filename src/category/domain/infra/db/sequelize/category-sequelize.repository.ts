import { Op } from "sequelize";
import { Entity } from "../../../../../shared/domain/entity";
import { NotFoundError } from "../../../../../shared/domain/errors/not-found.error";
import { SearchParams } from "../../../../../shared/domain/repository/search-params";
import { SearchResult } from "../../../../../shared/domain/repository/search-result";
import { UUID } from "../../../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../../../category.entity";
import { CategorySearchParams, CategorySearchResult, ICategoryRepository } from "../../../category.repository";
import { CategoryModel } from "./category.model";

export class CategorySequelizeRepository implements ICategoryRepository {
    sortableFields: string[] = ['name', 'created_at'];

    constructor(private categoryModel: typeof CategoryModel) {

    }

    async insert(entity: Category): Promise<void> {
        await this.categoryModel.create({
            category_id: entity.category_id.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at,
        });
    }
    async bulkInsert(entities: Category[]): Promise<void> {
        await this.categoryModel.bulkCreate(entities.map(entity => ({
            category_id: entity.category_id.id,
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at,
        })))
    }
    async update(entity: Category): Promise<void> {
        const id = entity.category_id.id
        const model = await this._get(id)

        if (!model) {
            throw new NotFoundError(id, this.getEntity())
        }

        await this.categoryModel.update({
            name: entity.name,
            description: entity.description,
            is_active: entity.is_active,
            created_at: entity.created_at
        }, {
            where: {
                category_id: id
            }

        })
    }
    async delete(category_id: UUID): Promise<void> {
        const id = category_id.id
        const model = await this._get(id)

        if (!model) {
            throw new NotFoundError(id, this.getEntity())
        }

        await this.categoryModel.destroy({
            where: {
                category_id: id
            }
        })
    }

    async findById(id: UUID): Promise<Category | null> {
        const model = await this._get(id.id)
        return new Category(
            {
                category_id: new UUID(model.category_id),
                name: model.name,
                description: model.description,
                is_active: model.is_active,
                created_at: model.created_at
            }
        )
    }
    async findAll(): Promise<Category[]> {
        const models = await this.categoryModel.findAll();
        return models.map(model => new Category(
            {
                category_id: new UUID(model.category_id),
                name: model.name,
                description: model.description,
                is_active: model.is_active,
                created_at: model.created_at
            }
        ));
    }

    private async _get(id: string) {
        const model = await this.categoryModel.findByPk(id)

        return model
    }

    getEntity(): new (...args: any[]) => Category {
        throw new Error("Method not implemented.");
    }

    async search(props: CategorySearchParams): Promise<CategorySearchResult> {
        const offset = (props.page - 1) * props.per_page
        const limit = props.per_page

        const { rows: models, count } = await this.categoryModel.findAndCountAll({
            ...(props.filter && {
                where: {
                    name: { [Op.like]: `%${props.filter}%` }
                }
            }),
            ...(props.sort && this.sortableFields.includes(props.sort)) ? { order: [[props.sort, props.sort_dir]] } : { order: [['created_at', 'desc']] },
            offset,
            limit
        })

        return new CategorySearchResult({
            items: models.map(model => new Category(
                {
                    category_id: new UUID(model.category_id),
                    name: model.name,
                    description: model.description,
                    is_active: model.is_active,
                    created_at: model.created_at
                }
            )),
            current_page: props.page,
            per_page: props.per_page,
            total: count
        })
    }
}