const router = require("express").Router();
let StudioBooking = require("../Models/studioBookingModel");


// Insert route
router.route("/makebooking").post(async (req, res) => {
    const { name, email, pid, package, amount, photographer } = req.body;

    try {
        const newBooking = new StudioBooking({ name,email,pid,package,amount,photographer});
        await newBooking.save();
        res.json("Booking Added");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});


//Read route - get all booking data
router.route("/studiobookings").get((req, res) => {

    StudioBooking.find().then((StudioBooking) => {
        res.json(StudioBooking) // Send the found bookings as a JSON response

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
        const booking = await StudioBooking.findById(bookingID);

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
    const { name, email, pid, package, amount, photographer} = req.body;

    const updateBooking = {
        name,
        email,
        pid,
        package,
        amount,
        photographer
    }

    const update = await StudioBooking.findByIdAndUpdate(bookingID, updateBooking).then(() => {
       
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

    await StudioBooking.findById(bookingID);
    if (!SalonBooking) {
        return res.status(404).send({ status: "Student not found" });
    }

    await StudioBooking.findByIdAndDelete(bookingID).then(() => {

        res.status(200).send({ status: "User deleted" });

    }).catch(() => {

        console.log(err.message);
        res.status(500).send({ status: "Error with deleting booking", error: err.message });
    })
})

module.exports = router;