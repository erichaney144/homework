import { Order } from 'entities/Order'
import { OrderItem } from 'entities/OrderItem'
const items = [
	new OrderItem({ price: 5, quantity: 2 }),
	new OrderItem({ price: 3, quantity: 3 }),
]
describe('orders', () => {
	it('calculates subtotal', () => {
		const order = new Order({
			items,
		})
		expect(order.subTotal()).toBe(19)
	})

	it('calculates total', () => {
		const order = new Order({
			items,
			discountAmount: 5,
		})
		expect(order.total()).toBe(14)
	})
})
