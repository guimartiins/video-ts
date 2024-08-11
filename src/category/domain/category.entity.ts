import { UUID } from '../../shared/domain/value-objects/uuid.vo'
import { CategoryValidatorFactory } from './category.validator'
import { EntityValidationError } from './validators/validation.error'

export type CategoryConstructorProps = {
	category_id?: UUID
	name: string
	description?: string | null
	is_active?: boolean
	created_at?: Date
}

export type CategoryCommander = {
	name: string
	description?: string | null
	is_active?: boolean
}

export class Category {
	category_id: UUID
	name: string
	description: string | null
	is_active: boolean
	created_at: Date

	constructor(props: CategoryConstructorProps) {
		this.category_id = props.category_id ?? new UUID()
		this.name = props.name
		this.description = props.description ?? null
		this.is_active = props.is_active ?? true
		this.created_at = props.created_at ?? new Date()
	}

	// Factory method
	static create(props: CategoryCommander): Category {
		const category = new Category(props)
		Category.validate(category)
		return category
	}

	changeName(name: string): void {
		this.name = name
		Category.validate(this)
	}

	changeDescription(description: string): void {
		this.description = description
		Category.validate(this)
	}

	activate(): void {
		this.is_active = true
		Category.validate(this)
	}

	deactivate(): void {
		this.is_active = false
		Category.validate(this)
	}

	static validate(entity: Category) {
		const validator = CategoryValidatorFactory.create()
		const isValid = validator.validate(entity)

		if (!isValid) {
			throw new EntityValidationError(validator.errors)
		}
	}

	toJSON() {
		return {
			category_id: this.category_id.id,
			name: this.name,
			description: this.description,
			is_active: this.is_active,
			created_at: this.created_at,
		}
	}
}
