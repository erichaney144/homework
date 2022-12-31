import { Discount, DiscountType } from 'entities/Discount'
import { Order } from 'entities/Order'
import { EntityManager } from 'EntityManager'

describe('Discount', () => {
	it('calculates discount amount for fixed discounts', () => {
		const d = new Discount({ type: DiscountType.fixed, amount: 10 })
		const calculatedAmount = d.calculate({
			subTotal: () => 100,
		} as Order)
		expect(calculatedAmount).toBe(10)
	})

	it('caps discount amount at order subtotal', () => {
		const d = new Discount({ type: DiscountType.fixed, amount: 10 })
		const calculatedAmount = d.calculate({
			subTotal: () => 8,
		} as Order)
		expect(calculatedAmount).toBe(8)
	})

	it('calculates discount amount for percentages', () => {
		const d = new Discount({ type: DiscountType.percent, amount: 25 })
		const calculatedAmount = d.calculate({
			subTotal: () => 8,
		} as Order)
		expect(calculatedAmount).toBe(2) // 25% of 8 is 2
	})

	it('throws error if calculated amount is negative', () => {
		const d = new Discount({ type: DiscountType.percent, amount: -25 })
		expect(() => {
			d.calculate({
				subTotal: () => 8,
			} as Order)
		}).toThrow()
	})

	it('throws error if calculated amount is greater than subtotal', () => {
		const d = new Discount({ type: DiscountType.percent, amount: 125 })
		expect(() => {
			d.calculate({
				subTotal: () => 8,
			} as Order)
		}).toThrow()
	})

	it('finds a discount by code', () => {
		const d = new Discount({
			code: 'NEW_DISCOUNT_85',
			type: DiscountType.percent,
			amount: 111.45,
		})
		EntityManager.save(d)
		const d2 = Discount.findByCode(d.code)
		expect(d2?.amount).toBe(d.amount)
	})
})
