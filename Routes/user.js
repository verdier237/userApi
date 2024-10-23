const express = require("express")
const {createUser,getUsers,updateUser,getOneUser} = require('../Controller/user')
const {protect} = require('../middleware/auth')
const router = express.Router();

router.route('')
        .get(protect,getUsers)
        .post(createUser)
        .put(protect,updateUser)
        .delete()
router.route('/id')
        .get(protect,getOneUser)


module.exports = router;

