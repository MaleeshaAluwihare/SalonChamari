const router = require("express").Router();
const { time } = require("console");
 let EManager = require("../../Models/devinda/EManager"); // give the path to get the manager file in models

 //crud 
 // create 
 //creating a method to call from the front end basicaly its the adress that calls 
 router.route("/add").post((req,res)=>{
    //method
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const managerID = req.body.managerID;
    const bookings = req.body.bookings;
    

    const newEManager = new EManager({
        name,
        email,
        phone, 
        managerID,
        bookings,
        
    })

    //to save and pass to the data base 
    //then catch used to exception handelling 
    newEManager.save().then(()=>{
        res.json("Event manager added")
    }).catch(()=>{
        console.log(err);

    })
 })

//read
 //to get registerd client details 

 router.route("/").get((req,res)=>{
    EManager.find().then((EManager)=>{
        res.json(EManager)
    }).catch((err)=>{
        console.log(err)
    })
 })

 //Update 
 //http//Localhost:8070/student/update/5gfdh5u8asdb
 //have to use the : to make sure that the id is not displayed in the url
 
 router.route("/update/:id").put(async(req,res) =>{
    //to assign the id to the variable  
    let userId = req.params.id;
    //dstructure 
    //we can use the method used in the create function as well
    //assigning values one by one
    const {name,email,phone,bookings,managerID}= req.body;
     
    const updateEManager={
        name,
        email,
        phone,
        bookings,
        managerID
    }

    const update = await EManager.findByIdAndUpdate (userId,updateEManager).then(()=>{
        //to send an update to the frontend that the updation is successfull
        
    res.status(200).send({status:"Event Manager Updated"}) 
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with Updating data"});
    })

    
 })

 //delete
 //to delete a client
 router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await EManager.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"Manager Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete user",error: err.message});
    })
    
 })


 //to extract single useres data 
 router.route("/get/:id").get(async (req, res)=>{
    let userId = req.params.id;
   const user = await EManager.findById(userId)
    //if we want to use any other attrivute like email
    // await Client.findByOne(email);
    .then((EManager)=>{
        res.status(200).send({status:"User Fetched",EManager}); 
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with Fetching user",error: err.message});
    })
 })

 module.exports = router;
