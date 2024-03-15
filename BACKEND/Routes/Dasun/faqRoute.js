const router = require("express").Router();

let Faq = require("../Models/Dasun/FaqModel");




//ADD
//http: //localhost:8070/FaqModel/add
router.route("/add").post((req, res) => {

    const question = req.body.question;
    const answer = req.body.answer;

    const newFaq = new Faq({

        question,
        answer

    })

    newFaq.save().then(() => {

        res.json("FAQ Added");

    }).catch(() => {

        console.log(err);

    })

})





//DISPLAY
//http: //localhost:8070/FaqModel
router.route("/").get((req, res) => {

    Faq.find().then((Faqs) => {

        res.json(Faqs);

    }).catch((err) => {

        console.log(err);

    })

})





//UPDATE
//http: //localhost:8070/FaqModel/update/:faqid
router.route("/update/:faqid").put(async (req, res) => {

    let faqId = req.params.faqid;
    const {question, answer} = req.body;

    const updateFaq = {
        question,
        answer
    }

    const update = await Faq.findByIdAndUpdate(faqId, updateFaq).then(() => {

        res.status(200).send({status : "Faq Updated"});

    }).catch((err) => {

        console.log(err);
        res.status(500).send({sttus : "Error with updating data", error: err.message});

    })


})





//DELETE
//http: //localhost:8070/FaqModel/delete/:faqid
router.route("/delete/:faqid").delete(async (req, res) => {

    let faqId = req.params.faqid;

    await Faq.findByIdAndDelete(faqId).then(() => {

        res.status(200).send({status: "Faq Deleted"});

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({status: "Error with delete faq", error: err.message});

    })

})






//GetOnlyOne
//http: //localhost:8070/FaqModel/get/:faqid
router.route("/get/:faqid").get(async (req, res) => {

    let faqId = req.params.faqid;
    
    const faq = await Faq.findById(faqId).then(() => {

        res.status(200).send({status: "Faq Fetched", faq: faq})

    }).catch(() => {

        console.log(err.message);
        res.status(500).send({status: "Error with get faq", error:err.message});

    })

})






module.exports = router;