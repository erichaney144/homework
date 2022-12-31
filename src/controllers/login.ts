import { Request, Response } from 'express'

export async function loginController(
	req: Request,
	res: Response
): Promise<void> {
	req.session.username = req.body.username
	res.json({ success: true })
}
