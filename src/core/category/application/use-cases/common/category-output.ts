import { Category } from "../../../domain/category.entity";

export type CategoryOutput = {
    id: string;
    name: string;
    description: null | string;
    is_active: boolean;
    created_at: Date;
}

export class CategoryOutputMapper {
    static toOutput(entity: Category): CategoryOutput {
        const { category_id, ...rest } = entity.toJSON();
        return {
            id: entity.category_id.id,
            ...rest
        };
    }
}