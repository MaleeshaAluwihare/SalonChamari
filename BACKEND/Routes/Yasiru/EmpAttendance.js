/*const router =require("express").Router();
let  EmpSalary = require("../../Models/pulasthi-models/EmpSalary")

router.route("/add").post((req,res)=>{
    

    const empId = req.body.empI;
    const attendance = req.body.attendance;
    const date = req.body.date;
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
module.exports = router;*/