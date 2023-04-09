import express  from "express";
import { getPost,createPost,updatePost,deletePost,likePost} from "../controllers/postController.js";
const router=express.Router()
import auth from "../middleware/auth.js";



router.get('/',getPost)
router.post('/', auth,createPost)

// router.route('/:id')
//     .patch(updatePost)
//     .delete(deletePost)
    
router.patch('/:id',auth,updatePost)
router.delete('/:id',auth,deletePost)
router.patch('/:id/likePost',auth,likePost)


export default router

