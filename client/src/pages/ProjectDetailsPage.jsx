import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]); // Store project tasks
  const [loading, setLoading] = useState(true);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({ name: "", duration: 1 });

  const backendUrl = "https://aether-backend-3cnh.onrender.com";
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Fetch Project Details
        const projectRes = await axios.get(`${backendUrl}/api/projects/${id}`, {
          headers: { "x-auth-token": token },
        });
        setProject(projectRes.data);

        // 2. Fetch Project Tasks
        const tasksRes = await axios.get(
          `${backendUrl}/api/tasks/project/${id}`,
          {
            headers: { "x-auth-token": token },
          },
        );
        setTasks(tasksRes.data);
      } catch (err) {
        console.error("Error loading project data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, token]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${backendUrl}/api/tasks`,
        {
          name: newTask.name,
          duration: newTask.duration,
          project: id, // Link task to this project
        },
        {
          headers: { "x-auth-token": token },
        },
      );

      setTasks([...tasks, res.data]); // Add to list immediately
      setShowTaskModal(false);
      setNewTask({ name: "", duration: 1 });
    } catch (err) {
      alert("Failed to create task");
    }
  };

  if (loading)
    return (
      <div className="text-white text-center mt-20">
        Loading Mission Data...
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

        {/* Project Header */}
        <div className="bg-gray-800 rounded-3xl p-8 border border-gray-700 shadow-2xl mb-8">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-4 mb-2">
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

            <div className="text-right">
              <div className="text-sm text-gray-500 uppercase font-bold mb-1">
                AI Risk Score
              </div>
              <div
                className={`text-4xl font-black ${project.aiInsights?.riskScore > 50 ? "text-red-500" : "text-green-500"}`}
              >
                {project.aiInsights?.riskScore || 0}%
              </div>
            </div>
          </div>
        </div>

        {/* Task Manager Section */}
        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Project Tasks</h2>
            <button
              onClick={() => setShowTaskModal(true)}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg font-bold transition-colors shadow-lg shadow-purple-900/20"
            >
              + Add Task
            </button>
          </div>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No tasks yet. Start planning your timeline!
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-gray-900/50 p-4 rounded-xl border border-gray-700 flex justify-between items-center hover:border-purple-500/50 transition-colors"
                >
                  <div>
                    <h4 className="font-bold text-lg">{task.name}</h4>
                    <div className="text-xs text-gray-400 flex gap-4 mt-1">
                      <span>⏱️ Duration: {task.duration} days</span>
                      <span>📅 Status: {task.status}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="text-gray-500 hover:text-white px-2">
                      Edit
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Future Modules */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50">
          {/* ... (Placeholders for Gantt, Critical Path - Coming Soon) ... */}
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              🔭 WBS Breakdown
            </h3>
            <p className="text-gray-600 text-sm">
              Visual hierarchy coming soon.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              📅 Gantt Timeline
            </h3>
            <p className="text-gray-600 text-sm">
              Interactive chart coming soon.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-xl font-bold text-gray-400 mb-2">
              ⚡ Critical Path
            </h3>
            <p className="text-gray-600 text-sm">
              Auto-calculation coming soon.
            </p>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showTaskModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-gray-800 w-full max-w-md rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold mb-4">Add New Task</h3>
            <form onSubmit={handleCreateTask} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Task Name
                </label>
                <input
                  autoFocus
                  className="w-full bg-gray-900 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                  value={newTask.name}
                  onChange={(e) =>
                    setNewTask({ ...newTask, name: e.target.value })
                  }
                  placeholder="e.g. Design Database Schema"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  className="w-full bg-gray-900 p-3 rounded-lg border border-gray-600 focus:ring-2 focus:ring-purple-500 outline-none"
                  value={newTask.duration}
                  onChange={(e) =>
                    setNewTask({ ...newTask, duration: e.target.value })
                  }
                  min="1"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold"
                >
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectDetailsPage;
