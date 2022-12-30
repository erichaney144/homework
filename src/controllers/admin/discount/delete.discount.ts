import { Request, Response } from 'express'

export async function deleteDiscountController(
	req: Request,
	res: Response
): Promise<void> {
	res.send('Create Discount!')
}
