import { CastMemberId } from '@core/cast-member/domain/cast-member.aggregate'
import { CreateCastMemberUseCase } from '../create-cast-member.use-case'
import { CastMemberTypes } from '@core/cast-member/domain/cast-member-type.vo'
import { setupSequelize } from '@core/shared/infra/testing/helpers'
import {
  CastMemberModel,
  CastMemberSequelizeRepository
} from '../../../../infra/db/sequelize/cast-member-sequelize.repository'

describe('CreateCastMemberUseCase Integration Tests', () => {
  let useCase: CreateCastMemberUseCase
  let repository: CastMemberSequelizeRepository

  setupSequelize({ models: [CastMemberModel] })

  beforeEach(() => {
    repository = new CastMemberSequelizeRepository(CastMemberModel)
    useCase = new CreateCastMemberUseCase(repository)
  })

  it('should create a cast member', async () => {
    let output = await useCase.execute({
      name: 'test',
      type: CastMemberTypes.ACTOR
    })
    let entity = await repository.findById(new CastMemberId(output.id))
    expect(output).toStrictEqual({
      id: entity.cast_member_id.id,
      name: 'test',
      type: CastMemberTypes.ACTOR,
      created_at: entity.created_at
    })

    output = await useCase.execute({
      name: 'test',
      type: CastMemberTypes.DIRECTOR
    })
    entity = await repository.findById(new CastMemberId(output.id))
    expect(output).toStrictEqual({
      id: entity.cast_member_id.id,
      name: 'test',
      type: CastMemberTypes.DIRECTOR,
      created_at: entity.created_at
    })
  })
})
