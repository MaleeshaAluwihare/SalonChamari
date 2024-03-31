const router = require("express").Router();
let Client = require("../../Models/nisalka_client/client_m");

router.route("/add").post((req,res)=> {

    const Client_ID =req.body.Client_ID;
    const Full_name =req.body.Full_name;
    const Email =req.body.Email;
    const Password =req.body.Password;
    const Phone =req.body.Phone;
    const Age =Number(req.body.Age) ;
    const Gender =req.body.Gender;


    const newClient = new Client({

        Client_ID, 
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
    })

})

//get all clients from the database
router.route('/').get((req, res)=>{

    Client.find().then((client_account)=>{
        res.json(client_account)
    }).catch((err)=>{
        console.log(err);
    });

})

module.exports=router;