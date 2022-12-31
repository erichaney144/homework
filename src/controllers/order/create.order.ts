import { Request, Response } from 'express'
import { CreateOrderRequest, createOrderService } from 'services/order.service'

export async function createOrderController(
	req: Request,
	res: Response
): Promise<void> {
	const [order, errors] = createOrderService(
		req.body as unknown as CreateOrderRequest
	)

	if (errors && errors.length) {
		res.json({ success: false, messages: errors })
		return
	}

	res.json({ success: true, order: order })
}
