const express = require('express');
const router = express.Router();
const TeamRegistration = require("../../models/registration")

router.post('/user', async (req, res) => {
    try {
        // Extract data from the request body
        const {
        //  eventName,
          teamName,
          teamLeaderName,
          teamLeaderPhone,
          leaderBranch,
          leaderGraduationYear,
        } = req.body;
    
        // Validate required fields
        if (
       //   !eventName ||
          !teamName ||
          !teamLeaderName ||
          !teamLeaderPhone ||
          !leaderBranch ||
          !leaderGraduationYear
        ) {
          return res.status(400).json({ error: 'All fields are required.' });
        }

     
    
        // Create a new team registration document
        const newRegistration = new TeamRegistration({
         // eventName,
          teamName,
          teamLeader: {
            name: teamLeaderName,
            phone: teamLeaderPhone,
            branch: leaderBranch,
            yearOfGraduation: leaderGraduationYear,
          },
        });
    
        // Save to the database
        const savedRegistration = await newRegistration.save();
        console.log('Registration saved:', savedRegistration);
        // Send a success response
        res.status(201).json({
          message: 'Team registered successfull!',
          data: savedRegistration,
        });
      } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal server error.' });
      }
})

module.exports = router;