import { Discount, DiscountType } from 'entities/Discount'
import { EveryNthOrderDiscount } from 'entities/EveryNthOrderDiscount'
import { EntityManager } from 'EntityManager'

export const seedDiscounts = () => {
	EntityManager.save(
		new Discount({
			code: 'STUDENT_DISCOUNT',
			amount: 10,
			type: DiscountType.fixed,
		})
	)
	EntityManager.save(
		new EveryNthOrderDiscount({
			code: 'LUCKY_CUSTOMER',
			amount: 10,
			type: DiscountType.percent,
			n: 3,
		})
	)
}
