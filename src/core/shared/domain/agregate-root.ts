import { Entity } from './entity'

// trabalha com eventos de domínio, coisa que a entidade não faz
export abstract class AggregateRoot extends Entity {}
