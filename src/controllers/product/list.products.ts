import { Product } from 'entities/Product'
import { EntityManager } from 'EntityManager'
import { Request, Response } from 'express'

export async function listProductsController(
	req: Request,
	res: Response
): Promise<void> {
	res.json(EntityManager.all(Product))
}
