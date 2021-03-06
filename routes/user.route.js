const express = require('express')
const router = express.Router()
const upload = require('../multer')
const {
     signup, 
     login, 
     logout, 
     forgotPassword,
      passwordReset, 
      getpasswordReset,
      getLoggedInUserDetails,
       changePassword,
       getchangePassword,
       getupdateProfile, 
       updateUserDetails,
        adminAllUser,
         managerAllUser, 
         adminUpdateOneUser, 
         adminDeleteOneUser, 
         getupdateByadmin,
         adminGetSingleUser
        } = require('../controllers/user.controller')

const { isLoggedIn, customRole } = require('../middlewares/user')

// router.route('/signup').post(signup);
router.post('/signup',upload.single('photo'),signup)

router.route('/login').post(login);

router.route('/logout').get(logout);

router.route('/forgotPassword').post(forgotPassword);

router.route('/password/reset/:token').post(passwordReset).get(getpasswordReset);

router.route('/userdashboard').get(isLoggedIn, getLoggedInUserDetails);

router.route('/password/update').post(isLoggedIn, changePassword).get(isLoggedIn,getchangePassword)

router.post('/userdashboard/update',upload.single('photo'),isLoggedIn, updateUserDetails)
router.route('/userdashboard/update').get(isLoggedIn,getupdateProfile);


// admin
router.route('/admin/users').get(isLoggedIn, customRole('admin'), adminAllUser);

router.route('/admin/user/:id').get( adminGetSingleUser);
router.route('/admin/user/:id').put(isLoggedIn, customRole('admin'), adminUpdateOneUser);

router.route('/admin/user/:id').delete(isLoggedIn, customRole('admin'), adminDeleteOneUser)


router.route('/admin/user').get(isLoggedIn,customRole('admin'),getupdateByadmin) 




// manager
router.route('/manager/users').get(isLoggedIn, customRole('manager'), managerAllUser)
module.exports = router