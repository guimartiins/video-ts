import { ICastMemberRepository } from '@core/cast-member/domain/cast-member.repository'
import { UpdateCastMemberInput } from './update-cast-member.input'
import {
  CastMember,
  CastMemberId
} from '@core/cast-member/domain/cast-member.aggregate'
import { NotFoundError } from '@core/shared/domain/errors/not-found.error'
import { CastMemberType } from '@core/cast-member/domain/cast-member-type.vo'
import { EntityValidationError } from '@core/category/domain/validators/validation.error'
import {
  CastMemberOutput,
  CastMemberOutputMapper
} from '../common/cast-member-output'
import { IUseCase } from '@core/shared/application/use-case.interface'

export class UpdateCastMemberUseCase
  implements IUseCase<UpdateCastMemberInput, UpdateCastMemberOutput>
{
  constructor(private castMemberRepo: ICastMemberRepository) {}

  async execute(input: UpdateCastMemberInput): Promise<UpdateCastMemberOutput> {
    const castMemberId = new CastMemberId(input.id)
    const castMember = await this.castMemberRepo.findById(castMemberId)

    if (!castMember) {
      throw new NotFoundError(input.id, CastMember)
    }

    if (input.name) {
      castMember.changeName(input.name)
    }

    if (input.type) {
      const [type, errorCastMemberType] = CastMemberType.create(
        input.type
      ).asArray()

      castMember.changeType(type)

      if (errorCastMemberType) {
        castMember.notification.setError(errorCastMemberType.message, 'type')
      }
    }

    if (castMember.notification.hasErrors()) {
      throw new EntityValidationError(castMember.notification.toJSON())
    }

    await this.castMemberRepo.update(castMember)

    return CastMemberOutputMapper.toOutput(castMember)
  }
}

export type UpdateCastMemberOutput = CastMemberOutput
