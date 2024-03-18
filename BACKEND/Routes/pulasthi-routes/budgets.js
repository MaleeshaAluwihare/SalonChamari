const router = require("express").Router();
const BudgetTable = require("../../Models/pulasthi-models/Budget");


// Insert route
router.route("/add-budget").post(async (req, res) => {

    const{budgetId,month,amount,date} = req.body;


    try {
        
        const newBudget = new BudgetTable({ budgetId,month,amount,date});
        await newBudget.save();

        res.json("Budget Added");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Read route - get all budgets data
router.route("/get-budgets").get((req, res) => {

    //from this sort code order of my retrieved budget data will based on createdAt field in descending order(-1)
    BudgetTable.find().sort({createdAt: -1}).then((budgets) => {
        res.json(budgets)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get budgets", error: err.message });
    })
})

//get specific booking
router.route("/getBudgetById/:budgetId").get(async (req, res) => {
    let budgetId = req.params.budgetId;

    try {
        // Find the booking by custom ID
        //save the finding budget to budget constant
        //curly braces athule danna ewa withrai ape exact table column names wenne 
        const budget = await BudgetTable.findOne({ budgetId: budgetId });

        // Check if booking is found
        if (!budget) {
            return res.status(404).send({ status: "Budget_Not_Found" });
        }

        // Send the booking data to the frontend
        res.status(200).send({ status: "Budget fetched", budget: budget });
    } catch (error) {
        // Handle errors
        console.error("Error fetching budget:", error);
        res.status(500).send({ status: "Internal_Server_Error" });
    }
});

// Update route
router.route("/update-budget/:budgetId").put(async (req, res) => {
    let budgetId = req.params.budgetId;
    const { month, amount, date } = req.body;

    const updateBudget = {
        month,
        amount,
        date
    };

    try {
        // Find and update the booking by ID
        //{ new: true } option specifies that the updated document should be returned after the update operation.
        const updatedBudget = await BudgetTable.findOneAndUpdate({ budgetId: budgetId }, updateBudget, { new: true });

        // Check if booking is found and updated
        if (!updatedBudget) {
            return res.status(404).send({ status: "Budget_Not_Found" });
        }

        // Send the updated booking data to the frontend
        res.status(200).send({ status: "Budget Updated", updatedBudget: updatedBudget });
    } catch (error) {
        // Handle errors
        console.error("Error updating budget:", error);
        res.status(500).send({ status: "Internal_Server_Error" });
    }
});

//Delete route
router.route("/delete-budget/:budgetId").delete(async (req, res) => {
    let budgetId = req.params.budgetId;

    try {
        // Find the booking by ID
        const budget = await BudgetTable.findOne({ budgetId: budgetId });

        // Check if booking exists
        if (!budget) {
            return res.status(404).send({ status: "Budget_Not_Found" });
        }

        // Delete the booking
        await BudgetTable.findOneAndDelete({ budgetId: budgetId });

        // Send success response
        res.status(200).send({ status: "Budget deleted" });
    } catch (error) {
        // Handle errors
        console.error("Error deleting Budget:", error);
        res.status(500).send({ status: "Internal_Server_Error", error: error.message });
    }

});

module.exports = router;