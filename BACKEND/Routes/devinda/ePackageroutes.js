const router = require("express").Router();

 let ePackages = require("../../Models/devinda/eventPackages"); // give the path to get the Client file in models

 //crud 
 // create 
 //creating a method to call from the front end basicaly its the adress that calls 
 router.route("/add").post((req,res)=>{
    //method
    const pName = req.body.pName;
    const pFeatures = req.body.pFeatures;
    const pPrice = req.body.pPrice;
    const pDiscription = rew.body.pDiscription;
    

    const newPackage = new ePackages({
        pName,
        pFeatures,
        pPrice,
        pDiscription,
    })

    //to save and pass to the data base 
    //then catch used to exception handelling 
    newPackage.save().then(()=>{
        res.json("Package added")
    }).catch((err)=>{
        console.log(err);

    })
 })

//read
 //to get registerd client details 

 router.route("/").get((req,res)=>{
    ePackages.find().then((ePackages)=>{
        res.json(ePackages)
    }).catch((err)=>{
        console.log(err)
    })
 })

 //Update 
 //http//Localhost:8070/student/update/5gfdh5u8asdb
 //have to use the : to make sure that the id is not displayed in the url
 
 router.route("/update/:id").put(async(req,res) =>{
    //to assign the id to the variable  
    let userId = req.params.id;
    //dstructure 
    //we can use the method used in the create function as well
    //assigning values one by one
    const {pName,pFeatures,pPrice,pDiscription}= req.body;
     
    const updatePackage={
        pName,
        pFeatures,
        pPrice,
        pDiscription
        
    }

    const update = await ePackages.findByIdAndUpdate (userId,updatePackage).then(()=>{
        //to send an update to the frontend that the updation is successfull
        
    res.status(200).send({status:"Package Updated"}) 
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with Updating data"});
    })

    
 })

 //delete
 //to delete a client
 router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await ePackages.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"Package Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with delete Package",error: err.message});
    })
    
 })


 //to extract single useres data 
 router.route("/get/:id").get(async (req, res)=>{
    let userId = req.params.id;
   const user = await ePackages.findById(userId)
    //if we want to use any other attrivute like email
    // await Client.findByOne(email);
    .then((ePackages)=>{
        res.status(200).send({status:"User Fetched",ePackages}); 
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with Fetching user",error: err.message});
    })
 })
router.post('/findBestMatch', async (req, res) => {
  const { description } = req.body;

  let bestMatch = '';
  let highestScore = 0;

  try {
    const packages = await ePackages.find();
    packages.forEach((package) => {
      const score = calculateSimilarity(description, package.pFeatures);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = package.pName;
      }
    });

    res.json({ bestMatch });
  } catch (error) {
    console.error('Error finding best match:', error);
    res.status(500).json({ error: 'Error finding best match' });
  }
});

// Function to calculate similarity score between two strings (e.g., user description and pFeatures)
function calculateSimilarity(description, pFeatures) {
  // Implement your logic to calculate similarity score (e.g., using string matching algorithms)
}

module.exports = router;
