const router = require("express").Router();
let CustomerMessages = require("../../Models/Dasun/CustomerMessageModel");




async function generateMessageId() {

    const prefix = 'MS100';

    try {

        const MessageCount = await CustomerMessages.countDocuments();

        const nextMessageNumber = MessageCount + 1;

        const MessageId = `${prefix}${nextMessageNumber}`;

        return MessageId;

    } catch (error) {

        console.error('Error generating Message ID', error);

    }

}


async function generateCustomerId() {

    const prefix = 'CS100';

    try {

        const MessageCount = await CustomerMessages.countDocuments();

        const nextMessageNumber = MessageCount + 1;

        const CustomerId = `${prefix}${nextMessageNumber}`;

        return CustomerId;

    } catch (error) {

        console.error('Error generating Customer ID', error);

    }

}





//ADD
//http: //localhost:8070/CustomerMessages/add
router.route("/add").post( async (req,res) => {

    // const customerId = req.body.customerId;
    // const messageId = req.body.messageId;
    const message = req.body.message;
    const date = req.body.date;

    // let prefix = '';

    // const itemCount = await CustomerMessages.countDocuments();

    // const messageId = prefix + padNumber(itemCount + 1);


//     async function generateFaqId() {

//     const prefix = 'FQ100';

//     try {

//         const FaqCount = await Faqs.countDocuments();

//         const nextFaqNumber = FaqCount + 1;

//         const FaqId = `${prefix}${nextFaqNumber}`;

//         return FaqId;

//     } catch (error) {

//         console.error('Error generating Faq ID', error);

//     }

// }
    const messageId = await generateMessageId();

    const customerId = await generateCustomerId();


    const newMessage = new CustomerMessages({

        customerId,
        messageId,
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
router.route("/get/:messageId").get(async(req,res) => {

    let messageId = req.params.messageId;

    // const message = await CustomerMessages.findOne(messageID).then((CustomerMessages) => {

    //     res.status(200).send({status: "Message fetched", CustomerMessages});

    // }).catch((error) => {

    //     console.log(error);
    //     res.status(500).send({status: "Error with get message", error: error.message});

    // })

    try{

        const message = await CustomerMessages.findOne({messageId: messageId});

        if(!message) {

            return res.status(404).send({status: "Message not found"});

        }

        res.status(200).send({status: "Message fetched", message: message});

    } catch(error) {

        console.log(error.message);
        res.status(500).send({status: "Error with fetching message", error: error.message});

    }

});





//UPDATE
//http: //localhost:8070/CustomerMessages/update/
router.route("/update/:messageId").put(async(req,res) => {

    let messageId = req.params.messageId;
    
    const{ message, date} = req.body;

    const updateField = {

        message,
        date

    };

    // const update = await CustomerMessages.findOneAndUpdate({messageID: messageId}, updateMessage).then(() => {

    //     res.status(200).send({status: "Message updated"});

    // }).catch((error) => {

    //     console.log(error);
    //     res.status(500).send({status: "Error with updating data"});

    // })


    try {

        const updateMessage = await CustomerMessages.findOneAndUpdate({messageId: messageId}, updateField, {new: true});


        if(!updateMessage) {

            return res.status(404).send({status: "Message not found"});

        }

        res.status(200).send({status: "Message Updated", updateMessage: updateMessage});


    } catch (error) {

        console.error("Error with updating message", error);
        res.status(500).send({status: "Server Error"});

    }

})





//DELETE
//http: //localhost:8070/CustomerMessages/delete/
router.route("/delete/:messageId").delete(async(req,res) => {

    let messageId = req.params.messageId;

    try{

        const message = await CustomerMessages.findOne({messageId: messageId});

        if(!message) {
            return res.status(404).send({status: "Message not found"});
        }

        await CustomerMessages.findOneAndDelete({messageId: messageId});

        res.status(200).send({status: "Message Deleted"});

    } catch(error) {

        console.error("Error with deleting Message", error);
        res.status(500).send({status: "Server Error", error: error.message});

    }

})




module.exports = router;