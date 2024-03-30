const InventoryItemTable = require("../../Models/pulasthi-models/InventoryItem");

const router = require("express").Router();





//Read route - get all inventoryitem data
router.route("/get-invItems").get((req, res) => {

    //from this sort code order of my retrieved budget data will based on createdAt field in descending order(-1)
    InventoryItemTable.find().sort({createdAt: -1}).then((items) => {
        res.json(items)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get inventoryItems", error: err.message });
    })
})

//items price eka hadila methanin tma expense table ekata data yanna onne

module.exports = router;