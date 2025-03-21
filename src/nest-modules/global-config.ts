import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationPipe
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { EntityValidationErrorFilter } from './shared/filters/entity-validation/entity-validation-error.filter'
import { NotFoundErrorFilter } from './shared/filters/not-found/not-found-error.filter'
import { WrappedDataInterceptor } from './shared/interceptors/wrapped-data/wrapped-data.interceptor'

export function applyGlobalConfig(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true
    })
  )
  app.useGlobalInterceptors(
    new WrappedDataInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector))
  )
  app.useGlobalFilters(
    new EntityValidationErrorFilter(),
    new NotFoundErrorFilter()
  )
}
