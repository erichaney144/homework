import { BaseEntity } from './BaseEntity'
import { Product } from './Product'

export class OrderItem extends BaseEntity {
	product: Product
	quantity: number
	price: number
	extendedPrice() {
		return this.quantity * this.price
	}
}
