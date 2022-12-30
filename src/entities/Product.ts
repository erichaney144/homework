import { BaseEntity } from './BaseEntity'

export class Product extends BaseEntity {
	id: number
	name: string
	price: number
}
