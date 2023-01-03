import { Request, Response } from 'express'

export async function homeController(
	req: Request,
	res: Response
): Promise<void> {
	res.send(`
	<html><body>
	<p>
	Welcome!
	</p>

	<p>
	Explore the API with Postman:
	</p>

	<ul>
	<li>Download this <a href='/postman_collection.json'>Postman Collection</a></li>
	<li>Open Postman</li>
	<li>Go to Collections => Import</li>
	<li>Browse to the file</li>
	<li>Click Import</li>
	</ul>
	</body></html>`)
}
