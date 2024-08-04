import {
	IsBoolean,
	IsNotEmpty,
	IsOptional,
	IsString,
	MaxLength,
} from 'class-validator'
import { Category } from './category.entity'

export class CategoryRules {
	@MaxLength(255)
	@IsString()
	@IsNotEmpty()
	name: string

	@IsString()
	@IsOptional()
	description: string | null

	@IsBoolean()
	isActive: boolean

	constructor(name: string, description: string | null, isActive: boolean) {
		Object.assign(this, { name, description, isActive })
	}
}

class CategoryValidator {
    validate(entity: Category) {

    }
}
