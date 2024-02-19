const router = require("express").Router();
let SalonBooking = require("../Models/salonBookingModel");

// //Insert booking
// router.route("/makebooking").post((req, res) => {
//     const name = req.body.name;
//     const age = Number(req.body.age);
//     const gender = req.body.gender;
//     const address = req.body.address;

//     const newStudent = new Student({
//         name,
//         age,
//         gender,
//         address
//     })

//     //passing the new student object to the mongo DB through student.js model
//     newStudent.save().then(() => {
//         //if success sending msg in json format to frontend
//         res.json("Student Added");

//     }).catch((err) => {
//         //if unsuccess
//         console.log(err.message);
//     })
// })

// Insert route
router.route("/makebooking").post(async (req, res) => {
    const { name, email, sid, service, amount } = req.body;

    try {
        const newBooking = new SalonBooking({ name,email,sid,service,amount });
        await newBooking.save();
        res.json("Booking Added");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//Read route - get all booking data
router.route("/salonbookings").get((req, res) => {

    SalonBooking.find().then((SalonBooking) => {
        res.json(SalonBooking)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    })
})

//get specific booking
router.route("/getBooking/:id").get(async (req, res) => {
    let bookingID = req.params.id;

    try {
        // Find the booking by ID
        const booking = await SalonBooking.findById(bookingID);

        // Check if booking is found
        if (!booking) {
            return res.status(404).send({ status: "Booking_Not_Found" });
        }

        // Send the booking data to the frontend
        res.status(200).send({ status: "Booking fetched", booking: booking });
    } catch (error) {
        // Handle errors
        console.error("Error fetching booking:", error);
        res.status(500).send({ status: "Internal_Server_Error" });
    }
});


//Update route
router.route("/update/:id").put(async (req, res) => {
    let bookingID = req.params.id;
    const { name, email, sid, service, amount} = req.body;

    const updateBooking = {
        name,
        email,
        sid,
        service,
        amount
    }

    const update = await SalonBooking.findByIdAndUpdate(bookingID, updateBooking).then(() => {
       
        res.status(200).send({ status: "Booking Updated" });

    }).catch(() => {

        console.log(err.message);
        //sending error to frontend
        res.status(500).send({ status: "Error with updating booking" });

    })

})

//Delete route
router.route("/delete/:id").delete(async (req, res) => {
    let bookingID = req.params.id;

    await SalonBooking.findById(bookingID);
    if (!SalonBooking) {
        return res.status(404).send({ status: "Student not found" });
    }

    await SalonBooking.findByIdAndDelete(bookingID).then(() => {

        res.status(200).send({ status: "User deleted" });

    }).catch(() => {

        console.log(err.message);
        res.status(500).send({ status: "Error with deleting booking", error: err.message });
    })
})

module.exports = router;

// // Fetch services from the backend
// axios.get('/api/services')
//     .then(response => {
//         // Extract services from the response data
//         const services = response.data.services;

//         // Get the select element
//         const selectElement = document.getElementById('services');

//         // Populate the select element with services
//         services.forEach(service => {
//             const option = document.createElement('option');
//             option.value = service._id; // Assuming service object has an _id field
//             option.text = service.name; // Assuming service object has a name field
//             selectElement.appendChild(option);
//         });
//     })
//     .catch(error => {
//         console.error('Error fetching services:', error);
//     });
