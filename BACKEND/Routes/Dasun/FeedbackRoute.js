const router = require("express").Router();
let Feedbacks = require("../../Models/Dasun/FeedbackModel");






//ADD
//http: //localhost:8070/Feedbacks/add
router.route("/add").post(async (req,res) => {

    const{feedbackId, bookingId, category, content, sendDate} = req.body;

    try{

        const newFeedback = new Feedbacks({feedbackId, bookingId, category, content, sendDate});
        await newFeedback.save();

        res.json("Feedback Added");

    } catch(err) {

        console.error(err.message);
        res.status(500).send("Error with adding Feedback");

    }


});




//DISPLAY
//http: //localhost:8070/Feedbacks/display
router.route("/display").get((req,res) => {

    Feedbacks.find().then((Feedbacks) => {

        res.json(Feedbacks);

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({status: "Error with getting Feedbacks"});

    })

})





//GetOne
//http: //localhost:8070/Feedbacks/get/
router.route("/get/:id").get(async(req,res) => {

    let feedbackId = req.params.id;


    const feedback = await Feedbacks.findById(feedbackId).then((Feedbacks) => {

        // if (!feedback) {

        //     return res.status(404).send({status: "Feedback not found"});

        // }

        res.status(200).send({status: "Feedback fetched", Feedbacks});


    
    }).catch((error) => {

        console.log(err.message)
        res.status(500).send({status: "Error with fetching feedback", error: error.message});

    })

})




//UPDATE
//http: //localhost:8070/Feedbacks/update/
router.route("/update/:id").put(async(req,res) => {

    let feedbackID = req.params.id;
    
    const{feedbackId, bookingId, category, content, sendDate} = req.body;

    const updateFeedback = {

        feedbackId,
        bookingId,
        category, 
        content,
        sendDate

    }

    const update = await Feedbacks.findByIdAndUpdate(feedbackID, updateFeedback).then(() => {

        res.status(200).send({status: "Feedback updated"});

    }).catch((error) => {

        console.log(error);
        res.status(500).send({status: "Error with updating Feedback"});

    })

})





//DELETE
//http: //localhost:8070/Feedbacks/delete/
router.route("/delete/:id").delete(async(req,res) => {

    let feedbackID = req.params.id;

    await Feedbacks.findByIdAndDelete(feedbackID).then(() => {

        res.status(200).send({status: "Feedback deleted"});

    }).catch((error) => {

        console.log(error);
        res.status(500).send({status: "Error with deleting feedback", error: error.message});

    })

})



module.exports = router;