const router = require("express").Router();
const Leave = require("../../Models/Yasiru/Leave");

router.route("/add").post((req, res) => {
    const { Employee_ID, date, type, email } = req.body;

    const newLeave = new Leave({
        Employee_ID,
        date,
        type,
        email,
        
    });

    newLeave.save()
        .then(() => {
            res.json("Leave request added successfully");
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json("Error: Unable to add leave request");
        });
});

router.route("/all").get((req, res)=>{

    Leave.find().then((Leaves)=>{
        res.json(Leaves)
    }).catch((err)=>{ 
        console.log(err)
    })

})

router.route("/delete/:Employee_ID").delete(async(req,res) =>{
    let Employee_ID = req.params.Employee_ID;

    await Leave.findOneAndDelete({ Employee_ID }).then(() =>{
        res.status(200).send({status:"Massege deleted"})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete Messege",error:err.message});
    })
})


module.exports = router;
