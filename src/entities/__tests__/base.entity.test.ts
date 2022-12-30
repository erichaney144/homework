import { Discount, DiscountType } from 'entities/Discount'
import { Product } from 'entities/Product'

describe('BaseEntity', () => {
	it('assigns incrementing ids when saved', () => {
		const p1 = new Product({ name: 'Table', price: 100 })
		expect(p1.id).toBeUndefined()
		p1.save()
		expect(p1.id).toBe(1)

		const p2 = new Product({ name: 'Chair', price: 50 })
		expect(p2.id).toBeUndefined()
		p2.save()

		const d1 = new Discount({
			code: 'LuckyCustomer',
			amount: 50,
			type: DiscountType.percent,
		})
		expect(d1.id).toBeUndefined()
		d1.save()
		expect(d1.id).toBe(1)

		const d2 = new Discount({
			code: 'BlackFriday',
			amount: 10,
			type: DiscountType.percent,
		})
		expect(d2.id).toBeUndefined()
		d2.save()
		expect(d2.id).toBe(2)
	})
})
