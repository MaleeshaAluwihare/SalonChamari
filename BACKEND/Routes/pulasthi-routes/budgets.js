const router = require("express").Router();
const BudgetTable = require("../../Models/pulasthi-models/Budget");


// Insert route
router.route("/add-budget").post(async (req, res) => {

    const budgetId = req.body.budgetId;
    const month = req.body.month;
    const amount = Number(req.body.amount);
    const date = Date(req.body.date);

    try {
        //table dekaka eka para save karanna widiha
        const newBudget = new BudgetTable({ budgetId,month,amount,date});
        await newBudget.save();

        res.json("Booking Added");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


module.exports = router;