import express, { json } from "express";
import fs from "fs";

const transactionsRouter = express.Router();

transactionsRouter.get("/", (req, res) => {
  let transactionsData = JSON.parse(
    fs.readFileSync("./data/transactions.json")
  );

  if (req.query["type"] !== undefined) {
    const type = req.query["type"];
    transactionsData = transactionsData.filter((transaction) =>
      transaction.type.toLowerCase().includes(type.toLowerCase())
    );
  }

  if (req.query["description"] !== undefined) {
    const description = req.query["description"];
    transactionsData = transactionsData.filter((transaction) =>
      transaction.description.toLowerCase().includes(description.toLowerCase())
    );
  }

  if (req.query["category"] !== undefined) {
    const categoryName = req.query["category"];
    const categories = JSON.parse(fs.readFileSync("./data/categories.json"));
    const category = categories.find(
      (c) => c.name.toLowerCase() === categoryName.toLowerCase()
    );
    transactionsData = transactionsData.filter(
      (transaction) => transaction.category === category.id
    );
  }
  if (req.query["sortAscending"] !== undefined) {
    const sortAsc = req.query["sortAscending"];
    transactionsData.sort((a, b) => {
      if (a[sortAsc] > b[sortAsc]) {
        return 1;
      } else if (a[sortAsc] < b[sortAsc]) {
        return -1;
      }
      return 0;
    });
  }

  if (req.query["sortDescending"] !== undefined) {
    const sortDesc = req.query["sortDescending"];
    transactionsData.sort((a, b) => {
      if (a[sortDesc] > b[sortDesc]) {
        return -1;
      } else if (a[sortDesc] < b[sortDesc]) {
        return 1;
      }
      return 0;
    });
  }
  res.json(transactionsData);
});

transactionsRouter.get("/:id", (req, res) => {
  const transactionsData = JSON.parse(
    fs.readFileSync("./data/transactions.json")
  );
  const transactionFromId = transactionsData.find(
    (transaction) => transaction.id.toString() === req.params.id
  );
  res.json(transactionFromId);
});

transactionsRouter.post("/", (req, res) => {
  const transactionsData = JSON.parse(
    fs.readFileSync("./data/transactions.json")
  );
  const newTransaction = req.body;
  transactionsData.unshift(newTransaction);
  let maxId = 0;
  for (let transaction of transactionsData) {
    maxId = Math.max(maxId, transaction.id);
  }
  newTransaction.id = maxId + 1;
  fs.writeFileSync(
    "./data/transactions.json",
    JSON.stringify(transactionsData)
  );
  res.send("DONE");
});

transactionsRouter.delete("/:id", (req, res) => {
  const transactionsData = JSON.parse(
    fs.readFileSync("./data/transactions.json")
  );
  const idToDelete = req.params.id;
  const newData = transactionsData.filter(
    (transaction) => transaction.id !== parseInt(idToDelete)
  );
  fs.writeFileSync("./data/transactions.json", JSON.stringify(newData));
  res.send("DONE");
});

transactionsRouter.put("/:id", (req, res) => {
  const transactionsData = JSON.parse(
    fs.readFileSync("./data/transactions.json")
  );
  const idToChange = req.params.id;
  const newData = req.body;
  const indexOfTransaction = transactionsData.findIndex(
    (transaction) => transaction.id.toString() === idToChange
  );
  transactionsData[indexOfTransaction] = newData;
  fs.writeFileSync(
    "./data/transactions.json",
    JSON.stringify(transactionsData)
  );
  res.send("DONE");
});

transactionsRouter.patch("/:id", (req, res) => {
  const transactionsData = JSON.parse(
    fs.readFileSync("./data/transactions.json")
  );
  const idToPatch = req.params.id;
  const transactionToUpdate = transactionsData.find(
    (transaction) => transaction.id === parseInt(idToPatch)
  );
  const index = transactionsData.indexOf(transactionToUpdate);
  Object.assign(transactionToUpdate, req.body);
  transactionsData[index] = transactionToUpdate;
  fs.writeFileSync(
    "./data/transactions.json",
    JSON.stringify(transactionsData)
  );
  res.send("DONE");
});

export { transactionsRouter };
