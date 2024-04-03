const router = require("express").Router();
let Faqs = require("../../Models/Dasun/FaqsModel");





//ADD
//http: //localhost:8070/Faqs/add
router.route("/add").post((req,res) => {

    const question = req.body.Question;
    const answer = req.body.Answer;

    const newFaq = new Faqs({

        question,
        answer

    })

    newFaq.save().then(() => {

        res.json("New Faq Added")

    }).catch((err) => {

        res.status(500).json({error : "Failed to add faq"})

    })

})


module.exports = router;