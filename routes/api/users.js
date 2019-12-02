const Users= require('../../models/Users');
const  express=require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;
//get all users
router.get('/',(req,res)=>{
Users.find()
        .sort({date:-1})
        .then(Users => res.json(Users))
});

//create 
router.post('/',(req,res) => {
        const newRes = new Users({
        name : req.body.name,
        email : req.body.email 
  });
 
         newRes.save().then(users => res.json(users));
 });

 // delete 
router.delete ('/:id', (req,res) => {
        Users.findById(req.params.id)
        .then(users => users.remove().then(() => res.json({success : true })))
        .catch(err => res.status(404).json({ success : false }));
 }); 
 //update
 router.put("/:id", async (req, res) => {
        try {
          if (ObjectId.isValid(req.params.id)) {
            const updatedUser = await Users.findByIdAndUpdate(
              req.params.id , {
                name : req.body.name,
                email : req.body.email
                 });
            if (!updatedUser)
              return res.status(404).send({ error: "User does not exist" });
            return res.json({ msg: "User updated successfully" });
          } else {
            return res.status(404).send({ error: "Not a user id" });
          }
        } catch (error) {
          console.log(error);
          return res.status(404).send({ error: "User does not exist" });
        }
      });


module.exports=router;