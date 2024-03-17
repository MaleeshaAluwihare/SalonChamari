const router = require("express").Router();
const ExpenseTable = require("../../Models/pulasthi-models/Expense");



//Read route - get all expense data
router.route("/get-expenses").get((req, res) => {

    //from this sort code order of my retrieved budget data will based on createdAt field in descending order(-1)
    ExpenseTable.find().sort({createdAt: -1}).then((expenses) => {
        res.json(expenses)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get budgets", error: err.message });
    })
})






module.exports = router;