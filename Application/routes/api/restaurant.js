const Restaurant= require('../../models/Restaurant');

//get all restaurants
router.get('/',(req,res)=>{
Restaurant.find()
        .sort({date:-1})
        .then(restaurant => res.json(restaurant))
});
module.export=router;