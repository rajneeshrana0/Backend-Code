// import model

const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// business logic

exports.createComment = async (req, res) => {
  try {
    // fetch Data From req Bosy

    const { post, user, body } = req.body;
    //create commnet object
    const comment = new Comment({
      post,
      user,
      body,
    });
    // save the comment into db

    const savedComment = await comment.save();

    // find the post by & id add the new comment to its comments array

    const updatedPost = await Post.findByIdAndUpdate(
      post,
      { $push: { comments: savedComment._id } },
      { new: true }
    )
      .populate("comments") // populate the comments array with comment documents
      .exec();
    res.json({
      post: updatedPost,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Error While Creating a Comment",
    });
  }
};
