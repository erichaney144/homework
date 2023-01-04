import { Discount } from 'entities/Discount'
import { EveryNthOrderDiscount } from 'entities/EveryNthOrderDiscount'
import { Request, Response } from 'express'

export async function getDiscountByCodeController(
	req: Request,
	res: Response
): Promise<void> {
	const discount = Discount.findByCode(req.params.code)
	if (discount && discount instanceof EveryNthOrderDiscount) {
		res.json({ ...discount, isValidForUse: discount.isEligible() })
		return
	}
	res.json(discount)
}
