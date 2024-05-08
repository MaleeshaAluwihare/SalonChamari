const EmpSalaryTable = require("../../Models/pulasthi-models/EmpSalary");
const ExpenseTable = require("../../Models/pulasthi-models/Expense");

const router = require("express").Router();


//Read route - get all empsalaries data
router.route("/get-empSalary").get((req, res) => {

    //from this sort code order of my retrieved budget data will based on createdAt field in descending order(-1)
    EmpSalaryTable.find().sort({createdAt: -1}).then((emp) => {
        res.json(emp)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get empSalary", error: err.message });
    })
})

//emp salaray eka hadila methanin tma expense table ekata data yanna onne
// API endpoint  to update item price in InventoryItemTable and add an entry in ExpenseTable
router.post('/update-emp-salary', async (req, res) => {
    //destructuring below four properties except quantity bcz expense table only need below four values
    //give the request body names for destructure
    const { empId, empSalary, date, jobRole } = req.body;

    const updateSalary = {salary:empSalary}
    try {
      // Update the inventory item
      const updatedEmpSalary = await EmpSalaryTable.findOneAndUpdate(
        { empId: empId },
        //inventoryItem route eke karata wada wenas widihak
         updateSalary,
        { new: true }
      );
  
      // Create a new expense record
      const newExpense = new ExpenseTable({
        expenseId: empId,
        //LHS should be DB column name and RHS should be name of property which is coming from req.body
        amount: empSalary,
        date: date,
        category: jobRole
      });
      await newExpense.save();
  
      res.status(200).json({ employee: updatedEmpSalary, expense: newExpense });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

module.exports = router;