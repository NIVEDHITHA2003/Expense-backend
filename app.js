const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connection (Compass)
mongoose.connect("mongodb+srv://prahulhariharan2005_db_user:BoNrrNy3r9U3ovj4@cluster0.wptvs8b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("MongoDB Atlas connected"))
    .catch(err => console.log(err));

// Schema + Model
const expenseSchema = new mongoose.Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true }
});

const Expense = mongoose.model("Expense", expenseSchema);

app.post('/addExpense', insertExpense);
async function insertExpense(req, res) {
    try {
        const newExpense = new Expense(req.body)
        await newExpense.save();
        res.status(201).send("Expense added");

    } catch {
        res.send("Error in adding expense")
    }
}

app.get('/getExpense', getExpense);
async function getExpense(req, res) {
    try {
        const expenses = await Expense.find();
        console.log(expenses);
        res.send(expenses);

    } catch {
        res.status(500).send("Error in getting expense")
    }
}

app.delete('/deleteExpense', deleteExpense);
async function deleteExpense(req, res) {

    try {
        const { id } = req.body
        await Expense.findByIdAndDelete(id)
        res.send("Expense deleted")

    } catch {
        res.status(500).send("Error in deleting expense")
    }
}

app.put('/editExpense', editExpense);
async function editExpense(req, res) {

    try {
        const { id, title, amount } = req.body
        await Expense.findByIdAndUpdate(id,{title,amount},{new:true})
        res.send("Expense Edited")

    } catch {
        res.status(500).send("Error in editing expense")
    }
}
app.listen(3000)