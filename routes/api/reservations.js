const Reservations= require('../../models/Reservations');

//get all reservations
router.get('/',(req,res)=>{
Reservations.find()
        .sort({date:-1})
        .then(reservations => res.json(reservations))
});
module.export=router;