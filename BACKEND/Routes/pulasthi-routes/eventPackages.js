const EventPackageTable = require("../../Models/pulasthi-models/EventPackage");

const router = require("express").Router();




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