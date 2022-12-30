import { Request, Response } from 'express'

export async function createOrderController(
	req: Request,
	res: Response
): Promise<void> {
	res.send('Create Order!')
}
