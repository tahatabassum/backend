const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: [true, "Note content is required"],
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt fields
    versionKey: false, // removes __v field
  }
);

// We explicitly specify 'note' as the third argument to match the exact collection name in your database
module.exports = mongoose.model("Note", noteSchema, "note");
