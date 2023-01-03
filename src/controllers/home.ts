import { Request, Response } from 'express'

export async function homeController(
	req: Request,
	res: Response
): Promise<void> {
	res.send(`
	<html><body><pre>
	Welcome!

	Explore the API with Postman: &lt;link to postman collection&gt;
	</pre></body></html>`)
}
