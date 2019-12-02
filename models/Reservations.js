const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create schema 
const ReservationSchema=new Schema({
restaurantName:{
        type:String,
        required:true
    },
guestName:{
    type:String,
    required:true
},
 numberOfPersons:{
     type:Number,
    required:true
 },
 arrivalTime:{
     type:Date,
     default:Date.now
 }


});
 module.exports=Reservations=mongoose.model('reservations',ReservationSchema);