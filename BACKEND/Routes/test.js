// const router = require("express").Router();
// let Student = require("../models/Student");

// //Insert route
// router.route("/add").post((req, res) => {
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

// //Read route - getting all users data
// router.route("/").get((req, res) => {

//     Student.find().then((students) => {
//         res.json(students)

//     }).catch((err) => {

//         console.log(err.message);
//         res.status(500).send({ status: "Error with get user", error: err.message });
//     })
// })

// //get only one student data
// router.route("/get/:id").get(async (req, res) => {

//     let StudentID = req.params.id;

//     //assing the user data to variable and sending it to front end
//     const student = await Student.findById(StudentID).then((student) => {
//         res.status(200).send({ status: "User fetched", /*sending to frontend*/ student: student });

//     }).catch(() => {
//         res.status(500).send({ status: "Student_Not_Found" });
//     })
// })

// //Update route
// router.route("/update/:id").put(async (req, res) => {
//     let StudentID = req.params.id;

//     /*common way
//     const name = req.body.name;
//     const age = Number(req.body.age);
//     const gender = req.body.gender;
//     const address = req.body.address;*/

//     //destructure way-new feature in js
//     const { name, age, gender, address } = req.body;

//     const updateStudent = {
//         name,
//         age,
//         gender,
//         address
//     }

//     await Student.findByIdAndUpdate(StudentID, updateStudent).then(() => {
//         //samething in line 19-24
//         res.status(200).send({ status: "User Updated" });

//     }).catch(() => {

//         console.log(err.message);
//         //sending error to frontend
//         res.status(500).send({ status: "Error with updating student" });

//     })

// })

// //Delete route
// router.route("/delete/:id").delete(async (req, res) => {
//     let StudentID = req.params.id;

//     const student = await Student.findById(StudentID);
//     if (!student) {
//         return res.status(404).send({ status: "Student not found" });
//     }

//     await Student.findByIdAndDelete(StudentID).then(() => {

//         res.status(200).send({ status: "User deleted" });

//     }).catch(() => {

//         console.log(err.message);
//         res.status(500).send({ status: "Error with deleting student", error: err.message });
//     })
// })

// module.exports = router;

