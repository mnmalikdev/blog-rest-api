const Express=require('express');
const controllerBlog=require('../controller/main');
const router=Express.Router();
//endpoints definition
const auth=require('../controller/authController')
router.get('/',controllerBlog.blogs);
router.post('/',controllerBlog.create);
router.get('/:blogId',auth,controllerBlog.blog);
router.put('/:blogId',auth,controllerBlog.update);
router.delete('/:blogId',auth,controllerBlog.delete);
module.exports=router;

