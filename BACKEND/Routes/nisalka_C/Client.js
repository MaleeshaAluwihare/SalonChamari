const router = require("express").Router();
let Client = require("../../Models/nisalka_client/client_m");

http://localhost:8070/Client/add

router.route("/add").post((req,res)=> {

    const Full_name =req.body.Full_name;
    const Email =req.body.Email;
    const Password =req.body.Password;
    const Phone =req.body.Phone;
    const Age =Number(req.body.Age) ;
    const Gender =req.body.Gender;


    const newClient = new Client({

        Full_name, 
        Email,  
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

    Client.find().then((Client)=>{
        res.json(Client)
    }).catch((err)=>{
        console.log(err);
    });

})

http://localhost:8070/Client/update

router.route("/")

module.exports=router; 