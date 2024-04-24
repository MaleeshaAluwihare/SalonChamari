const router = require("express").Router();
let AProfile = require("../../Models/nisalka/admin_profile");


http://localhost:8070/AdminProfile/add

//Insert or create

router.route("/add").post((req,res)=> {

    const Email =req.body.Email;
    const Full_name =req.body.Full_name;
    const Password =req.body.Password;
    const Phone =req.body.Phone;
    const Title =req.body.Title;

    const newAdmin = new AdminProfile({

        Email,
        Full_name,   
        Password,  
        Phone,
        Title 

    })

    newAdmin.save().then(()=>{
        res.json("New admin added")
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ error: "Failed to add admin" })
    })

})

http://localhost:8070/AdminProfile/display

// get all admin data
router.route("/display").get((req, res) => {

    AdminProfile.find().then((AdminProfile) => {
        res.json(AdminProfile)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    })
})

http://localhost:8070/AdminProfile/get/

//get admin by id

router.route("/get/:id").get(async(req,res)=>{
    let adminId = req.params.id;

    const admin = await AdminProfile.findById(adminId)
    .then((AdminProfile)=>{
        res.status(200).send({status:"admin fetched",AdminProfile})
    }).catch((error)=>{
        console.log(error);
        res.status(500).send({status:"error with getting admin",error:error.message});
    })
})

http://localhost:8070/AdminProfile/update/

//Update by ID

router.route("/update/:id").put(async(req,res)=>{

    let adminId = req.params.id;
    const{Email,Full_name,Password,Phone,Title} = req.body;

    const updateAdmin = {
        Email,
        Full_name,
        Password,
        Phone,
        Title
        
    }

    const update = await AdminProfile.findByIdAndUpdate (adminId,updateAdmin)
    .then(() =>{
        res.status(200).send({status:"Admin updated"})
    }).catch((error) => {
        console.log(error);
        res.status(500).send({status:"error with updating data"});
    })
})

http://localhost:8070/AdminProfile/delete/

//delete by ID

router.route("/delete/:id").delete(async(req,res)=>{
    let adminId = req.params.id;

    await AdminProfile.findByIdAndDelete(adminId)
    .then(()=>{
        res.status(200).send({status:"deleted"});
    }).catch((error)=>{
        console.log(error);
        res.status(500).send({status:"error with deleting",error:error.message});
    })
})

module.exports=router; 