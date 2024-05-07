const router = require("express").Router();
let Faqs = require("../../Models/Dasun/FaqsModel");


async function generateFaqId() {

    const prefix = 'FQ100';

    try {

        const FaqCount = await Faqs.countDocuments();

        const nextFaqNumber = FaqCount + 1;

        const FaqId = `${prefix}${nextFaqNumber}`;

        return FaqId;

    } catch (error) {

        console.error('Error generating Faq ID', error);

    }

}



//ADD
//http: //localhost:8070/Faqs/add
router.route("/add").post(async (req,res) => {

    const {question, answer} = req.body;

    const faqId = await generateFaqId();

    try{

        const newFaq = new Faqs({

            faqId,
            question,
            answer
    
        });
    
        await newFaq.save();
        res.json("New Faq Added");

    } catch(err) {

        res.status(500).json({err : "Failed to add faq"})
        console.log(err.message);

    }

});


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
router.route("/get/:faqId").get(async(req,res) => {

    let faqId = req.params.faqId;

    try{

        const faq = await Faqs.findOne({ faqId: faqId });


        if(!faq) {
            
            return res.status(404).send({ status: "FAQ not found" });

        }

        res.status(200).send({status: "FAQ fetched", faq: faq});

    } catch (error) {

        console.error("Error fetching faq", error);
        res.status(500).send({ status: "Server error" });

    }

});





//UPDATE
//http: //localhost:8070/Faqs/update/
router.route("/update/:faqId").put(async (req,res) => {

    let faqId = req.params.faqId;

    const { question, answer } = req.body;

    const updateField = {

        question,
        answer

    };

    try {

        const updateFaq = await Faqs.findOneAndUpdate({faqId: faqId}, updateField, {new: true});


        if(!updateFaq) {

            return res.status(404).send({status: "Faq not found"});

        }

        res.status(200).send({status: "Faq Updated", updateFaq: updateFaq});


    } catch (error) {

        console.error("Error with updating faq", error);
        res.status(500).send({status: "Server Error"});

    }

});





//DELETE
//http: //localhost:8070/Faqs/delete/
router.route("/delete/:faqId").delete(async (req,res) => {

    let faqId = req.params.faqId;

    try{

        const faq = await Faqs.findOne({faqId: faqId});

        if(!faq) {
            return res.status(404).send({status: "Faq not found"});
        }

        await Faqs.findOneAndDelete({faqId: faqId});

        res.status(200).send({status: "Faq Deleted"});

    } catch(error) {

        console.error("Error with deleting Faq", error);
        res.status(500).send({status: "Server Error", error: error.message});

    }

});




module.exports = router;