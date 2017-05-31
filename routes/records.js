var express = require("express");
var router  = express.Router();
var Record = require("../models/record");
var middleware = require("../middleware");


//INDEX - show all records
router.get("/", function(req, res){
    // Get all records from DB
    Record.find({}, function(err, allRecords){
       if(err){
           console.log(err);
       } else {
          res.render("records/index",{records:allRecords});
       }
    });
});

//CREATE - add new record to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to records array
    var data = {
     artist: req.body.artist,
     album: req.body.album,
     year: req.body.year,
     image: req.body.image,
     found: req.body.found,
     author: {
        id: req.user._id,
        username: req.user.username
    }
    };
    var newRecord = data;
    // Create a new record and save to DB
    Record.create(newRecord, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to records page
            console.log(newlyCreated);
            res.redirect("/records");
        }
    });
});

//NEW - show form to create new record
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("records/new"); 
});

// SHOW - shows more info about one record
router.get("/:id", function(req, res){
    //find the record with provided ID
    Record.findById(req.params.id).populate("comments").exec(function(err, foundRecord){
        if(err){
            console.log(err);
        } else {
            console.log(foundRecord)
            //render show template with that record
            res.render("records/show", {record: foundRecord});
        }
    });
});

// EDIT CAMPGROUND ROUTE
router.get("/:id/edit", middleware.checkRecordOwnership, function(req, res){
    Record.findById(req.params.id, function(err, foundRecord){
        res.render("records/edit", {record: foundRecord});
    });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id",middleware.checkRecordOwnership, function(req, res){
    // find and update the correct record
    Record.findByIdAndUpdate(req.params.id, req.body.record, function(err, updatedRecord){
       if(err){
           res.redirect("/records");
       } else {
           //redirect somewhere(show page)
           res.redirect("/records/" + req.params.id);
       }
    });
});

// DESTROY CAMPGROUND ROUTE
router.delete("/:id",middleware.checkRecordOwnership, function(req, res){
   Record.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/records");
      } else {
          res.redirect("/records");
      }
   });
});


module.exports = router;

