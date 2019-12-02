const Reservations= require('../../models/Reservations');
const  express=require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;
//get all reservations
router.get('/',(req,res)=>{
Reservations.find()
        .sort({date:-1})
        .then(reservations => res.json(reservations))
});
//create 
router.post('/',(req,res) => {
        const newRes = new Reservations({
        restaurantName : req.body.restaurantName,
        guestName : req.body.guestName,
        numberOfPersons : req.body.numberOfPersons 
  });
 
         newRes.save().then(reservations => res.json(reservations));
 });
 // delete 
 
  router.delete ('/:id', (req,res) => {
        Reservations.findById(req.params.id)
         .then(reservations => reservations.remove().then(() => res.json({success : true })))
         .catch(err => res.status(404).json({ success : false }));
  }); 
  //update
  router.put("/:id", async (req, res) => {
        try {
          if (ObjectId.isValid(req.params.id)) {
            const updatedReservation = await Reservations.findByIdAndUpdate(
              req.params.id , {
                                restaurantName : req.body.restaurantName,
                                guestName : req.body.guestName,
                                numberOfPersons : req.body.numberOfPersons} );
            if (!updatedReservation)
              return res.status(404).send({ error: "Reservation does not exist" });
            return res.json({ msg: "Reservation updated successfully" });
          } else {
            return res.status(404).send({ error: "Not a reservation id" });
          }
        } catch (error) {
          console.log(error);
          return res.status(404).send({ error: "Reservation does not exist" });
        }
      });
 
 
module.exports=router;