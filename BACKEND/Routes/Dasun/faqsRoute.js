const router = require("express").Router();
let Faqs = require("../../Models/Dasun/FaqsModel");





//ADD
//http: //localhost:8070/Faqs/add
router.route("/add").post((req,res) => {

    const question = req.body.question;
    const answer = req.body.answer;

    const newFaq = new Faqs({

        question,
        answer

    })

    newFaq.save().then(() => {

        res.json("New Faq Added")

    }).catch((err) => {

        res.status(500).json({error : "Failed to add faq"})
        console.log(err);

    })

})



//DISPLAY
//http: //localhost:8070/Faqs/display
router.route("/display").get((req,res) => {

    Faqs.find().then((Faqs) => {

        res.json(Faqs);

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({status: "Error with get faqs", error: err.message});

    })

})




//GetOne
//http: //localhost:8070/Faqs/get/
router.route("/get/:id").get(async(req,res) => {

    let faqId = req.params.id;

    const faq = await Faqs.findById(faqId).then((Faqs) => {

        res.status(200).send({status: "Faq fetched", Faqs});

    }).catch((error) => {

        console.log(error);
        res.status(500).send({status: "Error with get faq", error: error.message});

    })

})





//UPDATE
//http: //localhost:8070/Faqs/update/
router.route("/update/:id").put(async(req,res) => {

    let faqId = req.params.id;
    
    const{question, answer} = req.body;

    const updateFaq = {

        question,
        answer

    }

    const update = await Faqs.findByIdAndUpdate(faqId, updateFaq).then(() => {

        res.status(200).send({status: "Faq updated"});

    }).catch((error) => {

        console.log(error);
        res.status(500).send({status: "Error with updating data"});

    })

})





//DELETE
//http: //localhost:8070/Faqs/delete/
router.route("/delete/:id").delete(async(req,res) => {

    let faqId = req.params.id;

    await Faqs.findByIdAndDelete(faqId).then(() => {

        res.status(200).send({status: "Faq deleted"});

    }).catch((error) => {

        console.log(error);
        res.status(500).send({status: "Error with deleting faq", error: error.message});

    })

})




module.exports = router;