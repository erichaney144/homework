import { EntityManager } from 'EntityManager'
import { Discount } from './Discount'
import { Order } from './Order'

export class EveryNthOrderDiscount extends Discount<EveryNthOrderDiscount> {
	n: number

	isEligible() {
		const orders = EntityManager.all(Order) as Order[]
		let numberOfOrdersSinceLastUsed = 0
		orders.forEach(o => {
			if (o.discountCode == this.code) {
				numberOfOrdersSinceLastUsed = 0
			}
			++numberOfOrdersSinceLastUsed
		})
		return numberOfOrdersSinceLastUsed >= this.n
	}
}
