import { lastValueFrom, of } from 'rxjs'
import { WrappedDataInterceptor } from './wrapped-data.interceptor'

describe('WrappedDataInterceptor', () => {
  let interceptor: WrappedDataInterceptor

  beforeEach(() => {
    interceptor = new WrappedDataInterceptor()
  })

  it('should wrapper with data key', async () => {
    expect(interceptor).toBeDefined()

    const obs$ = interceptor.intercept({} as any, {
      handle: () => of({ name: 'test' })
    })

    // precisa utilizar o lastValueFrom pois o Observable é uma instância criada na memória que fica capturando valores.
    const result = await lastValueFrom(obs$)

    expect(result).toEqual({ data: { name: 'test' } })
  })

  it('should not wrapper meta key is present', async () => {
    expect(interceptor).toBeDefined()

    const data = { data: { name: 'test' }, meta: { total: 1 } }

    const obs$ = interceptor.intercept({} as any, {
      handle: () => of(data)
    })

    const result = await lastValueFrom(obs$)

    expect(result).toEqual(data)
  })
})
