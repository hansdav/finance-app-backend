import express, { json } from "express";
import fs from "fs"

const categoriesRouter = express.Router()

categoriesRouter.get("/", (req, res) => {
    const categoriesData = JSON.parse(fs.readFileSync("./data/categories.json"));
    res.json(categoriesData)
})

categoriesRouter.get("/:id", (req, res) => {
    const categoriesData = JSON.parse(fs.readFileSync("./data/categories.json"));
    const categoryFromId = categoriesData.find((category) => category.id.toString() === req.params.id)
    res.json(categoryFromId)
})

categoriesRouter.post("/", (req, res) => {
    const categoriesData = JSON.parse(fs.readFileSync("./data/categories.json"));
    const newCategory = req.body
    categoriesData.unshift(newCategory)
    fs.writeFileSync("./data/categories.json", JSON.stringify(categoriesData))
    res.send("DONE")
})

export {categoriesRouter}