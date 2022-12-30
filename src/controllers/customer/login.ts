import { Request, Response } from 'express'

export async function loginController(
	req: Request,
	res: Response
): Promise<void> {
	res.send('Login!')
}
