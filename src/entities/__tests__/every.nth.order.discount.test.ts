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

		for (var i = 0; i < 3; i++) {
			// orders 0-2 should not be eligible for EveryNthOrderDiscount
			expect(discount.isEligible()).toBe(false)
			saveOrder('OTHER_DISCOUNT')
		}

		// isEligible should be true for the 3rd order
		expect(countOrders()).toBe(3)
		expect(discount.isEligible()).toBe(true)

		saveOrder(discount.code)

		// No longer eligible since we just created an order that used the code
		expect(discount.isEligible()).toBe(false)

		// The next two should NOT be eligible
		for (var i = 0; i < 2; i++) {
			expect(discount.isEligible()).toBe(false)
			saveOrder()
		}

		// The 6th order should be eligible
		expect(countOrders()).toBe(6)
		expect(discount.isEligible()).toBe(true)

		// Make a new order with a different discount code
		saveOrder('OTHER_CODE')

		// The 7th order should still be eligible, since the previous order didn't use LUCKY_CUSTOMER
		expect(countOrders()).toBe(7)
		expect(discount.isEligible()).toBe(true)
	})
})
