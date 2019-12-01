const Restaurants= require('../../models/Restaurants');

//get all restaurants
router.get('/',(req,res)=>{
Restaurants.find()
        .sort({date:-1})
        .then(restaurants => res.json(restaurants))
});
module.export=router;