import { EntityManager } from 'EntityManager'
import { seedDiscounts } from 'seeds/seed.discounts'
import { seedProducts } from 'seeds/seed.products'
import { CreateOrderRequest, createOrderService } from 'services/order.services'

beforeEach(() => {
	EntityManager.instances = {}
	seedProducts()
	seedDiscounts()
})

const validRequest = {
	items: [
		{ productId: 1, quantity: 1 },
		{ productId: 2, quantity: 1 },
	],
} as CreateOrderRequest

describe('Order Services', () => {
	describe('createOrderService', () => {
		it('creates an order with valid request', () => {
			const [order, errors] = createOrderService(validRequest)
			expect(errors?.length).toBeFalsy()
			expect(order).not.toBeNull()
			expect(order?.id).toBe(1)
			expect(order?.items.length).toBe(2)
		})

		it('returns an error if there are no items', () => {
			const [order, errors] = createOrderService({
				items: [],
			} as unknown as CreateOrderRequest)
			expect(order).toBeNull()
			expect(errors.length).toBe(1)
			expect(errors[0]).toBe('The order must have items')
		})

		it('returns an error if the discount is not found', () => {
			const [order, errors] = createOrderService({
				...validRequest,
				discount: 'NOT_EXISTS',
			})
			expect(order).toBeNull()
			expect(errors.length).toBe(1)
			expect(errors[0]).toMatch(/^Discount not found:/)
		})

		it('returns an error if the discount is no longer eligible', () => {
			// Order is not eligible because it is not the 3rd one
			const [order, errors] = createOrderService({
				...validRequest,
				discount: 'LUCKY_CUSTOMER',
			})
			expect(order).toBeNull()
			expect(errors.length).toBe(1)
			expect(errors[0]).toMatch(/This discount is no longer available/)
		})

		it('returns an error if the product is not found', () => {
			const [order, errors] = createOrderService({
				items: [{ productId: 85, quantity: 1 }],
			} as unknown as CreateOrderRequest)
			expect(order).toBeNull()
			expect(errors.length).toBe(1)
			expect(errors[0]).toMatch(/Product not found with ID/)
		})

		it('returns an error if the quantity is invalid', () => {
			const [order, errors] = createOrderService({
				items: [{ productId: 2, quantity: 'something' }],
			} as unknown as CreateOrderRequest)
			expect(order).toBeNull()
			expect(errors.length).toBe(1)
			expect(errors[0]).toMatch(/Invalid quantity: .* for product/)
		})

		it('catches runtime errors and reports them as a string error', () => {
			const [order, errors] = createOrderService({
				items: { length: 'abc' },
			} as unknown as CreateOrderRequest)
			expect(order).toBeNull()
			expect(errors.length).toBe(1)
			expect(errors[0]).toBe('TypeError - items.forEach is not a function')
		})
	})
})
