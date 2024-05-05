const EventPackageTable = require("../../Models/pulasthi-models/EventPackage");
const ExpenseTable = require("../../Models/pulasthi-models/Expense");
const IncomeTable = require("../../Models/pulasthi-models/Income");

const router = require("express").Router();


// Insert route
//me route eka finace dashboard eke event package form ekata denna onne
//devinda doesn't enter cost and profit but finance manager does
//methanin dn eventPackage ekata data yanne na
router.route("/add-eventPackages").post(async (req, res) => { 

    //let others know that they have to give my model column names when they destructuring to insert values to my tabels
    //destructuring 
    const{objectId,packageType,date,profit,cost} = req.body;

    try {
        //below newEvent is devinda code So remove it later
        // const newEvent = new EventPackageTable({
        //     packageId:packageId,
        //     packageType:packageType,
        //     date:date
        // });
        // await newEvent.save();

        //add profit of eventPackage to income table
        const newIncome = IncomeTable({
            incomeId:objectId,
            category:packageType,
            date:date,
            amount:profit,
        })
        await newIncome.save();
        
        //add cost of eventPackage to expense table
        const newExpense = ExpenseTable({
            expenseId:objectId,
            category:packageType,
            date:date,
            amount:cost,
        })
        await newExpense.save();

        res.json("Event,Income and Expense Added");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Read route - get all EventPackage data
router.route("/get-eventPackages").get((req, res) => {

    //from this sort code order of my retrieved budget data will based on createdAt field in descending order(-1)
    EventPackageTable.find().sort({createdAt: -1}).then((packages) => {
        res.json(packages)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get EventPackages", error: err.message });
    })
})


module.exports = router;