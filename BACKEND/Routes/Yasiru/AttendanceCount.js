const router =require("express").Router();
let Attendacecount = require("../../Models/Yasiru/Attendacecount")


router.route("/add").post((req,res)=>{
    

    const empId = req.body.empId;
    const attendance = req.body.attendance;
    const jobRole = req.body.jobRole;
    const date = req.body.date
 
    //const Attendance = Number(req.body.Attendance);

 

    const AttendanceCount = new Attendacecount({
        empId,
        attendance,
        jobRole,
        date
      
        //Attendance
    })

    AttendanceCount.save().then(()=>{
        res.json("Employee added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req, res)=>{

    Attendacecount.find().then((employees)=>{
        res.json(employees)
    }).catch((err)=>{ 
        console.log(err)
    })

})

//delete
router.route("/delete/:empId").delete(async(req,res) =>{
    let empId = req.params.empId;

    await Attendacecount.findOneAndDelete({ empId }).then(() =>{
        res.status(200).send({status:"Employee deleted"})
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete employee",error:err.message});
    })
})

/*pie chart
app.get("/pie-chart-data", async (req, res) => {
    try {
        // Aggregate the data to get the count of items under each service name
        const serviceData = await Service.aggregate([
            {
                $group: {
                    empId: "$Employee_ID",
                    attendance: { $sum: 1 }
                }
            }
        ]);

        // Calculate the total number of items
        const totalItems = await Service.countDocuments();

        // Calculate the percentage of items for each service name
        const serviceDataWithPercentage = serviceData.map(service => ({
            serviceName: service._id,
            itemCount: service.itemCount,
            percentage: ((service.itemCount / totalItems) * 100).toFixed(2)
        }));

        // Send data to the client
        res.json(serviceDataWithPercentage);
        
    } catch (error) {
        console.error("Error fetching service data for pie chart:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});*/
module.exports = router;