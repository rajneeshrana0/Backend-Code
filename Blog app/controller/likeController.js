
// 
const Post = require("../models/postModel");
const Like = require("../models/likeModel");


// like a post


exports.likePost = async(req,res) =>{
    try {
        const {post,user} = req.body;
        const like = new Like({
            post,user,
        })
        const savedLike = await like.save();

        // update the post Collection

        const updatedPost =  await Post.findByIdAndUpddate(post, {$push:{likes: savedLike._id }}, {new:true})
        .populate("likes").exec();
        res.json({
            post:updatedPost,
        })

    } catch (error) {
        return res.status(400).json({
            error:"Error While Liking a Post",
        });
    }
}


// unlike a post

exports.unlikePost = async(req,res) =>{

    try {
        const {post,like} = req.body;
        // find and delete like collection main se
        const deleteLike = await Like.findOneAndDelete({post:post,_id:like});

        // update post collection

        const updatedPost = await Post.findByIdAndUpdate(post,{$pull: {likes: deleteLike._id}},{new:true});
        res.json({
            post:updatedPost,
        })
    } catch (error) {
        return res.status(400).json({
            error:"Error While UnLiking a Post",
        });
    }
}

exports.dummyLink =(req,res) =>{
    res.send("This is a Dummy Page");
}