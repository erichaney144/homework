import { BaseEntity } from './BaseEntity'

export class Product extends BaseEntity<Product> {
	name: string
	price: number
}
