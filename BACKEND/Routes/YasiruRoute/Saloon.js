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
        Salary
    }

    const filter = {Employee_ID: Employee_ID};

    const updatedEmployee = await Employee.findOneAndUpdate(filter,updateEmployee,{
        new: true
    });

    if(!updatedEmployee){
        return res.status(404).json({message:`Employee not found`});
    }

    await updatedEmployee.save();

    res.json({message: `Employee details updated`})

    }catch(error){
        console.log(err.message);
        res.status(500).send({status:"Error with updating data"});
    }
       
});

router.route("/delete/:id").delete(async(req,res) =>{
    let Employee_ID = req.params.id;

    await Employee.findByIdAndDelete(Employee_ID).then(() =>{
        res.status(200).send({status:"Employee deleted"})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete employee",error:err.message});
    })
})

router.route("/get/:id").get(async (req,res)=>{
    let Employee_ID = req.params.id;
    const user = await Employee.findById(Employee_ID).then(() =>{
        res.status(200).send({status:"Emplpoyee fetched",Employee:Employee })
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({stus: "Error with get Employee",error:err.message});
    })
})

module.exports = router;