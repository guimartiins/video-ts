import { Module } from '@nestjs/common'
import { CategoriesModule } from './nest-modules/categories/categories.module'
import { DatabaseModule } from './nest-modules/database/database.module'
import { ConfigModule } from './nest-modules/config/config.module'
import { SharedModule } from './nest-modules/shared/shared.module'
import { CastMembersModule } from './nest-modules/cast-members/cast-members.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    CategoriesModule,
    SharedModule,
    CastMembersModule
  ]
})
export class AppModule {}
