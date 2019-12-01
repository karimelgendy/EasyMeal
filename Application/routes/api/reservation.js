const Reservation= require('../../models/Reservation');

//get all reservations
router.get('/',(req,res)=>{
Reservation.find()
        .sort({date:-1})
        .then(reservation => res.json(reservation))
});
module.export=router;