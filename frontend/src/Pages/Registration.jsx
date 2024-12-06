import React, { useState } from "react";

const App = () => {
  const [formData, setFormData] = useState({
    teamName: "",
    leaderName: "",
    leaderWhatsapp: "",
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

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Registration successful!");
        setFormData({
          teamName: "",
          leaderName: "",
          leaderWhatsapp: "",
          leaderBranch: "",
          leaderGraduationYear: "",
        });
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
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
            name="leaderName"
            placeholder="Your Leader Name"
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-gray-200 placeholder-gray-400"
            value={formData.leaderName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="leaderWhatsapp"
            placeholder="Your Leader Whatsapp Number"
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-gray-200 placeholder-gray-400"
            value={formData.leaderWhatsapp}
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
            placeholder="Leader Year of Graduation"
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
      <div className="w-full md:w-1/2 p-4 md:p-8 flex flex-col justify-center bg-gray-900 ">
        <h2 className="text-lg md:text-xl font-bold text-purple-400 mb-4">SAMMAR</h2>
        <h3 className="text-md md:text-lg font-semibold mb-2">Rules and Regulations</h3>
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