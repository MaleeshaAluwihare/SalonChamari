const ExpenseTable = require("../../Models/pulasthi-models/Expense");
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
// API endpoint  to update item price in InventoryItemTable and add an entry in ExpenseTable
router.post('/update-item-price', async (req, res) => {
    const { itemId, itemPrice, date, itemType } = req.body;
    try {
      // Update the inventory item
      const updatedInventoryItem = await InventoryItemTable.findOneAndUpdate(
        { itemId: itemId },
        { $set: { itemPrice: itemPrice } },
        { new: true }
      );
  
      // Create a new expense record
      const newExpense = new ExpenseTable({
        //LHS should be DB column name and RHS should be name of property which is coming from req.body
        expenseId: itemId,
        amount: itemPrice,
        date: date,
        category: itemType
      });
      await newExpense.save();
                                  //return updatedItem and new expense
      res.status(200).json({ inventory: updatedInventoryItem, expense: newExpense });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;