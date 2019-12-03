const Users= require('../../models/Users');
const Resataurant = require('../../models/Restaurants')
const  express=require('express');
const router = express.Router();
var ObjectId = require('mongodb').ObjectID;
const fetch = require("node-fetch");
const Reservations = require('../../models/Reservations');
const server = require("../../config/keys");
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

// as a user i want to reserve a table in a restaurant 
router.post("/:uid/:rid/reserve/", async (req, res) => {
  if (ObjectId.isValid(req.params.uid) && ObjectId.isValid(req.params.rid)) {
    const user = await Users.findById(req.params.uid) ;
    const resstaurant = await Resataurant.findById(req.params.rid);
    if (user && resstaurant) {
      if ( req.body.numberOfPersons != null ) {
        var restaurantname = resstaurant.name;
        var clientname= user.name;
        const j = await PartnerRequestEvent(restaurantname,clientname,req.body.numberOfPersons,req.headers);
        console.log(j);
        res.json({ msg: "resrvation is done successfully" });
      } else {
        return res.status(400).send({ error: "body is missing attrubites" });
      }
    } else return res.status(404).send({ error: "user does not exist" });
  } else return res.status(404).send({ error: "user does not exist" });
});

async function PartnerRequestEvent(restaurantname,clientname,numberOfPersons,headers) {
  const body = {
    restaurantName: restaurantname,
    guestName: clientname,
    numberOfPersons: numberOfPersons
  };
  var error = true;
  var j;
  await fetch(`http://localhost:5000/api/reservations/`, {
    method: "post",
    body: JSON.stringify(body),
    headers
  })
    .then(res => {
      if (res.status === 200) {
        error = false;
      }
      return res.json();
    })
    .then(json => {
      if (!error) {
        json = { msg: "Reservation is created successfully" };
      }
      console.log(json);
      j = json;
    })
    .catch(err => console.log("Error", err));
  return j;
}
// as a user i want to check if the restaurant is busy or not
router.get("/:uid/checkIfBusy/:rid/", async (req, res) => {
  if (ObjectId.isValid(req.params.uid) && ObjectId.isValid(req.params.rid)) {
    const user = await Users.findById(req.params.uid);
    const resstaurant = await Resataurant.findById(req.params.rid);
    if (user) {
      if (resstaurant) {
        res.json(resstaurant.busy);
      } else
       return res.status(404).send({ error: "Restaurant does not exist" });
    } else
     return res.status(404).send({ error: "User does not exist" });
  } 
  else return res.status(404).send({ error: "Invalid Inputs" });
});



module.exports=router;