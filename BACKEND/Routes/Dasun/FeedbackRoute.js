const router = require("express").Router();
let Feedbacks = require("../../Models/Dasun/FeedbackModel");



async function generateFeedbackId() {

    const prefix = 'FD100';

    try {

        const FeedbackCount = await Feedbacks.countDocuments();

        const nextFeedbackNumber = FeedbackCount + 1;

        const FeedbackId = `${prefix}${nextFeedbackNumber}`;

        return FeedbackId;

    } catch (error) {

        console.error('Error generating Feedback ID', error);

    }

}


async function generateBookingId() {

    const prefix = 'BK100';

    try {

        const FeedbackCount = await Feedbacks.countDocuments();

        const nextFeedbackNumber = FeedbackCount + 1;

        const BookingId = `${prefix}${nextFeedbackNumber}`;

        return BookingId;

    } catch (error) {

        console.error('Error generating Bookig ID', error);

    }

}




//ADD
//http: //localhost:8070/Feedback/add
router.route("/add").post(async (req,res) => {

    const{category, content, rating, sendDate} = req.body;

    const feedbackId = await generateFeedbackId();

    const bookingId = await generateBookingId();

    try{

        const newFeedback = new Feedbacks({feedbackId, bookingId, category, content, rating, sendDate});
        await newFeedback.save();

        res.json("Feedback Added");

    } catch(err) {

        console.error(err.message);
        res.status(500).send("Error with adding Feedback");

    }


});




//DISPLAY
//http: //localhost:8070/Feedback/display
router.route("/display").get((req,res) => {

    Feedbacks.find().then((Feedbacks) => {

        res.json(Feedbacks);

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({status: "Error with getting Feedbacks"});

    })

})





//GetOne
//http: //localhost:8070/Feedback/get/
router.route("/get/:feedbackId").get(async(req,res) => {

    let feedbackId = req.params.feedbackId;

    try{

    const feedback = await Feedbacks.findOne({feedbackId: feedbackId});

        if (!feedback) {

            return res.status(404).send({status: "Feedback not found"});

        }

        res.status(200).send({status: "Feedback fetched", feedback: feedback});


    
    } catch(error) {

        console.log(error.message)
        res.status(500).send({status: "Error with fetching feedback", error: error.message});

    }

});




//UPDATE
//http: //localhost:8070/Feedback/update/
router.route("/update/:feedbackId").put(async(req,res) => {

    let feedbackID = req.params.feedbackId;
    
    const{feedbackId, bookingId, category, content, rating, sendDate} = req.body;

    const updateFeedback = {

        feedbackId,
        bookingId,
        category, 
        content,
        rating,
        sendDate

    }

    const update = await Feedbacks.findOneAndUpdate({feedbackID: feedbackId}, updateFeedback).then(() => {

        res.status(200).send({status: "Feedback updated"});

    }).catch((error) => {

        console.log(error);
        res.status(500).send({status: "Error with updating Feedback"});

    })

})





//DELETE
//http: //localhost:8070/Feedback/delete/
router.route("/delete/:feedbackId").delete(async(req,res) => {

    let feedbackId = req.params.feedbackId;

    try{

        const feedback = await Feedbacks.findOne({feedbackId: feedbackId});

        if(!feedback) {
            return res.status(404).send({status: "Feedback not found"});
        }

        await Feedbacks.findOneAndDelete({feedbackId: feedbackId});

        res.status(200).send({status: "Feedback Deleted"});

    } catch(error) {

        console.error("Error with deleting Feedback", error);
        res.status(500).send({status: "Server Error", error: error.message});

    }

})



module.exports = router;