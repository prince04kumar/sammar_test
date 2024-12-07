const mongoose = require("mongoose");

const teamRegistrationSchema = new mongoose.Schema(
  {
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    teamName: {
      type: String,
      required: true,
      trim: true,
    },
    teamLeader: {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      phone: {
        type: Number,
        required: true,
        match: /^\d{10}$/, // Ensures a valid 10-digit phone number
      },
      branch: {
        type: String,
        required: true,
        trim: true,
      },
      yearOfGraduation: {
        type: Number,
        required: true,
        min: new Date().getFullYear(), // Ensures graduation year is not in the past
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("TeamRegistration", teamRegistrationSchema);
