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
//Read route - get all booking data
router.route("/ClientAcc").get((req, res) => {

    ClientAcc.find().then((ClientAcc) => {
        res.json(ClientAcc)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    })
})



module.exports=router; 