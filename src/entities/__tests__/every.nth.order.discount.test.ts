import { EveryNthOrderDiscount } from 'entities/EveryNthOrderDiscount'
import { Order } from 'entities/Order'
import { EntityManager } from 'EntityManager'

describe('EveryNthOrderDiscount', () => {
	it('is eligible for nth order', () => {
		const discount = new EveryNthOrderDiscount({ n: 3, code: 'LUCKY_CUSTOMER' })
		for (var i = 0; i < 2; i++) {
			// orders 0-2 should not be eligible for EveryNthOrderDiscount
			expect(discount.isEligible()).toBe(false)
			EntityManager.save(new Order({ discountCode: 'FOO' }))
		}
		// EveryNthOrderDiscount.isEligible should be true for the 3rd order
		expect(EntityManager.all(Order).length).toBe(3)
		expect(discount.isEligible()).toBe(true)

		EntityManager.save(new Order({ discountCode: 'LUCKY_CUSTOMER' }))

		// This order and the next two should NOT be eligible
		for (var i = 0; i < 2; i++) {
			expect(discount.isEligible()).toBe(false)
			EntityManager.save(new Order({ discountCode: 'FOO' }))
		}

		// The 6th order should be eligible too
		expect(EntityManager.all(Order).length).toBe(6)
		expect(discount.isEligible()).toBe(true)

		// Make a new order with a different discount code
		EntityManager.save(new Order({ discountCode: 'FOO' }))

		// Should still be eligible, since the previous order didn't use LUCKY_CUSTOMER
		expect(discount.isEligible()).toBe(true)
	})
})
