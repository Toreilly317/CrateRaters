var Record = require("../models/record");
var Comment = require("../models/comment");

// all the middleare goes here
var middlewareObj = {};

middlewareObj.checkRecordOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Record.findById(req.params.id, function(err, foundRecord){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the campground?
            if(foundRecord.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
 if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               res.redirect("back");
           }  else {
               // does user own the comment?
            if(foundComment.author.id.equals(req.user._id)) {
                next();
            } else {
                res.redirect("back");
            }
           }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("success", "You need to be logged in.")
    res.redirect("/login");
};

module.exports = middlewareObj;