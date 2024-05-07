const router = require("express").Router();
let Replies = require("../../Models/Dasun/MessageReplyModel");
let Messages = require("../../Models/Dasun/CustomerMessageModel");






//ADD
//http: //localhost:8070/MessageReplies/add
router.route("/add").post(async (req,res) => {

    const{replyId, messageId, reply, date} = req.body;

    try{

        const messageExists = await Messages.findById(messageId);

        if(!messageExists){

            return res.status(404).send({status: "Message not found"});

        }

        const newReply = new Replies({replyId, messageId, reply, date});
        await newReply.save();

        res.json("Reply Added");

    } catch(err) {

        console.error(err.message);
        res.status(500).send("Error with adding Reply");

    }


});




//DISPLAY
//http: //localhost:8070/MessageReplies/display
router.route("/display").get((req,res) => {

    Replies.find().then((Replies) => {

        

        res.json(Replies);

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({status: "Error with getting Replies"});

    })

})





//GetOne
//http: //localhost:8070/MessageReplies/get/
router.route("/get/:id").get(async(req,res) => {

    let replyID = req.params.id;


    const reply = await Replies.findById(replyID).then((Replies) => {

        // if (!feedback) {

        //     return res.status(404).send({status: "Feedback not found"});

        // }

        res.status(200).send({status: "Reply fetched", Replies});


    
    }).catch((error) => {

        console.log(err.message)
        res.status(500).send({status: "Error with fetching reply", error: error.message});

    })

})




//UPDATE
//http: //localhost:8070/MessageReplies/update/
router.route("/update/:id").put(async(req,res) => {

    let replyID = req.params.id;
    
    const{replyId, messageId, reply, date} = req.body;

    const updateReply = {

        replyId,
        messageId, 
        reply, 
        date

    }

    const update = await Replies.findByIdAndUpdate(replyID, updateReply).then(() => {

        res.status(200).send({status: "Reply updated"});

    }).catch((error) => {

        console.log(error);
        res.status(500).send({status: "Error with updating Reply"});

    })

})





//DELETE
//http: //localhost:8070/MessageReplies/delete/
router.route("/delete/:id").delete(async(req,res) => {

    let replyID = req.params.id;

    await Replies.findByIdAndDelete(replyID).then(() => {

        res.status(200).send({status: "Reply deleted"});

    }).catch((error) => {

        console.log(error);
        res.status(500).send({status: "Error with deleting reply", error: error.message});

    })

})



module.exports = router;