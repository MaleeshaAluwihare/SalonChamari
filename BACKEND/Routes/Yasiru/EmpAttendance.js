const router =require("express").Router();
let  EmpSalary = require("../../Models/pulasthi-models/EmpSalary")

router.route("/add").post((req,res)=>{
    
    const     =req.body.empId;
    const jobRole = req.body.jobRole;
    //const Attendance = Number(req.body.Attendance);

 

    const newEmployee = new Employee({
        empId,
        attendance,
        date,
        jobRole,
        
        //Attendance
    })

    newEmployee.save().then(()=>{
        res.json("Employee added")
    }).catch((err)=>{
        console.log(err);
    })

  

})
module.exports = router;