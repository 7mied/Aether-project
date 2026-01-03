import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProjectDetailsPage = () => {
  const { id } = useParams(); // Get the project ID from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  // Ensure this matches your live backend URL
  const backendUrl = "https://aether-backend-3cnh.onrender.com";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`${backendUrl}/api/projects/${id}`, {
          headers: { "x-auth-token": token },
        });
        setProject(res.data);
      } catch (err) {
        console.error("Error fetching project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, token]);

  if (loading)
    return (
      <div className="text-white text-center mt-20">
        Loading Project Data...
      </div>
    );
  if (!project)
    return (
      <div className="text-white text-center mt-20">Project not found.</div>
    );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        <Link
          to="/dashboard"
          className="text-gray-400 hover:text-cyan-400 mb-6 inline-block transition-colors"
        >
          &larr; Back to Command Center
        </Link>

        <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-4xl font-extrabold text-white">
                  {project.name}
                </h1>
                <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase rounded-full border border-cyan-500/20">
                  {project.type}
                </span>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed whitespace-pre-line border-l-4 border-cyan-500 pl-4">
                {project.description}
              </p>
            </div>

            <div className="bg-gray-900/50 p-6 rounded-2xl border border-gray-700 min-w-[200px]">
              <div className="text-sm text-gray-500 uppercase font-bold mb-2">
                AI Risk Score
              </div>
              <div
                className={`text-5xl font-black ${project.aiInsights?.riskScore > 50 ? "text-red-500" : "text-green-500"}`}
              >
                {project.aiInsights?.riskScore || 0}%
              </div>
            </div>
          </div>
        </div>

        {/* The Workspace Tabs (Placeholders for Phase 2) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all cursor-pointer shadow-lg hover:shadow-cyan-500/10">
            <div className="text-4xl mb-4">🔭</div>
            <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-2">
              WBS Breakdown
            </h3>
            <p className="text-gray-400 text-sm">
              Visualize phases and deliverables.
            </p>
          </div>

          <div className="group bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all cursor-pointer shadow-lg hover:shadow-purple-500/10">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors mb-2">
              Gantt Timeline
            </h3>
            <p className="text-gray-400 text-sm">
              Manage schedules and dependencies.
            </p>
          </div>

          <div className="group bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-red-500 transition-all cursor-pointer shadow-lg hover:shadow-red-500/10">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors mb-2">
              Critical Path
            </h3>
            <p className="text-gray-400 text-sm">
              Analyze bottlenecks and float.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
