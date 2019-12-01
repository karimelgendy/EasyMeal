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
    type:int,
    required:true
},
busy:{
    type:boolean,
    required:true
},
waitingList:{
    type:boolean,
    required:true
}

});

module.exports=Restaurant=mongoose.model('restaurant',RestaurantSchema);




