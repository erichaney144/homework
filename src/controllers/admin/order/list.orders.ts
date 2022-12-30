import { Request, Response } from 'express'

export async function listOrdersController(
	req: Request,
	res: Response
): Promise<void> {
	res.send('List Orders!')
}
