import { Order } from 'entities/Order'
import { EntityManager } from 'EntityManager'
import { Request, Response } from 'express'

export async function listOrdersController(
	req: Request,
	res: Response
): Promise<void> {
	res.json(EntityManager.all(Order))
}
