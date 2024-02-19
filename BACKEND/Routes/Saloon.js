const router = require("express").Router();
let Employee = require("../Models/models-Yasiru/saloon")

//insert
router.route("/add").post((req,res)=>{
  
    const Name = req.body.Name;
    const Address =req.body.Address;
    const Age = Number(req.body.Age);
    const Salary=req.body.Salary;

    const newEmployee = new Employee({
     
        Name,
        Address,
        Age,
        Salary
    })

    newEmployee.save().then(()=>{
        res.json("Employee added")
    }).catch((err)=>{
        console.log(err);
    })
})
// //Read route - getting all users data
router.route("/").get(()=>{

    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err)
    })

})


router.route("/")

module.exports = router;