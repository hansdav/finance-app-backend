import express, { json } from "express";
import categories from "../data/categories.json" assert { type: "json"}
import fs from "fs"

const categoriesRouter = express.Router()
const categoriesData = categories

categoriesRouter.get("/", (req, res) => {
    res.json(categoriesData)
})

categoriesRouter.get("/:id", (req, res) => {
    const categoryFromId = categoriesData.find((category) => category.id.toString() === req.params.id)
    res.json(categoryFromId)
})

export {categoriesRouter}