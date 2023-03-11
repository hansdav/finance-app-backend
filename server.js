import  express  from "express"
import {categoriesRouter} from "./router/categories.js"
import { transactionsRouter } from "./router/transactions.js"
import cors from "cors"

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use("/api/categories", categoriesRouter)

app.use("/api/transactions", transactionsRouter)

app.listen(3000)