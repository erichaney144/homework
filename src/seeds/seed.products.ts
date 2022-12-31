import { Product } from 'entities/Product'
import { EntityManager } from 'EntityManager'

const products: Product[] = [
	{ name: 'Guitar', price: 150 },
	{ name: 'Piano', price: 1350 },
	{ name: 'Violin', price: 400 },
	{ name: 'Cello', price: 520 },
	{ name: 'Ukelele', price: 90 },
]

export const seedProducts = () => {
	products.forEach(p => {
		EntityManager.save(new Product(p))
	})
}
