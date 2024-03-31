const router = require("express").Router();
let Client = require("../../Models/nisalka_client/client_m");

http://localhost:8070/ClientAcc/add

router.route("/add").post((req,res)=> {

    const Email =req.body.Email;
    const Full_name =req.body.Full_name;
    const Password =req.body.Password;
    const Phone =req.body.Phone;
    const Age =Number(req.body.Age) ;
    const Gender =req.body.Gender;


    const newClient = new Client({

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

//get all clients from the database
router.route('/').get((req, res)=>{

    Client.find().then((ClientAcc)=>{
        res.json(ClientAcc)
    }).catch((err)=>{
        console.log(err);
    });

})

http://localhost:8070/ClientAcc/update

router.route("/")

module.exports=router; 