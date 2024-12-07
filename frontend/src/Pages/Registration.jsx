import React, { useState } from "react";
import axios from "axios";
import { SERVER_URL } from "../constants";

const App = () => {
  const [formData, setFormData] = useState({
    eventName: "Robo", // Put name of the event this form is for here
    teamName: "",
    teamLeaderName: "",
    teamLeaderPhone: "",
    leaderBranch: "",
    leaderGraduationYear: "",
  });

  const [isHuman, setIsHuman] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isHuman) {
      alert("Please verify you are human.");
      return;
    }
    console.log("Form Data:", formData); // Log formData to check its contents
    try {
      const response = await axios.post(
        `${SERVER_URL}/register/event`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        alert("Registration successful!");
        setFormData({
          ...formData,
          teamName: "",
          teamLeaderName: "",
          teamLeaderPhone: "",
          leaderBranch: "",
          leaderGraduationYear: "",
        });
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);

      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Server Response Error:", error.response.data);

        if (error.response.status === 400 && error.response.data.error) {
          // If validation errors are provided by the server
          if (Array.isArray(error.response.data.error)) {
            alert(
              `Validation Errors:\n- ${error.response.data.error.join("\n- ")}`
            );
          } else {
            alert(`Error: ${error.response.data.error}`);
          }
        } else {
          alert(
            `Server Error: ${error.response.status} - ${error.response.statusText}`
          );
        }
      } else if (error.request) {
        // Request was made, but no response was received
        console.error("No Response from Server:", error.request);
        alert(
          "No response from server. Please check your internet connection or try again later."
        );
      } else {
        // Something else caused the error
        console.error("Unexpected Error:", error.message);
        alert(`Unexpected error: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:h-screen bg-gray-900 text-white p-4 md:p-11">
      {/* Form Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 md:p-8 bg-gray-800 rounded-lg mb-4 md:mb-0">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Register Now</h1>
        <form className="w-full max-w-md space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="teamName"
            placeholder="Team Name"
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-gray-200 placeholder-gray-400"
            value={formData.teamName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="teamLeaderName"
            placeholder="Your Leader Name"
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-gray-200 placeholder-gray-400"
            value={formData.teamLeaderName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="teamLeaderPhone"
            placeholder="Team Leader Phone"
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-gray-200 placeholder-gray-400"
            value={formData.teamLeaderPhone}
            onChange={handleChange}
            required
          />
          <p className="text-sm text-gray-400">* Don't include +91 or 0</p>
          <input
            type="text"
            name="leaderBranch"
            placeholder="Leader Branch"
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-gray-200 placeholder-gray-400"
            value={formData.leaderBranch}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="leaderGraduationYear"
            placeholder="Year of Graduation"
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-gray-200 placeholder-gray-400"
            value={formData.leaderGraduationYear}
            onChange={handleChange}
            required
          />

          {/* hCaptcha Placeholder */}
          <div className="flex items-center space-x-2 mt-4">
            <input
              type="checkbox"
              id="human"
              className="w-5 h-5"
              onChange={(e) => setIsHuman(e.target.checked)}
            />
            <label htmlFor="human" className="text-gray-200">
              I am human
            </label>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md font-bold"
          >
            Submit
          </button>
        </form>
      </div>
      {/* Rules Section */}
      <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center bg-gray-900 overflow-auto">
        <h2 className="text-lg md:text-xl font-bold text-purple-400 mb-4">
          SAMMAR
        </h2>
        <h3 className="text-md md:text-lg font-semibold mb-2">
          Rules and Regulations
        </h3>
        <ul className="list-decimal list-inside text-gray-300 space-y-2">
          <li>Team can have a maximum of four members.</li>
          <li>
            Anyone can control the robot, and players can be exchanged in the
            middle of the match.
          </li>
          <li>
            A robot can push or hit the ball. It cannot withhold or grab the
            ball.
          </li>
          <li>
            Human interference (e.g., touching the robot) during the game is
            allowed but limited to 3 free touches; penalties will follow.
          </li>
          <li>
            Judges' decisions and Event Organizers' rulings are final and
            binding.
          </li>
          <li>
            Coordinators may request explanations for robot actions and modify
            rules as needed.
          </li>
          <li>
            Rules and regulations are subject to change without prior notice.
          </li>
          <li>
            Positions of balls and obstacles will be decided on the day of the
            event.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
