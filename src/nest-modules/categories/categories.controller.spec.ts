import { Test, TestingModule } from '@nestjs/testing'
import { CategoriesController } from './categories.controller'
import { DatabaseModule } from 'src/nest-modules/database/database.module'
import { CategoriesModule } from './categories.module'
import { ConfigModule } from 'src/nest-modules/config/config.module'

describe('CategoriesController', () => {
  let controller: CategoriesController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule]
    }).compile()

    controller = module.get<CategoriesController>(CategoriesController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
