import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const DashboardPage = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [aiLoading, setAiLoading] = useState(false); // State for AI loading

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: "General",
    budgetAmount: 0,
    startDate: "",
    endDate: "",
  });

  const backendUrl = "https://aether-backend-3cnh.onrender.com";
  const token = localStorage.getItem("token");

  // Fetch projects on load
  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) return;
      try {
        const res = await axios.get(`${backendUrl}/api/projects`, {
          headers: { "x-auth-token": token },
        });
        setProjects(res.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [token]);

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // --- AI FUNCTION: Call the Gemini API ---
  const handleGenerateAI = async () => {
    if (!formData.name) {
      alert("Please enter a project name first!");
      return;
    }

    setAiLoading(true);
    try {
      // Call our backend AI route
      const res = await axios.post(
        `${backendUrl}/api/ai/generate-charter`,
        { name: formData.name, type: formData.type },
        { headers: { "x-auth-token": token } },
      );

      // Update the description field with the AI's text
      setFormData((prev) => ({ ...prev, description: res.data.generatedText }));
    } catch (err) {
      console.error("AI Error:", err);
      alert(
        "Failed to generate AI content. Make sure your API key is set in Render.",
      );
    } finally {
      setAiLoading(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const projectData = {
        ...formData,
        budget: { amount: formData.budgetAmount, currency: "USD" },
      };
      const res = await axios.post(`${backendUrl}/api/projects`, projectData, {
        headers: { "x-auth-token": token },
      });
      setProjects([res.data, ...projects]);
      setShowModal(false);
      setFormData({
        name: "",
        description: "",
        type: "General",
        budgetAmount: 0,
        startDate: "",
        endDate: "",
      });
    } catch (err) {
      alert("Failed to create project. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Command Center
            </h1>
            <p className="text-gray-400 mt-2">
              Oversee your project portfolio and predictive insights.
            </p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-cyan-600 hover:bg-cyan-700 px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-cyan-900/20 active:scale-95"
          >
            + Create New Project
          </button>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-gray-800/50 rounded-2xl border-2 border-dashed border-gray-700">
                <p className="text-gray-500 text-xl">
                  No projects found. Launch your first project to get started!
                </p>
              </div>
            ) : (
              projects.map((project) => (
                <div
                  key={project._id}
                  className="group bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 shadow-xl relative"
                >
                  {/* Link to Project Details Page */}
                  <Link
                    to={`/project/${project._id}`}
                    className="absolute inset-0 z-10"
                  ></Link>

                  <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-3 py-1 rounded-full">
                      {project.type}
                    </span>
                    <span className="text-xs text-gray-500 italic">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-6 line-clamp-2 h-10">
                    {project.description}
                  </p>

                  {/* AI Risk Score Visualization */}
                  <div className="bg-gray-900/80 p-4 rounded-xl border border-gray-700">
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className="text-gray-500 uppercase">
                        AI Predictive Risk
                      </span>
                      <span
                        className={
                          project.aiInsights?.riskScore > 50
                            ? "text-red-400"
                            : "text-green-400"
                        }
                      >
                        {project.aiInsights?.riskScore || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${project.aiInsights?.riskScore || 0}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <div className="bg-gray-800 w-full max-w-xl rounded-3xl p-10 border border-gray-700 shadow-2xl">
            <h2 className="text-3xl font-bold mb-2 text-white">
              Initialize Project
            </h2>
            <p className="text-gray-400 mb-8 text-sm">
              Provide context for our AI to begin strategic planning.
            </p>
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Project Identity
                </label>
                <input
                  name="name"
                  placeholder="Project Name (e.g., Factory Expansion)"
                  value={formData.name}
                  onChange={onChange}
                  className="w-full bg-gray-900/50 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none transition-all"
                  required
                />
              </div>

              {/* Description with AI Button */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase">
                    Strategic Description
                  </label>
                  {/* The AI Button */}
                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={aiLoading}
                    className="text-xs flex items-center gap-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 px-3 py-1 rounded-full font-bold transition-all disabled:opacity-50 text-white"
                  >
                    {aiLoading ? "Generating..." : "Auto-Draft with AI ✨"}
                  </button>
                </div>
                <textarea
                  name="description"
                  placeholder="Describe the goal... or type the name above and let AI draft this for you!"
                  value={formData.description}
                  onChange={onChange}
                  className="w-full bg-gray-900/50 p-4 rounded-xl border border-gray-700 focus:ring-2 focus:ring-cyan-500 outline-none h-32 resize-none font-mono text-sm"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Industry Sector
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={onChange}
                    className="w-full bg-gray-900/50 p-4 rounded-xl border border-gray-700 outline-none appearance-none"
                  >
                    <option value="General">General</option>
                    <option value="Construction">Construction</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Software">Software</option>
                    <option value="Personal">Personal Goal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Target Budget
                  </label>
                  <input
                    type="number"
                    name="budgetAmount"
                    placeholder="Budget (USD)"
                    value={formData.budgetAmount}
                    onChange={onChange}
                    className="w-full bg-gray-900/50 p-4 rounded-xl border border-gray-700 outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-6 pt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-white font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-cyan-600 hover:bg-cyan-700 px-10 py-4 rounded-xl font-bold shadow-lg shadow-cyan-900/40"
                >
                  Launch Engine
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
