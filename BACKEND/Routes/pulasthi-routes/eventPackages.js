const EventPackageTable = require("../../Models/pulasthi-models/EventPackage");

const router = require("express").Router();



//devinda code
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
router.route("/get-eventPackages").get((req, res) => {

    //from this sort code order of my retrieved budget data will based on createdAt field in descending order(-1)
    EventPackageTable.find().sort({createdAt: -1}).then((packages) => {
        res.json(packages)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get EventPackages", error: err.message });
    })
})

//my code
// Update route
router.route("/update-eventPackages/:packageId").put(async (req, res) => {
    let packageId = req.params.packageId;
    const {profit,cost} = req.body;

    const updateEventPackage = {
        profit,
        cost
    };

    try {
        // Find and update the package by ID
        //{ new: true } option specifies that the updated document should be returned after the update operation.
        const updatedEventPackage = await EventPackageTable.findOneAndUpdate({ packageId: packageId},updateEventPackage, { new: true });

        // Check if event is found and updated
        if (!updatedEventPackage) {
            return res.status(404).send({ status: "Event_Not_Found" });
        }

        // Send the updated event data to the frontend
        res.status(200).send({ status: "EventPackage Updated", updatedEventPackage: updatedEventPackage });
    } catch (error) {
        // Handle errors
        console.error("Error updating EventPackage:", error);
        res.status(500).send({ status: "Internal_Server_Error" });
    }
});




module.exports = router;