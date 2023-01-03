import { Discount } from 'entities/Discount'
import { EveryNthOrderDiscount } from 'entities/EveryNthOrderDiscount'
import { EntityManager } from 'EntityManager'
import { Request, Response } from 'express'

export async function updateDiscountController(
	req: Request,
	res: Response
): Promise<void> {
	try {
		const id = parseInt(req.params.id)
		const discount = EntityManager.findOne(Discount, { id })
		if (!discount) {
			res.json({
				success: false,
				message: `Could not find Discount with id: ${id}`,
			})
			return
		}
		discount.amount = req.body.amount
		discount.type = req.body.type
		discount.code = req.body.code
		if (discount instanceof EveryNthOrderDiscount) {
			discount.n = req.body.n
		}
		EntityManager.save(discount)
	} catch (e) {
		res.json({ success: false, message: e.message })
	}
	res.json({ success: true })
}
