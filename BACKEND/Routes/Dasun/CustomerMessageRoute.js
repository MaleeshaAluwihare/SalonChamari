const router = require("express").Router();
let CustomerMessages = require("../../Models/Dasun/CustomerMessageModel");





//ADD
//http: //localhost:8070/CustomerMessages/add
router.route("/add").post((req,res) => {

    const customerId = req.body.customerId;
    const message = req.body.message;
    const date = req.body.date;

    const newMessage = new CustomerMessages({

        customerId,
        message,
        date

    })

    newMessage.save().then(() => {

        res.json("New Message Added")

    }).catch((err) => {

        res.status(500).json({error : "Failed to add message"})
        console.log(err);

    })

})



//DISPLAY
//http: //localhost:8070/CustomerMessages/display
router.route("/display").get((req,res) => {

    CustomerMessages.find().then((CustomerMessages) => {

        res.json(CustomerMessages);

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({status: "Error with get message", error: err.message});

    })

})




//GetOne
//http: //localhost:8070/CustomerMessages/get/
router.route("/get/:id").get(async(req,res) => {

    let messageId = req.params.id;

    const message = await CustomerMessages.findById(messageId).then((CustomerMessages) => {

        res.status(200).send({status: "Message fetched", CustomerMessages});

    }).catch((error) => {

        console.log(error);
        res.status(500).send({status: "Error with get message", error: error.message});

    })

})





//UPDATE
//http: //localhost:8070/CustomerMessages/update/
router.route("/update/:id").put(async(req,res) => {

    let messageId = req.params.id;
    
    const{customerId, message, date} = req.body;

    const updateMessage = {

        customerId,
        message,
        date

    }

    const update = await CustomerMessages.findByIdAndUpdate(messageId, updateMessage).then(() => {

        res.status(200).send({status: "Message updated"});

    }).catch((error) => {

        console.log(error);
        res.status(500).send({status: "Error with updating data"});

    })

})





//DELETE
//http: //localhost:8070/CustomerMessages/delete/
router.route("/delete/:id").delete(async(req,res) => {

    let messageId = req.params.id;

    await CustomerMessages.findByIdAndDelete(messageId).then(() => {

        res.status(200).send({status: "Message deleted"});

    }).catch((error) => {

        console.log(error);
        res.status(500).send({status: "Error with deleting message", error: error.message});

    })

})




module.exports = router;