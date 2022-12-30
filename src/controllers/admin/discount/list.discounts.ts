import { Request, Response } from 'express'

export async function listDiscountsController(
	req: Request,
	res: Response
): Promise<void> {
	res.send('List Discounts!')
}
