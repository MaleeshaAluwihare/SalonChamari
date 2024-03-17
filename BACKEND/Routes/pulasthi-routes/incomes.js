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

module.exports = router;