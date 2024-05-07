const router = require('express').Router();

let Comment = require("../../Models/Dasun/Comment");



//ADD DATA
//http: //localhost:8070/Comment/add
router.route("/add").post(async (req,res) => {

    const{commentId, commentCategory, comment} = req.body;

    try {

        const newComment = new Comment({commentId, commentCategory, comment});
        await newComment.save();

        res.json("Comment added");
        
    } catch(err) {

        console.error(err.message);
        res.status(500).send("Server Error");

    }

});




//GET ALL 
//http: //localhost:8070/Comment/display
router.route("/display").get((req,res) => {

    Comment.find().then((Comment) => {

        res.json(Comment);

    }).catch((err) => {

        console.log(err.message);
        res.status(500).send({ status: "Error with get comments", error: err.message });

    })

})


//GET ONE
//http: //localhost:8070/Comment/get
router.route("/get/:commentId").get(async(req,res) => {

    let commentId = req.params.commentId;

    try{

        const comment = await Comment.findOne({ commentId: commentId });


        if(!comment) {
            
            return res.status(404).send({ status: "Comment not found" });

        }

        res.status(200).send({status: "Comment fetched", comment: comment});

    } catch (error) {

        console.error("Error fetching comment", error);
        res.status(500).send({ status: "Server error" });

    }

})



//UPDATE
//http: //localhost:8070/Comment/update/;commentId
router.route("/update/:commentId").put(async (req,res) => {

    let commentId = req.params.commentId;

    const { commentCategory, comment } = req.body;

    const updateField = {

        commentCategory,
        comment

    };

    try {

        const updateComment = await Comment.findOneAndUpdate({commentId: commentId}, updateField, {new: true});


        if(!updateComment) {

            return res.status(404).send({status: "Comment not found"});

        }

        res.status(200).send({status: "Comment Updated", updateComment: updateComment});


    } catch (error) {

        console.error("Error with updating comment", error);
        res.status(500).send({status: "Server Error"});

    }

});



//DELETE
//http: //localhost:8070/Comment/delete/;commentId
router.route("/delete/:commentId").delete(async (req,res) => {

    let commentId = req.params.commentId;

    try{

        const comment = await Comment.findOne({commentId: commentId});

        if(!comment) {
            return res.status(404).send({status: "Comment not found"});
        }

        await Comment.findOneAndDelete({commentId: commentId});

        res.status(200).send({status: "Comment Deleted"});

    } catch(error) {

        console.error("Error with deleting Comment", error);
        res.status(500).send({status: "Server Error", error: error.message});

    }

});


module.exports = router;