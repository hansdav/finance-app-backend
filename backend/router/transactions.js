import express, { json } from "express";
import transactions from "../data/transactions.json" assert { type: "json"}
import fs from "fs"

const transactionsRouter = express.Router()
const transactionsData = transactions

transactionsRouter.get("/", (req, res) => {
    res.json(transactionsData)
})

transactionsRouter.get("/:id", (req, res) => {
    const transactionFromId = transactionsData.find((transaction) => transaction.id.toString() === req.params.id)
    res.json(transactionFromId)
})

export {transactionsRouter}