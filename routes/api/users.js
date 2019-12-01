const Users= require('../../models/Users');

//get all users
router.get('/',(req,res)=>{
Users.find()
        .sort({date:-1})
        .then(Users => res.json(Users))
});
module.export=router;