const IncomeTable = require('../../Models/pulasthi-models/Income');

const router = require('express').Router()


router.route("/add-income").post((req,res)=>{

    const bookingId = req.body.bookingId;
    const amount = Number(req.body.amount);
    const date = Date(req.body.date);

    const newIncome = new IncomeTable({
        bookingId,
        amount,
        date
    })

    newIncome.save().then(()=>{
        res.json("Income added");
    }).catch((err)=>{
        console.log(err);
    })
    // console.log(req.body);

})

module.exports = router;