import { EveryNthOrderDiscount } from 'entities/EveryNthOrderDiscount'
import { Order } from 'entities/Order'
import { EntityManager } from 'EntityManager'

beforeEach(() => {
	EntityManager.instances = {}
})

describe('EveryNthOrderDiscount', () => {
	// Every 3rd order is eligible, so 3, 6, etc
	it('is eligible for nth order', () => {
		const discount = new EveryNthOrderDiscount({ n: 3, code: 'LUCKY_CUSTOMER' })
		const saveOrder = (discountCode?: typeof discount.code | undefined) => {
			EntityManager.save(new Order({ discountCode }))
		}
		const countOrders = () => {
			return EntityManager.all(Order).length
		}

		// discount is not eligibile if there are no orders in the DB
		expect(countOrders()).toBe(0)
		expect(discount.isEligible()).toBe(false)

		for (var i = 0; i < 2; i++) {
			// orders 1 and 2 should not be eligible for EveryNthOrderDiscount
			expect(discount.isEligible()).toBe(false)
			saveOrder('OTHER_DISCOUNT')
		}

		// isEligible should be true once 2 orders are created (3rd order gets the discount)
		expect(countOrders()).toBe(2)
		expect(discount.isEligible()).toBe(true)

		saveOrder(discount.code)

		// No longer eligible since we just created an order that used the code
		expect(discount.isEligible()).toBe(false)

		// The next two should NOT be eligible
		for (var i = 0; i < 2; i++) {
			expect(discount.isEligible()).toBe(false)
			saveOrder()
		}

		// Once 5 orders are created, the discount should be eligible (6th order gets the discount)
		expect(countOrders()).toBe(5)
		expect(discount.isEligible()).toBe(true)

		// Make a new order (id:6) with a different discount code
		saveOrder('OTHER_CODE')

		// The 7th order should still be eligible, since the 6th order didn't use LUCKY_CUSTOMER
		expect(countOrders()).toBe(6)
		expect(discount.isEligible()).toBe(true)
	})
})
