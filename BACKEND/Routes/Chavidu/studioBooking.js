const router = require("express").Router();
const StudioBooking = require("../../Models/Chavidu/studioBookingModel");
const IncomeTable = require("../../Models/pulasthi-models/Income");
const nodemailer = require("nodemailer")

// Function to send confirmation email
async function sendConfirmationEmail(email, bookingDetails) {
    try {
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
            text: `Dear ${bookingDetails.name},\n\nYour booking has been confirmed. Details:\nService: ${bookingDetails.StudioPackage}\nAmount: ${bookingDetails.amount}\n\nThank you for choosing us!\n\nBest regards,\nStudio Nishan Team`
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Error sending email:", error);
    }
}

// Insert route
router.post("/makebooking", async (req, res) => {
    const { name, email, contactNumber, date, sid, StudioPackage, amount, photographer } = req.body;

    try {
        const newBooking = new StudioBooking({ name, email, contactNumber, date, sid, StudioPackage, amount, photographer });
        await newBooking.save();

        const newSalonIncome = new IncomeTable({ incomeId: sid, amount, date, category: StudioPackage });
        await newSalonIncome.save();

        // Send confirmation email
        await sendConfirmationEmail(email, { name, StudioPackage, amount });

        res.json("Booking Added");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Read route - get all booking data
router.get("/studiobookings", async (req, res) => {
    try {
        const bookings = await StudioBooking.find();
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Get specific booking
router.get("/getBooking/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const booking = await StudioBooking.findById(id);
        if (!booking) {
            return res.status(404).send("Booking not found");
        }
        res.json(booking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Update route
router.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const { name, email, contactNumber, date, sid, StudioPackage, amount, photographer } = req.body;

    try {
        const updatedBooking = await StudioBooking.findByIdAndUpdate(id, { name, email, contactNumber, date, sid, StudioPackage, amount, photographer }, { new: true });
        if (!updatedBooking) {
            return res.status(404).send("Booking not found");
        }
        res.json(updatedBooking);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Delete route
router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const deletedBooking = await StudioBooking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).send("Booking not found");
        }
        res.send("Booking deleted");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

router.delete("/cancel/:id", async (req, res) => {
    const id = req.params.id;

    try {
        // Retrieve the booking from the database
        const booking = await StudioBooking.findById(id);
        if (!booking) {
            return res.status(404).send("Booking not found");
        }

        // Calculate the time difference between booking creation date and current date
        const creationDate = booking.createdAt;
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - creationDate.getTime();
        const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days

        // Check if the booking can be canceled
        if (daysDifference <= 2) {
            // If within two days, cancel the booking and charge 50% to income table
            const cancellationCharge = booking.amount * 0.5; // Calculate cancellation charge
            const newIncomeEntry = new IncomeTable({
                incomeId: booking.sid,
                amount: cancellationCharge,
                date: currentDate,
                category: "Cancellation Charge"
            });
            await newIncomeEntry.save(); // Save cancellation charge to income table
            await StudioBooking.findByIdAndDelete(id); // Delete the booking
            return res.json("Booking canceled successfully. 50% cancellation charge applied.");
        } else {
            // If more than two days, cancel without charge
            await StudioBooking.findByIdAndDelete(id);
            return res.json("Booking canceled successfully.");
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// Check availability
router.get("/checkAvailability", async (req, res) => {
    const { date } = req.query;

    try {
        // Check if there are any bookings for the specified date
        const bookings = await StudioBooking.find({ date: date });

        // If there are no bookings for the date, it's available
        if (bookings.length === 0) {
            res.json({ available: true });
        } else {
            res.json({ available: false });
        }
    } catch (error) {
        console.error("Error checking availability:", error);
        res.status(500).send("Server Error");
    }
});

// Route to get bookings by email
router.get("/bookings/:email", async (req, res) => {
    const email = req.params.email;

    try {
        // Find bookings based on the email
        const bookings = await StudioBooking.find({ email: email });
        res.json(bookings);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;


module.exports = router;
