import { OrderItem } from '../OrderItem'

describe('OrderItem', () => {
	it('calculates extended price', () => {
		const item = new OrderItem()
		item.price = 5
		item.quantity = 2
		expect(item.extendedPrice()).toBe(10)
	})
})
