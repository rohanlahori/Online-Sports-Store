const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Please Enter Product Name']
    },
    description:{
        type:String,
        required:[true,'Please Enter Product Description']        
    },
    price:{
        type:Number,
        required:[true,'Please Enter Product Price'],
        maxlength:[6,'Price must be less than 6 digits'] 
    },
    ratings:{
        type:Number,
        default:0
    },
    images:
    [
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,       
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please Enter Product Category"]
    },
    Stock:{
        type:Number,
        required:[true,"Please enter Product stock"],
        maxlength:[4,"Stock can't exceed 4 character"],
        default:1,
    },
    numberofReviews:{
        type:Number,
        default:0,
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },  
    reviews:[
        {       
          
            name:{
                type:String,
                required:[true,"Please enter your name"],
            },
            rating:{
                type:Number,
                required:true,
            },
            Comment:{
                type:String,
                // required:true,
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})

module.exports=mongoose.model("Product",productSchema) 