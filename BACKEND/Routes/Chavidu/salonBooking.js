const router = require("express").Router();
let SalonBooking = require("../../Models/Chavidu/salonBookingModel");
// const nodemailer = require("nodemailer");


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


// // Insert route
// router.route("/makebooking").post(async (req, res) => {
//     const { name, email, sid, service, amount } = req.body;

//     try {
//         const newBooking = new SalonBooking({ name,email,sid,service,amount });
//         await newBooking.save();

//         // const newTable = new Studio({ 
//         //     id: sid,
//         //     price: amount
//         // });
//         // await newTable.save();

//         // email
//         // await sendConfirmationEmail(email, { name, service, amount });

//         res.json("Booking Added");
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send("Server Error");
//     }
// });

router.route("/makebooking").post(async (req, res) => {
    const { name, email, sid, service, amount, date, time } = req.body;

    try {
        const newBooking = new SalonBooking({ name, email, sid, service, amount, date, time });
        await newBooking.save();

        // Send confirmation email
        // await sendConfirmationEmail(email, { name, service, amount });

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
router.route("/getBookingById/:bookingID").get(async (req, res) => {
    let bookingID = req.params.bookingID;

    try {
        // Find the booking by custom ID
        const booking = await SalonBooking.findOne({ sid: bookingID });

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



// Update route
router.route("/update/:id").put(async (req, res) => {
    let bookingID = req.params.id;
    const { name, email, service, amount } = req.body;

    const updateBooking = {
        name,
        email,
        service,
        amount
    };

    try {
        // Find and update the booking by ID
        const updatedBooking = await SalonBooking.findOneAndUpdate({ sid: bookingID }, updateBooking, { new: true });

        // Check if booking is found and updated
        if (!updatedBooking) {
            return res.status(404).send({ status: "Booking_Not_Found" });
        }

        // Send the updated booking data to the frontend
        res.status(200).send({ status: "Booking Updated", booking: updatedBooking });
    } catch (error) {
        // Handle errors
        console.error("Error updating booking:", error);
        res.status(500).send({ status: "Internal_Server_Error" });
    }
});

//Delete route
router.route("/delete/:id").delete(async (req, res) => {
    let bookingID = req.params.id;

    try {
        // Find the booking by ID
        const booking = await SalonBooking.findOne({ sid: bookingID });

        // Check if booking exists
        if (!booking) {
            return res.status(404).send({ status: "Booking_Not_Found" });
        }

        // Delete the booking
        await SalonBooking.findOneAndDelete({ _id: bookingID });

        // Send success response
        res.status(200).send({ status: "Booking deleted" });
    } catch (error) {
        // Handle errors
        console.error("Error deleting booking:", error);
        res.status(500).send({ status: "Internal_Server_Error", error: error.message });
    }

});
async function sendConfirmationEmail(email, bookingDetails) {
    // Create a transporter object using SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        port:587,
        auth: {
            user: 'sliititpt105@gmail.com', // Your Gmail email address
            pass: 'projectITPt105' // Your Gmail password
        }
    });

    // Define email content
    console.log("To email>>>", email);
    let mailOptions = {
        from: 'sliititpt105@gmail.com', // Sender address
        to: email, // Receiver address
        subject: 'Booking Confirmation', // Subject line
        text: `Dear ${bookingDetails.name},\n\nYour booking has been confirmed. Details:\nService: ${bookingDetails.service}\nAmount: ${bookingDetails.amount}\n\nThank you for choosing us!\n\nBest regards,\nYour Salon Team`
    };

    // Send the email
    await transporter.sendMail(mailOptions);
}

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



