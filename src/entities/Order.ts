import { BaseEntity } from './BaseEntity'
import { OrderItem } from './OrderItem'

export class Order extends BaseEntity {
	items: OrderItem[]
	discountCode: string
	discountAmount: number
	subTotal() {
		return this.items.reduce(
			(subtotal, item) => (subtotal += item.extendedPrice()),
			0
		)
	}
	total() {
		return this.subTotal() - this.discountAmount
	}
}
