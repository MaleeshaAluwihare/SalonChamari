const router = require("express").Router();

 let eCPackages = require("../../Models/devinda/eventCustomPackage"); // give the path to get the Client file in models

 //crud 
 // create 
 //creating a method to call from the front end basicaly its the adress that calls 
 router.route("/add").post((req,res)=>{
    //method
   
    const cpFeature = req.body.cpFeature;
    const cpFeaturePrice = req.body.cpFeaturePrice;
    

    const newFeature = new eCPackages({
        cpFeature,
        cpFeaturePrice,
        
    })

    //to save and pass to the data base 
    //then catch used to exception handelling 
    newFeature.save().then(()=>{
        res.json("Feature added")
    }).catch((err)=>{
        console.log(err);

    })
 })

//read
 //to get registerd client details 

 router.route("/").get((req,res)=>{
    eCPackages.find().then((eCPackages)=>{
        res.json(eCPackages)
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
    const {cpFeature,cpFeaturePrice}= req.body;
     
    const updateFeature={
        cpFeature,
        cpFeaturePrice
       
    }

    const update = await eCPackages.findByIdAndUpdate(userId,updateFeature).then(()=>{
        //to send an update to the frontend that the updation is successfull
        
    res.status(200).send({status:"Feature Updated"}) 
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with Updating data"});
    })

    
 })

 //delete
 //to delete a client
 router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;

    await eCPackages.findByIdAndDelete(userId)
    .then(()=>{
        res.status(200).send({status:"Feature Deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status:"Error with deleting feature",error: err.message});
    })
    
 })


 //to extract single useres data 
 router.route("/get/:id").get(async (req, res)=>{
    let userId = req.params.id;
   const user = await eCPackages.findById(userId)
    //if we want to use any other attrivute like email
    // await Client.findByOne(email);
    .then((eCPackages)=>{
        res.status(200).send({status:"User Fetched",eCPackages}); 
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
    const features = await eCPackages.find();
    features.forEach((features) => {
      const score = calculateSimilarity(description, features.cpFeature);
      if (score > highestScore) {
        highestScore = score;
        bestMatch = features.cpFeature;
      }
    });

    res.json({ bestMatch });
  } catch (error) {
    console.error('Error finding best match:', error);
    res.status(500).json({ error: 'Error finding best match' });
  }
});

// Function to calculate similarity score between two strings (e.g., user description and pFeatures)
function calculateSimilarity(description, cpFeature) {
  // Implement your logic to calculate similarity score (e.g., using string matching algorithms)
}

module.exports = router;


 module.exports = router;
