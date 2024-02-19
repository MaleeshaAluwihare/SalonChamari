const router = require("express").Router();
let Studio = require("../Models/models-Anoj/Studio");

router.route("/add").post(async(req,res)=>{
  let ProductId =req.params.pid;
  const {pid,name,price,quantity,date} = req.body

  const newStudio = new Studio({

    pid,
    name,
    price,
    quantity,
    date
  })

  newStudio.save().then(() => {
    res.json("Products Added")
  }).catch((err) => {
    console.log(err);
  })
})

http://Localhost:8070/studio/display

router.route("/").get((req,res) => {
  Studio.find().then((products) => {
    res.json(products)
  }).catch((err) => {
    console.log(err)
  })
})

http://localhost8070/studio/update/:

router.route("/update/:pid").put(async (req,res) => {
  let ProductId = req.params.pid;
  const {pid,name,price,quantity,date} = req.body

  const updateProduct = {
    pid,
    name,
    price,
    quantity,
    date
  }

  const update = await Studio.findByPidAndUpdate(ProductId, updateProduct)
    .then(() => {
      res.status(200).send({status: "Product is updated",studio: update})
    }).catch((err) => {
      console.log(err);
      
    })
    
  })

  router.route("/delete/:pid").delete(async (req, res) => {
    let ProductId =req.params.pid;
    
    await Studio.findByPidAndDelete(ProductId)
    .then(() => {
      res.status(200).send({status: "Product is deleted"});
    }).catch((err) => {
      console.log(err.message);
      
    })
  })

  router.route("/get/:pid").get(async (req, res) => {
    let ProductId = req.params.pid;
    const product = await Studio.findOne(pid)
    .then(() => {
      res.status(200).send({status: "Product fetched", product: product})
    }).catch(() => {
      console.log(err.message);
      
  })
  })
  
module.exports = router;

