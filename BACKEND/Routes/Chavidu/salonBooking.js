// Import necessary modules
const express = require("express");
const router = express.Router();
const SalonBooking = require("../../Models/Chavidu/salonBookingModel");
const IncomeTable = require("../../Models/pulasthi-models/Income")
let SalonBooking = require("../../Models/Chavidu/salonBookingModel");
let Studio = require("../../Models/Chavidu/studioBookingModel");
const nodemailer = require("nodemailer");

// Endpoint to make a booking
router.route("/makebooking").post(async (req, res) => {
    const { name, email, salonId, service, amount, date, time } = req.body;

    try {
        // Create a new booking instance
        const newBooking = new SalonBooking({ name, email, salonId, service, amount, date, time });

        // Save the new booking to the database
        await newBooking.save();

        // Create a new instance of IncomeTable with salonId as incomeId
        const newSalonIncome = new IncomeTable({ incomeId: salonId, amount, date, category:service }); 

        // Save the new income entry to the database
        await newSalonIncome.save();

        // Send confirmation email to the user
        await sendConfirmationEmail(email, { name, service, amount });

        // Respond with success message
        res.json("Booking Added");
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Server Error");
    }
});
// Endpoint to get all bookings
router.route("/salonbookings").get((req, res) => {
    SalonBooking.find()
        .then((bookings) => {
            res.json(bookings);
        })
        .catch((error) => {
            console.error(error.message);
            res.status(500).send({ status: "Error with getting bookings", error: error.message });
        });
});

// Endpoint to get a specific booking by ID
router.route("/getBookingById/:bookingID").get(async (req, res) => {
    const bookingID = req.params.bookingID;

    try {
        const booking = await SalonBooking.findOne({ salonId: bookingID });

        if (!booking) {
            return res.status(404).send({ status: "Booking_Not_Found" });
        }

        res.status(200).send({ status: "Booking fetched", booking });
    } catch (error) {
        console.error("Error fetching booking:", error);
        res.status(500).send({ status: "Internal_Server_Error" });
    }
});

// Endpoint to update a booking
router.route("/update/:id").put(async (req, res) => {
    const bookingID = req.params.id;
    const { name, email, service, amount } = req.body;

    const updateBooking = {
        name,
        email,
        service,
        amount
    };

    try {
        const updatedBooking = await SalonBooking.findOneAndUpdate({ salonId: bookingID }, updateBooking, { new: true });

        if (!updatedBooking) {
            return res.status(404).send({ status: "Booking_Not_Found" });
        }

        res.status(200).send({ status: "Booking Updated", booking: updatedBooking });
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).send({ status: "Internal_Server_Error" });
    }
});

// Endpoint to delete a booking
router.route("/delete/:id").delete(async (req, res) => {
    const bookingID = req.params.id;

    try {
        const booking = await SalonBooking.findOne({ salonId: bookingID });

        if (!booking) {
            return res.status(404).send({ status: "Booking_Not_Found" });
        }

        await SalonBooking.findOneAndDelete({ _id: bookingID });

        res.status(200).send({ status: "Booking deleted" });
    } catch (error) {
        console.error("Error deleting booking:", error);
        res.status(500).send({ status: "Internal_Server_Error", error: error.message });
    }
});

// Function to send confirmation email
async function sendConfirmationEmail(email, bookingDetails) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: "sliititpt105@gmail.com", // Replace with your Gmail email address
            pass: "qzfn juro ifbt ncgf" // Replace with your Gmail password
        }
    });

    const mailOptions = {
        from: "sliititpt105@gmail.com",
        to: email,
        subject: "Booking Confirmation",
        text: `Dear ${bookingDetails.name},\n\nYour booking has been confirmed. Details:\nService: ${bookingDetails.service}\nAmount: ${bookingDetails.amount}\n\nThank you for choosing us!\n\nBest regards,\nYour Salon Team`
    };

    await transporter.sendMail(mailOptions);
}

//check avaialability
const MAX_BOOKINGS_PER_HOUR = 2; // Define the maximum number of bookings per hour

router.get("/checkAvailability", async (req, res) => {
    const { date, time } = req.query;

    try {
        // Check the count of bookings for the specified date and time
        const bookingCount = await SalonBooking.countDocuments({ date: date, time: time });

        // If the count is less than the maximum allowed bookings, it's available
        if (bookingCount < MAX_BOOKINGS_PER_HOUR) {
            res.json({ available: true });
        } else {
            res.json({ available: false });
        }
    } catch (error) {
        console.error("Error checking availability:", error);
        res.status(500).send("Server Error");
    }
});

//calculate date by week
router.get("/bookingsByWeek", async (req, res) => {
    try {
        // Calculate the start and end dates for the time period (e.g., 30 days)
        const startDate = new Date();
        const endDate = new Date();
        endDate.setDate(startDate.getDate() + 30);

        // Fetch bookings within the specified time period
        const bookings = await SalonBooking.find({ date: { $gte: startDate, $lte: endDate } });

        // Process bookings data to count bookings for each day of the week
        const bookingCounts = [0, 0, 0, 0, 0, 0, 0]; // Initialize counts for each day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)

        bookings.forEach(booking => {
            const dayOfWeek = booking.date.getDay(); // Get day of the week (0-6)
            bookingCounts[dayOfWeek]++; // Increment count for the corresponding day of the week
        });

        // Send the booking counts data
        res.json({ bookingCounts });
    } catch (error) {
        console.error("Error fetching bookings by week:", error);
        res.status(500).send("Server Error");
    }
});



module.exports = router;
