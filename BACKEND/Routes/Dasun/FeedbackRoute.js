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


module.exports = router;