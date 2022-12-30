import { Request, Response } from 'express'

export async function updateDiscountController(
	req: Request,
	res: Response
): Promise<void> {
	res.send('Update Discount!')
}
