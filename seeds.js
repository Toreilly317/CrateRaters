var mongoose = require("mongoose");
var Record = require("./models/record");
var Comment   = require("./models/comment");

var data = [
    {
        artist: "James Brown",
        album: "James Brown Live At The Appollo",
        image: "http://ring.cdandlp.com/french-connection-records/photo_grande/114770819.jpg",
        year: '1963',
        Found: "Drums, Strings, Vocals"
    },
    {
        artist: "Skull Snaps",
        album: "'It's A New Day",
        image: "http://www.popsike.com/pix/20060912/140028511643.jpg",
        year: '1973',
        Found: "Drums, Strings, Vocals"
    },
    {
        artist: "The Honey Drippers",
        album: "Impeach The President",
        image: "https://vinylstylus.files.wordpress.com/2012/08/the-honey-drippers-volume-one.jpg",
        year: '1963',
        Found: "Drums, Strings, Vocals"
    }
]

function seedDB(){
   //Remove all records
   Record.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed records!");
         //add a few records
        data.forEach(function(seed){
            Record.create(seed, function(err, record){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a record");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                record.comments.push(comment);
                                record.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
