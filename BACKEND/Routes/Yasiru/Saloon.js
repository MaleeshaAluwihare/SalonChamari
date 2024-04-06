const router = require("express").Router();
let Employee = require("../../Models/Yasiru/saloon")
let EmpSalary =require("../../Models/pulasthi-models/EmpSalary")

//insert
router.route("/add").post((req,res)=>{
    
    const Employee_ID=req.body.Employee_ID
    const Name = req.body.Name;
    const Address =req.body.Address;
    const Qualification = req.body.Qualification;
    const Salary = Number(req.body.Salary);
    //const Attendance = Number(req.body.Attendance);

 

    const newEmployee = new Employee({
        Employee_ID,
        Name,
        Address,
        Qualification,
        Salary,
        //Attendance
    })

    newEmployee.save().then(()=>{
        res.json("Employee added")
    }).catch((err)=>{
        console.log(err);
    })

    //route to Employee salary
    const EmpAttendance = new EmpSalary({
        empId : Employee_ID,
    })

    EmpAttendance.save().then(()=>{
        res.json("Employee Attendnace")
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

    let Employee_ID =req.params.Employee_ID;

    const{Name, Address, Qualification, Salary} = req.body;

    try{

        const updateEmployee={
            Name,
            Address,
            Qualification,
            Salary,
        // Attendance
        }

        const filter = {Employee_ID: Employee_ID}

        const updatedEmployee = await Employee.findOneAndUpdate(filter,updateEmployee,{
            new : true
        });
        await updatedEmployee.save();

        res.json({message: `Update Successfull`})

    }catch(error){
    res.status(500).json({message: error.message})
}

       
});

//delete
router.route("/delete/:Employee_ID").delete(async(req,res) =>{
    let Employee_ID = req.params.Employee_ID;

    await Employee.findOneAndDelete(Employee_ID).then(() =>{
        res.status(200).send({status:"Employee deleted"})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete employee",error:err.message});
    })
})

router.get('/get/:Employee_ID', async (req, res) => {
    const { Employee_ID } = req.params;

    try {
        const employee = await Employee.findOne({ Employee_ID });

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(200).json({ Employee: employee });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;