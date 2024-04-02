const router = require("express").Router();
let Employee = require("../../Models/Yasiru/saloon")

//insert
router.route("/add").post((req,res)=>{
    
    const Employee_ID=req.body.Employee_ID
    const Name = req.body.Name;
    const Address =req.body.Address;
    const Qualification = req.body.Qualification;
    const Salary = Number(req.body.Salary);
    const Attendance = Number(req.body.Attendance);

 

    const newEmployee = new Employee({
        Employee_ID,
        Name,
        Address,
        Qualification,
        Salary,
        Attendance
    })

    newEmployee.save().then(()=>{
        res.json("Employee added")
    }).catch((err)=>{
        console.log(err);
    })
})


//Read route - getting all users data
router.route("/").get((req, res)=>{

    Employee.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{
        console.log(err)
    })

})

//update

router.route("/update/:Employee_ID").put(async(req,res)=>{

    let employee_ID =req.params.Employee_ID;

    const{Name, Address, Qualification, Salary} = req.body;

    const updateEmployee={
        Name,
        Address,
        Qualification,
        Salary,
        Attendance
    }

    await Employee.findOneAndUpdate(employee_ID,updateEmployee).then(() => {
        res.json(200).send ({ status:"Employee Updated"})
    }).catch(()=>{
        res.status(500).send({ status: "Error with updating Employee" });
    })
       
});

router.route("/delete/:Employee_ID").delete(async(req,res) =>{
    let Employee_ID = req.params.Employee_ID;

    await Employee.findOneAndDelete(Employee_ID).then(() =>{
        res.status(200).send({status:"Employee deleted"})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete employee",error:err.message});
    })
})

router.route("/get/:Employee_ID").get(async (req, res) => {

        let employee_ID = req.params.id;

        const employee = await Employee.findOne(employee_ID).then ((employee) => {
            res.status(200).send({ status: "Employee fetched", /*sending to frontend*/ student: student });

        }).catch(() => {
            res.status(500).send({ status: "Employee not found" });
        })
});

module.exports = router;