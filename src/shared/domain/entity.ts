import { Notification } from "../../category/domain/validators/notification";
import { ValueObject } from "./value-objects/value-object";

export abstract class Entity {
    notification: Notification = new Notification()
    abstract get entity_id(): ValueObject
    abstract toJSON(): any
}