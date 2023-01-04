import { Discount } from 'entities/Discount'
import { EveryNthOrderDiscount } from 'entities/EveryNthOrderDiscount'
import { EntityManager } from 'EntityManager'
import { Request, Response } from 'express'

export async function loginController(
	req: Request,
	res: Response
): Promise<void> {
	// TODO: implement real authentication
	const { username, password } = req.body

	req.session.username = req.body.username

	const discount = EntityManager.find(Discount).find(
		d => d instanceof EveryNthOrderDiscount
	) as EveryNthOrderDiscount

	const available = discount?.isEligible()

	res.json({
		success: true,
		isNthOrderDiscountAvailable: !!available,
		nthOrderDiscountCode: available ? discount?.code : null,
	})
}
