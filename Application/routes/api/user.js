const User= require('../../models/User');

//get all users
router.get('/',(req,res)=>{
User.find()
        .sort({date:-1})
        .then(User => res.json(User))
});
module.export=router;