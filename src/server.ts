import express from 'express'
import { createDiscountController } from './controllers/admin/discount/create.discount'
import { deleteDiscountController } from './controllers/admin/discount/delete.discount'
import { listDiscountsController } from './controllers/admin/discount/list.discounts'
import { updateDiscountController } from './controllers/admin/discount/update.discount'
import { createOrderController } from './controllers/customer/create.order'
import { loginController } from './controllers/customer/login'

const app = express()
const port = 8080 // default port to listen

// define a route handler for the default home page
app.get('/admin/discounts', listDiscountsController)
app
	.route('/admin/discount')
	.post(createDiscountController)
	.put(updateDiscountController)
	.delete(deleteDiscountController)
app.post('/login', loginController)
app.post('/order', createOrderController)

// start the Express server
app.listen(port, () => {
	console.log(`server started at http://localhost:${port}`)
})
