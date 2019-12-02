const mongoose =require('mongoose');
const Schema = mongoose.Schema;

//create schema 
const RestaurantSchema=new Schema({
name:{
    type:String,
    required:true
},
telephone:{
    type:String,
    required:true
},
availableTables:{
    type:Number,
    required:true
},
busy:{
    type:Boolean,
    required:true
},
waitingList:{
    type:Boolean,
    required:true
}

});

module.exports=Restaurants=mongoose.model('restaurants',RestaurantSchema);