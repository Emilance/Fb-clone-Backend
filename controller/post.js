import PostData from "../models/post.js"

export const getPost = async (req, res) => {
   try{
       const allPost = await PostData.find()
       res.status(200).json(allPost)
    
   }catch(err){
       res.status(404).json({message:err.message})
   }
}


export const createPost =async (req, res) => {
    var post = req.body;
   
    const newPost = new PostData(post);
    console.log(req.body)


    try {
       await newPost.save();
       console.log(newPost)
       res.status(201).json(newPost)
       
    } catch (error) {
        res.status(409).json({message:error.message})
    }
}


export const deletePost= async (req, res)=> {
    const Id = req.params.id
    console.log(Id)
    try {
       await  PostData.findByIdAndRemove(Id).exec();
       res.send("Succesfully deleted!")
    } catch (error) {
        console.log(error);
    }
}