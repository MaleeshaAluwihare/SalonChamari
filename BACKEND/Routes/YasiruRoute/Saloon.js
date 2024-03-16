const router = require("express").Router();
let Employee = require("../../Models/models-Yasiru/saloon")

//insert
router.route("/add").post((req,res)=>{
    
    const Employee_ID=req.body.Employee_ID
    const Name = req.body.Name;
    const Address =req.body.Address;
    const Qualification = req.body.Qualification;
    const Salary = Number(req.body.Salary);

 

    const newEmployee = new Employee({
     
        Employee_ID,
        Name,
        Address,
        Qualification,
        Salary
    })

    newEmployee.save().then(()=>{
        res.json("Employee added")
    }).catch((err)=>{
        console.log(err);
    })
})


//Read route - getting all users data
router.route("/").get(()=>{

    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err)
    })

})



//router.route("/update/:id ").put()

module.exports = router;