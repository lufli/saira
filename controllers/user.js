const User = require('../models/user');
const Dish = require('../models/dish');
const _ = require('lodash');
// list all user

module.exports.listAll = (req,res,next)=>{
    User.find({}).then((users)=>{
        res.status(200).send({users});
    },(err)=>{
        res.status(404).send(err);
    })
}
// search user by email
module.exports.findByEmail = (req,res,next)=>{
    User.findOne({email:req.params.email}).then((user)=>{
        res.status(200).send({user})
    },(err)=>{
        res.status(400).send(err)
    });
}
// user can update personal information
//front end should trim the data into complete data, then pass to backend
module.exports.updateInfo = (req,res,next)=>{
    var body = _.pick(req.body,['follower','following'])
    User.findByIdAndUpdate(req.user._id,{$set:body},{new:true}).then((info)=>{
        res.status(200).send({info});
    }).catch((err)=>{
        res.status(400).send(err);
    })
}
// user can add dish to their favorite
//front end should pass trimmed data back -> added data or dropped data then pass to backend the full body
module.exports.updateFavorite = (req,res,next)=>{
    var body = _.pick(req.body,['favorite']);
    User.findByIdAndUpdate(req.user._id,{$set:body},{new:true}).then((info)=>{
        res.status(200).send(info);
    }).catch((err)=>{
        res.status(400).send(err);
    })
};
// user can make order if dish's schedule allows
//front end take care of if send data or not

