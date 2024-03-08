const Post = require('../models/post');

const createPost = async (posterUsername ,username, time, profilePic, text, picture) => {
    const newPost = new Post ({ 
      posterUsername,
      username, 
      time, 
      profilePic,
      text, 
      picture
    });
  return await newPost.save();
};

const getPostById = async (pid) => {
  const post = await Post.findOne({ pid });
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
}

// Function to update post by id
const updatePost = async (pid, newText, newPicture) => {
  const post = await getPostById(pid);
  if (!post){
    throw new Error('Post not found');
  }
  post.text = newText;
  post.picture = newPicture;
  return await post.save;
};

// Function to delete post by id
const deletePost = async (pid) => {
  const post = await getPostById(pid);
  if (!post) {
    throw new Error('Post not found');
  }
  await post.deleteOne();
  return post;

};

module.exports = { createPost, getPostById ,updatePost, deletePost }