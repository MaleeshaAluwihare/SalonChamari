const router =require("express").Router();
let Attendacecount = require("../../Models/Yasiru/Attendacecount")


router.route("/add").post((req,res)=>{
    

    const empId = req.body.empId;
    const attendance = req.body.attendance;
    const jobRole = req.body.jobRole;
    const date = req.body.date
 
    //const Attendance = Number(req.body.Attendance);

 

    const AttendanceCount = new Attendacecount({
        empId,
        attendance,
        jobRole,
        date
      
        //Attendance
    })

    AttendanceCount.save().then(()=>{
        res.json("Employee added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req, res)=>{

    Attendacecount.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{ 
        console.log(err)
    })

})
module.exports = router;