import { Request, Response } from 'express'

export async function logoutController(
	req: Request,
	res: Response
): Promise<void> {
	req.session.destroy(() => {})
	res.json({ success: true })
}
