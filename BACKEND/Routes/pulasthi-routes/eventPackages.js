const EventPackageTable = require("../../Models/pulasthi-models/EventPackage");

const router = require("express").Router();




// Insert route
router.route("/add-eventPackages").post(async (req, res) => {

    //below property names should match column names of EventPackageTable
    //let others know that they have to give my model column names when they destructuring to insert values to my tabels
    //destructuring  
    const{packageId,packageType,date} = req.body;


    try {
        
        const newEvent = new EventPackageTable({
            packageId:packageId,
            packageType:packageType,
            date:date
        });
        await newEvent.save();

        res.json("Event Added");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

//Read route - get all EventPackage data
router.route("/get-invItems").get((req, res) => {

    //from this sort code order of my retrieved budget data will based on createdAt field in descending order(-1)
    EventPackageTable.find().sort({createdAt: -1}).then((packages) => {
        res.json(packages)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get EventPackages", error: err.message });
    })
})




module.exports = router;