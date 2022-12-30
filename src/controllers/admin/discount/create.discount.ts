import { Request, Response } from 'express'

export async function createDiscountController(
	req: Request,
	res: Response
): Promise<void> {
	res.send('Create Discount!')
}
