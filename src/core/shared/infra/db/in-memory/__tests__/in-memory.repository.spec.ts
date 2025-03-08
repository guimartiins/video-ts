import { Entity } from '../../../../domain/entity'
import { NotFoundError } from '../../../../domain/errors/not-found.error'
import { UUID } from '../../../../domain/value-objects/uuid.vo'
import { InMemoryRepository } from '../in-memory.repository'

type StubEntityConstructor = {
  entity_id?: UUID
  name: string
  price: number
}

class StubEntity extends Entity {
  entity_id: UUID
  name: string
  price: number

  constructor(props: StubEntityConstructor) {
    super()
    this.entity_id = props.entity_id || new UUID()
    this.name = props.name
    this.price = props.price
  }

  toJSON() {
    return {
      entity_id: this.entity_id.id,
      name: this.name,
      price: this.price
    }
  }
}

class StubInMemoryRepository extends InMemoryRepository<StubEntity, UUID> {
  getEntity(): new (...args: any[]) => StubEntity {
    return StubEntity
  }
}

describe('InMemoryRepository Unit Tests', () => {
  let repository: StubInMemoryRepository

  beforeEach(() => {
    repository = new StubInMemoryRepository()
  })

  test('should insert a new entity', async () => {
    const entity = new StubEntity({
      entity_id: new UUID(),
      name: 'test',
      price: 100
    })

    await repository.insert(entity)

    const foundEntity = repository.items[0]

    expect(foundEntity).toEqual(entity)
  })

  test('should bulk insert entities', async () => {
    const entity1 = new StubEntity({
      entity_id: new UUID(),
      name: 'test1',
      price: 100
    })
    const entity2 = new StubEntity({
      entity_id: new UUID(),
      name: 'test2',
      price: 200
    })

    await repository.bulkInsert([entity1, entity2])

    const foundEntity = repository.items

    expect(foundEntity[0]).toEqual(entity1)
    expect(foundEntity[1]).toEqual(entity2)
  })

  test('should return null when entity is not found', async () => {
    const entity = await repository.findById(new UUID())

    expect(entity).toBeNull()
  })

  test('should return an entity by id', async () => {
    const entity = new StubEntity({
      entity_id: new UUID(),
      name: 'test',
      price: 100
    })

    await repository.insert(entity)

    const foundEntity = await repository.findById(entity.entity_id)

    expect(foundEntity).toEqual(entity)
  })

  test('should return all entities', async () => {
    const entity1 = new StubEntity({
      entity_id: new UUID(),
      name: 'test1',
      price: 100
    })
    const entity2 = new StubEntity({
      entity_id: new UUID(),
      name: 'test2',
      price: 200
    })

    await repository.bulkInsert([entity1, entity2])

    const foundEntities = await repository.findAll()

    expect(foundEntities).toEqual([entity1, entity2])
  })

  test('should update an entity', async () => {
    const entity = new StubEntity({
      entity_id: new UUID(),
      name: 'test',
      price: 100
    })

    await repository.insert(entity)

    entity.name = 'updated test'

    await repository.update(entity)

    const foundEntity = await repository.findById(entity.entity_id)

    expect(foundEntity).toEqual(entity)
  })

  test('should throw an error when trying to update a non-existing entity', async () => {
    const entity = new StubEntity({
      entity_id: new UUID(),
      name: 'test',
      price: 100
    })

    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(entity.entity_id, StubEntity)
    )
  })

  test('should delete an entity', async () => {
    const entity = new StubEntity({
      entity_id: new UUID(),
      name: 'test',
      price: 100
    })

    await repository.insert(entity)

    await repository.delete(entity.entity_id)

    const foundEntity = await repository.findById(entity.entity_id)

    expect(foundEntity).toBeNull()
  })

  test('should throw an error when trying to delete a non-existing entity', async () => {
    const entity = new StubEntity({
      entity_id: new UUID(),
      name: 'test',
      price: 100
    })

    await expect(repository.delete(entity.entity_id)).rejects.toThrow(
      new NotFoundError(entity.entity_id, StubEntity)
    )
  })
})
