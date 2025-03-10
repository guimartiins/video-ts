import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject
} from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { CategorySequelizeRepository } from '@core/category/domain/infra/db/sequelize/category-sequelize.repository'
import { CreateCategoryUseCase } from '@core/category/application/use-cases/create-category/create-category.use-case'
import { UpdateCategoryUseCase } from '@core/category/application/use-cases/update-category/update-category.use-case'
import { DeleteCategoryUseCase } from '@core/category/application/use-cases/delete-category/delete-category.use-case'
import { GetCategoryUseCase } from '@core/category/application/use-cases/get-category/get-category.use-case'
import { ListCategoriesUseCase } from '@core/category/application/use-cases/list-categories/list-categories.use-case'

@Controller('categories')
export class CategoriesController {
  @Inject(CreateCategoryUseCase)
  private createUseCase: CreateCategoryUseCase

  @Inject(UpdateCategoryUseCase)
  private updateUseCase: UpdateCategoryUseCase

  @Inject(DeleteCategoryUseCase)
  private deleteUseCase: DeleteCategoryUseCase

  @Inject(GetCategoryUseCase)
  private getUseCase: GetCategoryUseCase

  @Inject(ListCategoriesUseCase)
  private listUseCase: ListCategoriesUseCase

  constructor(private categoryRepo: CategorySequelizeRepository) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createUseCase.execute(createCategoryDto)
  }

  @Get()
  findAll() {}

  @Get(':id')
  findOne(@Param('id') id: string) {}

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ) {}

  @Delete(':id')
  remove(@Param('id') id: string) {}
}
