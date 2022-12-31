import { createDiscountController } from 'controllers/admin/discount/create.discount'
import { deleteDiscountController } from 'controllers/admin/discount/delete.discount'
import { listDiscountsController } from 'controllers/admin/discount/list.discounts'
import { updateDiscountController } from 'controllers/admin/discount/update.discount'
import { listOrdersController } from 'controllers/admin/order/list.orders'
import { homeController } from 'controllers/home'
import { loginController } from 'controllers/login'
import { logoutController } from 'controllers/logout'
import { createOrderController } from 'controllers/order/create.order'
import { listProductsController } from 'controllers/product/list.products'
import { default as bodyParser, default as express } from 'express'
import { default as session } from 'express-session'
import { seedDiscounts } from 'seeds/seed.discounts'
import { seedProducts } from 'seeds/seed.products'

declare module 'express-session' {
	interface SessionData {
		username: string
	}
}

const app = express()
const port = 8080 // default port to listen

seedProducts()
seedDiscounts()

app.use(bodyParser.json())
app.use(session())

// define a route handler for the default home page
app.get('/', homeController)
app.get('/products', listProductsController)
app.post('/login', loginController)
app.post('/logout', logoutController)
app.post('/order', createOrderController)

app.get('/admin/orders', listOrdersController)
app.get('/admin/discounts', listDiscountsController)
app
	.route('/admin/discount')
	.post(createDiscountController)
	.put(updateDiscountController)
	.delete(deleteDiscountController)

// start the Express server
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`)
})
