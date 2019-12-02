const Restaurants= require('../../models/Restaurants');
const  express=require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;
//get all restaurants
router.get('/',(req,res)=>{
Restaurants.find()
        .sort({date:-1})
        .then(restaurants => res.json(restaurants))
});
//create 
 router.post('/',(req,res) => {
       const newRes = new Restaurants({
        name : req.body.name,
        telephone : req.body.telephone ,
        availableTables : req.body.availableTables ,
        busy : req.body.busy, 
        waitingList : req.body.waitingList
  });
 
       newRes.save().then(restaurants => res.json(restaurants));
 });

 // delete 
router.delete ('/:id', (req,res) => {
        Restaurants.findById(req.params.id)
        .then(restaurants => restaurants.remove().then(() => res.json({success : true })))
        .catch(err => res.status(404).json({ success : false }));
 }); 
 //update
 router.put("/:id", async (req, res) => {
        try {
          if (ObjectId.isValid(req.params.id)) {
            const updatedRestaurant = await Restaurants.findByIdAndUpdate(
        req.params.id , {
        name : req.body.name,
         telephone : req.body.telephone,
         availableTables : req.body.availableTables,
         busy : req.body.busy,
         waitingList : req.body.waitingList
 } );
            if (!updatedRestaurant)
              return res.status(404).send({ error: "Restaurant does not exist" });
            return res.json({ msg: "Restaurant updated successfully" });
          } else {
            return res.status(404).send({ error: "Not a restaurant id" });
          }
        } catch (error) {
          console.log(error);
          return res.status(404).send({ error: "Restaurant does not exist" });
        }
      });
 
module.exports=router;