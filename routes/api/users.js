const Users= require('../../models/Users');

//get all users
router.get('/',(req,res)=>{
Users.find()
        .sort({date:-1})
        .then(Users => res.json(Users))
});

//create 
router.post('/',(req,res) => {
        const newRes = new Users({
        name = req.body.name,
        email = req.body.email 
  });
 
         newRes.save().then(users => res.json(users));
 });

 // delete 
router.delete ('/:id', (req,res) => {
        Reservation.findById(req.params.id)
        .then(users => users.remove().then(() => res.json({success : true })))
        .catch(err => res.status(404).json({ success : false }));
 }); 

module.export=router;