var mongoose = require("mongoose");

var recordSchema = new mongoose.Schema({
   artist: String,
   album: String,
   image: String,
   year: String,
   found: String,
   author: {
      id: {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User"
      },
      username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports = mongoose.model("Record", recordSchema);