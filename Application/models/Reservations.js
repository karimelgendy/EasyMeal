const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create schema 
const ReservationSchema=new Schema({
restaurantName:{
        type:boolean,
        required:true
    },
guestName:{
    type:String,
    required:true
},
numberOfPersons:{
    type:int,
    required:true
},
arrivalTime:{
    type:Date.now,
    required:true
}


});
 module.exports=Reservation=mongoose.model('reservation',ReservationSchema);


