import { Discount, DiscountType } from 'entities/Discount'
import { Product } from 'entities/Product'
import { EntityManager } from 'EntityManager'

beforeEach(() => {
	EntityManager.instances = {}
})

describe('EntityManager', () => {
	it('assigns incrementing ids when saved', () => {
		const p1 = new Product({ name: 'Table', price: 100 })
		expect(p1.id).toBeUndefined()
		EntityManager.save(p1)
		expect(p1.id).toBe(1)

		const p2 = new Product({ name: 'Chair', price: 50 })
		expect(p2.id).toBeUndefined()
		EntityManager.save(p2)
		expect(p2.id).toBe(2)

		const d1 = new Discount({
			code: 'LuckyCustomer',
			amount: 50,
			type: DiscountType.percent,
		})
		expect(d1.id).toBeUndefined()
		EntityManager.save(d1)
		expect(d1.id).toBe(1)

		const d2 = new Discount({
			code: 'BlackFriday',
			amount: 10,
			type: DiscountType.percent,
		})
		expect(d2.id).toBeUndefined()
		EntityManager.save(d2)
		expect(d2.id).toBe(2)
	})

	it('returns all entities of given a BaseEntity subclass', () => {
		EntityManager.save(new Product({ name: 'Suit' }))
		EntityManager.save(new Product({ name: 'Tie' }))

		EntityManager.save(new Discount({ code: 'DISCOUNT_123' }))

		expect(EntityManager.all(Product).length).toBe(2)

		const discounts = EntityManager.all(Discount) as { code: string }[]
		expect(discounts.length).toBe(1)
		expect(discounts[0]?.code).toBe('DISCOUNT_123')
	})
})
