import { Entity } from "../entity"
import { ValueObject } from "../value-objects/value-object"

export interface IRepository<E extends Entity, EntityId extends ValueObject> {
    insert(entity: E): Promise<void>
    bulkInsert(entities: E[]): Promise<void>
    update(entity: E): Promise<void>
    delete(entity: E): Promise<void>

    findById(id: EntityId): Promise<E>
    findAll(): Promise<E[]>

    getEntity(): new (...args: any[]) => E
}