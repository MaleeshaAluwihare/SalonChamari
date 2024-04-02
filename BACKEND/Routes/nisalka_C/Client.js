const router = require("express").Router();
let ClientAcc = require("../../Models/nisalka_client/client_m");

http://localhost:8070/ClientAcc/add

//Insert or create

router.route("/add").post((req,res)=> {

    const Email =req.body.Email;
    const Full_name =req.body.Full_name;
    const Password =req.body.Password;
    const Phone =req.body.Phone;
    const Age =Number(req.body.Age) ;
    const Gender =req.body.Gender;


    const newClient = new ClientAcc({

        Email,
        Full_name,   
        Password,  
        Phone, 
        Age, 
        Gender

    })

    newClient.save().then(()=>{
        res.json("New client added")
    }).catch((err)=>{
        console.log(err);
        res.status(500).json({ error: "Failed to add client" })
    })

})

http://localhost:8070/ClientAcc/display

// get all user data
router.route("/display").get((req, res) => {

    ClientAcc.find().then((ClientAcc) => {
        res.json(ClientAcc)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    })
})

http://localhost:8070/ClientAcc/get/

//get user by id

router.route("/get/:id").get(async(req,res)=>{
    let userId = req.params.id;

    const user = await ClientAcc.findById(userId)
    .then((ClientAcc)=>{
        res.status(200).send({status:"user fetched",ClientAcc})
    }).catch((error)=>{
        console.log(error);
        res.status(500).send({ststud:"error with get user",error:error.message});
    })
})

http://localhost:8070/ClientAcc/update/

//Update by ID


router.route("/update/:id").put(async(req,res)=>{

    let userId = req.params.id;
    const{Email,Full_name,Password,Phone,Age,Gender} = req.body;

    const updateUser = {
        Email,
        Full_name,
        Password,
        Phone,
        Age,
        Gender
    }

    const update = await ClientAcc.findByIdAndUpdate (userId,updateUser)
    .then(() =>{
        res.status(200).send({status:"User updated"})
    }).catch((error) => {
        console.log(error);
        res.status(500).send({status:"error with updating data"});
    })
})

http://localhost:8070/ClientAcc/delete/

//delete by ID

router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await ClientAcc.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"user deleted"});
    }).catch((error)=>{
        console.log(error);
        res.status(500).send({status:"error with deleting",error:error.message});
    })
})


module.exports=router; 