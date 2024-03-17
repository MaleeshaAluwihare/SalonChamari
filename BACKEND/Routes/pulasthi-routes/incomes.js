const IncomeTable = require('../../Models/pulasthi-models/Income');

const router = require('express').Router()


router.route("/add-income").post((req,res)=>{

    const{incomeId,amount,date,category} = req.body;

    const newIncome = new IncomeTable({
        incomeId,
        amount,
        date,
        category
    })

    newIncome.save().then(()=>{
        res.json("Income added");
    }).catch((err)=>{
        console.log(err);
    })
    // console.log(req.body);

})

//Read route - get all income data
router.route("/get-incomes").get((req, res) => {

    //from this sort code order of my retrieved budget data will based on createdAt field in descending order(-1)
    IncomeTable.find().sort({createdAt: -1}).then((incomes) => {
        res.json(incomes)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get budgets", error: err.message });
    })
})

module.exports = router;