import { Request, Response } from 'express'

export async function homeController(
	req: Request,
	res: Response
): Promise<void> {
	res.send('Shop!')
}
