var mongoose = require("mongoose");
const crypto = require('node:crypto');
const uuidv1 = require('uuid/v1');

var userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastName : {
        type: String,
        required: false,
        maxlength: 15,
        trim: true
        
    },
    email : {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userinfo: {
        type:String,
        trim:true
    },
    encry_password : {
        type: String,
        required: true 
    },
    salt: String,
    role : {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default:[]
    }
},
    {timestamps : true} 
);


userSchema
    .virtual("password")
    .set(function(password){
        this._password = password;
        this.salt = uuidv1();
        this.encry_password = this.securePassword(password);
         
    })
    .get(function(){
        return this._password;
    });

userSchema.methods = {
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword)== this.encry_password
    },

    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto
            .createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        } 
        catch(err){
            return ""
        }

    }
    
    
};

module.exports = mongoose.model("User",userSchema); //to export schema


// const testName = new User({
//     name: 'Achal',
//     lastName: 'J'
// })

// console.log(testName.name+''+testName.lastName);

// userSchema.virtual('fullname').get(function(){
//     return this.User.name +' '+ this.User.lastName
// });