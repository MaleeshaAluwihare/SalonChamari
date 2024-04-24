const router = require("express").Router();
const { User, validate } = require("../../Models/nisalka/user");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
        console.log(error)
	}
});

// get all user data
router.route("/display").get((req, res) => {

    User.find().then((user) => {
        res.json(user)

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get user", error: err.message });
    })
})

//get user by Email

router.route("/get/:email").get(async(req,res)=>{
    let userEmail = req.params.email;

    await User.findOne({email:userEmail})
    .then((user)=>{
        res.status(200).send({status:"user fetched",user})

    }).catch((error)=>{
        console.log(error);
        res.status(500).send({status:"error with get user",error:error.message});
    })
})
//Update by Email


router.route("/update/:email").put(async(req,res)=>{

    let userEmail = req.params.email;
    const{fullName,password,phone,age,gender} = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const updateUser = {
        
        fullName,
        password:hashedPassword ,
        phone,
        age,
        gender
    }

    await User.findOneAndUpdate ({email:userEmail},updateUser)
    .then(() =>{
        res.status(201).json({
            status: 'success',
            message: 'User updated successfully',
            
        });
    
    }).catch((error) => {
        console.log(error);
        res.status(500).send({status:"error with updating data"});
    })
})
//delete by Email

router.route("/delete/:email").delete(async(req,res)=>{
    let userEmail = req.params.email;

    await User.findOneAndDelete({email:userEmail})
    .then(()=>{
        res.status(201).json({
            status: 'success',
            message: 'User deleted successfully',
            
        });
    }).catch((error)=>{
        console.log(error);
        res.status(500).send({status:"error with deleting",error:error.message});
    })
})

module.exports = router;