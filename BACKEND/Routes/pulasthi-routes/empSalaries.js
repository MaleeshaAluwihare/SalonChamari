const EmpSalaryTable = require("../../Models/pulasthi-models/EmpSalary");

const router = require("express").Router();





//Read route - get all empsalaries data
router.route("/get-empSalary").get((req, res) => {

    //from this sort code order of my retrieved budget data will based on createdAt field in descending order(-1)
    EmpSalaryTable.find().sort({createdAt: -1}).then((emp) => {
        res.json(emp)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get empSalary", error: err.message });
    })
})

//emp salaray eka hadila methanin tma expense table ekata data yanna onne

module.exports = router;