const router = require("express").Router();

let Faq = require("../../Models/Dasun/FaqModel");




//ADD
//http: //localhost:8070/FaqModel/add
router.route("/add").post((req, res) => {

    const faqId = req.body.faqId;
    const question = req.body.question;
    const answer = req.body.answer;

    const newFaq = new Faq({

        faqId,
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
router.route("/update/:faqId").put(async (req, res) => {

    let faqId = req.params.faqId;
    const {question, answer} = req.body;

    try{
        const updateFaq = {
            question,
            answer
        }

        const filter = {faqId : faqId};

        const update = await Faq.findOneIdAndUpdate(filter, updateFaq,{
            new: true
        });

        if(!updateFaq){
            return res.status(404).json({message: "Faq not found"});
        }

        await updateFaq.save();

        res.json({message: "Faq updated"});

    }catch(error){

        console.error(error.message);
        res.status(500).send({status: "Error with updating data"});

    }

});





//DELETE
//http: //localhost:8070/FaqModel/delete/:faqid
router.route("/delete/:faqId").delete(async (req, res) => {

    let faqId = req.params.faqId;

    await Faq.findByIdAndDelete(faqId).then(() => {

        res.status(200).send({status: "Faq Deleted"});

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({status: "Error with delete faq", error: err.message});

    })

})






//GetOnlyOne
//http: //localhost:8070/FaqModel/get/:faqid
router.route("/get/:faqId").get(async (req, res) => {

    try{

        const faqId = req.params.faqId;

        const faq = await Faq.findOne({faqId: faqId});

        if(!faq){
            return res.status(404).send({status: "Faq not found"});
        }

        res.status(200).send({status: "Faq fetched", faq: faq});

    }catch(err){

        console.error(err.message);
        res.status(500).send({status: "Error with getting faq", error: err.message});

    }

});




module.exports = router;