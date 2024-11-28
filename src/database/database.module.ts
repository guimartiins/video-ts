import { CategoryModel } from '@core/category/domain/infra/db/sequelize/category.model';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CONFIG_SCHEMA_TYPE } from 'src/config/config.module';

const models = [
    CategoryModel
]

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            useFactory: (configService: ConfigService<CONFIG_SCHEMA_TYPE>) => {
                const vendor = configService.get('DB_VENDOR')
                if (vendor === 'mysql') {
                    return {
                        dialect: 'mysql',
                        host: configService.get('DB_HOST'),
                        port: configService.get('DB_PORT'),
                        username: configService.get('DB_USERNAME'),
                        password: configService.get('DB_PASSWORD'),
                        database: configService.get('DB_DATABASE'),
                        autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'),
                        logging: configService.get('DB_LOGGING'),
                        models
                    }
                }

                if (vendor === 'sqlite') {
                    return {
                        dialect: 'sqlite',
                        storage: ':memory:',
                        autoLoadModels: configService.get('DB_AUTO_LOAD_MODELS'),
                        logging: configService.get('DB_LOGGING'),
                        models
                    }
                }

                throw new Error('Unsupported DB vendor')
            },
            inject: [ConfigService]
        }),
    ]
})
export class DatabaseModule { }
