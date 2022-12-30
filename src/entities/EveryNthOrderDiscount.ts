import { EntityManager } from 'EntityManager'
import { Discount } from './Discount'
import { Order } from './Order'

export class EveryNthOrderDiscount extends Discount<EveryNthOrderDiscount> {
	n: number

	isEligible() {
		const orders = EntityManager.all(Order) as Order[]
		let numberOfOrdersSinceLastUsed = 0
		orders.forEach(o => {
			console.log('Discount code for order: ', o.discountCode)
			if (o.discountCode == this.code) {
				numberOfOrdersSinceLastUsed = 0
			} else {
				++numberOfOrdersSinceLastUsed
			}
		})
		return this.n <= numberOfOrdersSinceLastUsed + 1
	}
}
