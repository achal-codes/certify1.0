const User = require('../models/user'); // Importing the user model and aliasing it

//Importing the method validationResult 
const { check, validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.signout = (req, res)=>{
    //clearing the cookie
    res.clearCookie("token");
    res.json({
        message : "signout"    
    });
};

exports.signup = (req, res) => {
    // Storing all validationResults(If not successful) in errors variable
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }
    //console.log(req.body);
    const user = new User(req.body);  // Creating a new object called "user" by invoking the User and passing req.body(Contains input fron front end)
    user.save((err, user)=>{  //save method outputs error and user itself
        if(err) { // if error
            return err.status(400).json({
                err:"Not able to save user in db"
            });
        }
        res.json({ // If saved successfully to send name, email and id in json which can later be used by frontend
            name : user.name,
            email : user.email,
            id : user._id
        });

    });
};

exports.signin = (req, res)=>{
    
    const {email, password } = req.body; 
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error : errors.array()[0].msg
        });
    }

    User.findOne({email}, (err, user)=>{
        if(err || !user){
            return res.status(400).json({
                error: "user email id not found"
            });
        }

        if(!user.authenticate(password)){
            return res.status(400).json({
                error : "Email and password doesn't match"
            });
        }
        // CREATE TOKEN
        const token = jwt.sign({_id: user._id}, process.env.SECRET);

        //Put token in cookie
        res.cookie("token", token, {expire : new Date()+9999});

        //send response to front end
        const {_id, name, email, role} = user;
        return res.json({token, user : {_id, name, email, role}});

    });
};


//Protected routes
//Generally middlewares in the ending needs next() but express-jwt has builtin next()

exports.isSignedIn = expressJwt({
    secret : process.env.SECRET,
    userProperty : "auth"
});

//custom middleware

exports.isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
                //From frontend  //from auth  // checking if both ids are same
                                // fetched from token on successful login                
    if(!checker)
    {
        return res.status(403).json({
            error : "Access Denied"
        });
    }

    next();
}

exports.isAdmin = (req, res, next) => {
    if(req.profile.role === 0){ // Role of normal user by default is set to 0 meaning he is a regular user and not admin
        return res.status(403).json({
            error : "You aren't an admin!!"
        });
    }
    next();
}