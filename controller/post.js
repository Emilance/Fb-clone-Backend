import PostData from "../models/post.js"

export const getPost = async (req, res) => {
   try{
       const allPost = await PostData.find()
       const sortedPost = await  allPost.sort((a, b) => b.time - a.time)
       
       res.status(200).json(sortedPost)
    
   }catch(err){
       res.status(404).json({message:err.message})
   }
}


export const createPost =async (req, res) => {
    var post = req.body;
   
    const newPost = new PostData({...post, postImage:req.file.originalname});
  


    try {
       await newPost.save();
       
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






// const allPost = await PostData.find((err, data)=>{
//     if(err){
//         res.status(500).json(err);
//     }else{
//         data.sort((b, a)=>{
//             return a.time -b.time;
//         })


        
//         res.status(200).json(data)
//     }
// })