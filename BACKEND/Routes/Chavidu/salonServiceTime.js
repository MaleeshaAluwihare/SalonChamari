// Backend: router.js
const router = require("express").Router();
const salServiceTime = require("../../Models/Chavidu/salonServiceTime");

router.route("/makebooking/salonTable/:selectedDate").get(async (req, res) => {
    const { selectedDate } = req.params;

    try {
        // Convert selectedDate string to Date object
        const date = new Date(selectedDate);

        // Assuming you want to find bookings for the entire day, from midnight to midnight
        // You can adjust the range according to your specific requirements
        const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);

        const bookings = await salServiceTime.find({
            date: {
                $gte: startOfDay,
                $lt: endOfDay
            }
        });
        res.json(bookings);
    } catch (err) {
        console.error('Error fetching salon bookings:', err);
        res.status(500).json({ message: 'Error fetching salon bookings' });
    }
});

module.exports = router;
