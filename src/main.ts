import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common'
import { WrappedDataInterceptor } from './nest-modules/shared/interceptors/wrapped-data/wrapped-data.interceptor'
import { NotFoundErrorFilter } from './nest-modules/shared/filters/not-found/not-found-error.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422
    })
  )

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)))
  app.useGlobalInterceptors(new WrappedDataInterceptor())
  app.useGlobalFilters(new NotFoundErrorFilter())

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
