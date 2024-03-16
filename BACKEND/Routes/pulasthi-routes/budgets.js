const router = require("express").Router();
const BudgetTable = require("../../Models/pulasthi-models/Budget");


// Insert route
router.route("/add-budget").post(async (req, res) => {

    const{budgetId,month,amount,date} = req.body;


    try {
        
        const newBudget = new BudgetTable({ budgetId,month,amount,date});
        await newBudget.save();

        res.json("Booking Added");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Read route - get all booking data
router.route("/get-budgets").get((req, res) => {

    //from this sort code order of my retrieved budget data will based on createdAt field in descending order(-1)
    BudgetTable.find().sort({createdAt: -1}).then((budgets) => {
        res.json(budgets)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    })
})


module.exports = router;