import { Discount } from 'entities/Discount'
import { Request, Response } from 'express'

export async function getDiscountByCodeController(
	req: Request,
	res: Response
): Promise<void> {
	res.json(Discount.findByCode(req.params.code))
}
