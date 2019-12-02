const Reservations= require('../../models/Reservations');

//get all reservations
router.get('/',(req,res)=>{
Reservations.find()
        .sort({date:-1})
        .then(reservations => res.json(reservations))
});
//create 
router.post('/',(req,res) => {
        const newRes = new Reservations({
        restaurantName = req.body.restaurantName,
        guestName = req.body.guestName ,
        numberOfPersons = req.body.numberOfPersons ,
        arrivalTime = req.body.arrivalTime 
  });
 
         newRes.save().then(reservations => res.json(reservations));
 });
 // delete 
 
 router.delete ('/:id', (req,res) => {
        Reservation.findById(req.params.id)
        .then(reservations => reservations.remove().then(() => res.json({success : true })))
        .catch(err => res.status(404).json({ success : false }));
 }); 
 
 
module.export=router;