import { Discount } from 'entities/Discount'
import { EveryNthOrderDiscount } from 'entities/EveryNthOrderDiscount'
import { Order } from 'entities/Order'
import { OrderItem } from 'entities/OrderItem'
import { Product } from 'entities/Product'
import { EntityManager } from 'EntityManager'

export type OrderItemIncoming = {
	productId: number
	quantity: number
}
export type CreateOrderRequest = {
	discount: string
	items: OrderItemIncoming[]
}

export const createOrderService = (
	req: CreateOrderRequest
): [Order | null, string[]] => {
	const order = new Order()
	const errors: string[] = []

	try {
		const discount = Discount.findByCode(req.discount)
		if (req.discount && !discount) {
			errors.push(`Discount not found: ${req.discount}`)
		} else if (
			discount &&
			discount instanceof EveryNthOrderDiscount &&
			!discount.isEligible()
		) {
			errors.push(`Sorry!  This discount is no longer available.`)
		}

		if (req.items && req.items.length) {
			const [orderItems, itemErrors] = buildOrderItems(req.items)
			order.items = orderItems
			errors.push(...itemErrors)
		} else {
			errors.push('The order must have items')
		}

		if (errors.length === 0) {
			EntityManager.save(order)
			order.items.forEach(orderItem => {
				EntityManager.save(orderItem)
			})
		}
	} catch (e) {
		errors.push(`${e.name} - ${e.message}`)
	}

	if (errors.length) {
		return [null, errors]
	}
	return [order, errors]
}

export const buildOrderItems = (
	items: OrderItemIncoming[]
): [OrderItem[], string[]] => {
	const orderItems: OrderItem[] = []
	const errors: string[] = []

	items.forEach(({ productId, quantity }) => {
		const product = EntityManager.findOne(Product, { id: productId })
		if (!product) {
			errors.push(`Product not found with ID: ${productId}`)
			return
		}
		if (isNaN(quantity) || quantity < 0 || quantity > 1000) {
			errors.push(`Invalid quantity: ${quantity} for product: ${productId}`)
			return
		}
		orderItems.push(
			new OrderItem({
				product,
				quantity,
				price: product?.price,
			})
		)
	})
	return [orderItems, errors]
}
