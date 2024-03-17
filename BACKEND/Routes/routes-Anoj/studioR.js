const router = require("express").Router();
let Studio = require("../../Models/models-Anoj/studioM");


//INSERT DATA

http://localhost:8070/studio/add

router.route("/add").post((req,res) => {

  const pid = Number(req.body.pid);
  const name = req.body.name;
  const price = Number(req.body.price);
  const quantity = Number(req.body.quantity);

  const newStudio = new Studio({
    pid,
    name,
    price,
    quantity
  });

  newStudio.save().then(() => {
    res.json("Studio Added"); // Corrected response message
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ error: "Failed to add Studio" }); // Sending appropriate error response
  });

});

////////////////////////////////////////////////////////////////////////////////////////////////////

//DISPLAY DATA

http://localhost:8070/studio/display

router.route("/display").get((req, res) => {

  Studio.find().then((Studio) => {
    res.json(Studio)
  }).catch((err) => {
    console.log(err)
  })

})

///////////////////////////////////////////////////////////////////////////////////////////////////

//UPDATE BY ID

http://localhost:8070/studio/update/:pid

router.route("/update/:pid").put(async(req, res) => {

  let pid = req.params.pid;
  const {name,price,quantity} = req.body;

  try{

    const updateProduct = {
      name,
      price,
      quantity
    }

    const  filter = {pid: pid};

    const updateStudio = await Studio.findByIdAndUpdate(filter,updateProduct, {
      new : true

    });

    if(!updateProduct){
      return res.status(404).json({message:`Product with productId ${pid} not found`});
    }

    await updateStudio.save();

    res.json({message: `Product updated successfully`})

  } catch(error) {
    console.error(`Error updating product:`,error);
    res.status(500).json({message: error.message});
  }

});

///////////////////////////////////////////////////////////////////////////////////////////////////

//DELETE BY ID

http://localhost:8070/studio/delete/:pid

router.route("/delete/:pid").delete(async(req, res) => {

  const { pid } = req.params;

  try{
     //find the item by pid and delete it
     const deleteProduct = await Studio.findOneAndDelete({ pid: pid });

      if(!deleteProduct){
        return res.status(404).json({ message: `Item with ID ${pid} not found`});
    }

    res.json({ message: 'Item deleted successfully',deleteItem});
  }catch(error){
    console.error('Error Deleting Product', error);
    res.status(500).json({ message: `Server Error`});
  }
    
});



module.exports = router;
