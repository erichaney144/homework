import { updateDiscountController } from 'controllers/admin/discount/update.discount'
import { listOrdersController } from 'controllers/admin/order/list.orders'
import { getDiscountByCodeController } from 'controllers/discount/by.code'
import { homeController } from 'controllers/home'
import { loginController } from 'controllers/login'
import { logoutController } from 'controllers/logout'
import { createOrderController } from 'controllers/order/create.order'
import { listProductsController } from 'controllers/product/list.products'
import cors from 'cors'
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
const port = process.env.PORT || 8080 // default port to listen

seedProducts()
seedDiscounts()

app.use(
	cors({
		origin: ['http://localhost:3000'],
	})
)
app.use(bodyParser.json())
app.use(
	session({
		secret: process.env.SESSION_SECRET || 'secret',
		resave: true,
		saveUninitialized: true,
	})
)

// define a route handler for the default home page
app.get('/', homeController)
app.get('/postman_collection.json', (req, res) => {
	res.header({ 'Content-type': 'application/json' })
	res.header({
		'Content-disposition': 'attachment; filename=postman_collection.json',
	})
	res.sendFile(__dirname.replace(/dist$/, '') + 'postman_collection.json')
})
app.get('/products', listProductsController)
app.post('/login', loginController)
app.post('/logout', logoutController)
app.post('/order', createOrderController)
app.get('/discount/:code', getDiscountByCodeController)

app.get('/admin/orders', listOrdersController)
app.route('/admin/discount/:id').put(updateDiscountController)

// start the Express server
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`)
})
