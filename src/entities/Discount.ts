import { EntityManager } from 'EntityManager'
import { BaseEntity } from './BaseEntity'
import { Order } from './Order'

export enum DiscountType {
	percent = 'PERCENT',
	fixed = 'FIXED',
}

export class Discount<T> extends BaseEntity<T | Discount<T>> {
	code: string
	amount: number
	type: DiscountType

	calculate(order: Order) {
		const subtotal = order.subTotal()
		let discountAmount = this.amount
		if (DiscountType.percent == this.type) {
			discountAmount = (this.amount * subtotal) / 100
		} else {
			// Fixed discount amounts cannot be more than the order subtotal
			if (discountAmount > subtotal) {
				discountAmount = subtotal
			}
		}
		if (discountAmount < 0 || discountAmount > subtotal) {
			throw new Error(
				`discount amount out of range.
        code: '${this.code}'
        type: '${this.type}'
        amount: ${this.amount}
        order subtotal: ${subtotal}
        calculated amount: ${discountAmount}`
			)
		}
		return discountAmount
	}

	static findByCode(code: string) {
		return EntityManager.find(Discount, { code })
	}
}
