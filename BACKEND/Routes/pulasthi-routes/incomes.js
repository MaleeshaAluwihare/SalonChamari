const IncomeTable = require('../../Models/pulasthi-models/Income');

const router = require('express').Router()


//Read route - get all income data
router.route("/get-incomes").get((req, res) => {

    //from this sort code order of my retrieved budget data will based on createdAt field in descending order(-1)
    IncomeTable.find().sort({createdAt: -1}).then((incomes) => {
        res.json(incomes)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get incomes", error: err.message });
    })
})

module.exports = router;