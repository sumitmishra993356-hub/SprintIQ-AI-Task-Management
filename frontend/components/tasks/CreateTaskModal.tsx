"use client";

import { useState, useEffect } from "react";

import api from "@/services/api";

import toast from "react-hot-toast";

import { X } from "lucide-react";

type Props = {
  onSuccess: () => void;
};

export default function CreateTaskModal({
  onSuccess,
}: Props) {

  const [open, setOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      description: "",
      priority: "Medium",
      status: "Todo",
      projectId: "",
    });

  const [projects, setProjects] = useState<any[]>([]);

  // CREATE TASK
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post(
        "/tasks",
        formData
      );

      toast.success(
        "Task created"
      );

      // RESET FORM
      setFormData({
        title: "",
        description: "",
        priority: "Medium",
        status: "Todo",
        projectId: "",
      });

      setOpen(false);

      onSuccess();

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Failed to create task"
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    fetchProjects();

  }, []);

  const fetchProjects = async () => {

    try {

      const { data } =
        await api.get("/projects");

      setProjects(data);

    } catch (error) {

      console.log(error);
    }
  };


  return (

    <div>

      {/* OPEN BUTTON */}
      <button
        onClick={() =>
          setOpen(true)
        }
        className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-3 rounded-xl font-medium shadow-sm"
      >
        Create Task
      </button>


      {/* MODAL */}
      {
        open && (

          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

            <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl overflow-hidden">

              {/* HEADER */}
              <div className="flex items-center justify-between border-b px-6 py-4">

                <div>

                  <h2 className="text-2xl font-bold text-slate-800">
                    New Task
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Create a sprint task
                  </p>

                </div>

                {/* CLOSE BUTTON */}
                <button
                  onClick={() =>
                    setOpen(false)
                  }
                  className="p-2 rounded-lg hover:bg-gray-100 transition"
                >
                  <X
                    size={20}
                    className="text-gray-500"
                  />
                </button>

              </div>


              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="p-6 space-y-5"
              >

                {/* TITLE */}
                <div>

                  <label className="block text-sm font-medium mb-2 text-slate-700">
                    Task Title
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.title}
                    placeholder="Enter task title"
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title:
                          e.target.value,
                      })
                    }
                  />

                </div>


                {/* DESCRIPTION */}
                <div>

                  <label className="block text-sm font-medium mb-2 text-slate-700">
                    Description
                  </label>

                  <textarea
                    rows={4}
                    value={
                      formData.description
                    }
                    placeholder="Task description"
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description:
                          e.target.value,
                      })
                    }
                  />

                </div>


                {/* PRIORITY + STATUS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                  {/* PRIORITY */}
                  <div>

                    <label className="block text-sm font-medium mb-2 text-slate-700">
                      Priority
                    </label>

                    <select
                      value={
                        formData.priority
                      }
                      className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          priority:
                            e.target
                              .value,
                        })
                      }
                    >
                      <option>
                        Low
                      </option>

                      <option>
                        Medium
                      </option>

                      <option>
                        High
                      </option>

                    </select>

                  </div>


                  {/* STATUS */}
                  <div>

                    <label className="block text-sm font-medium mb-2 text-slate-700">
                      Status
                    </label>

                    <select
                      value={
                        formData.status
                      }
                      className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          status:
                            e.target
                              .value,
                        })
                      }
                    >
                      <option>
                        Todo
                      </option>

                      <option>
                        In Progress
                      </option>

                      <option>
                        Review
                      </option>

                      <option>
                        Done
                      </option>

                    </select>

                  </div>

                </div>


                {/* PROJECT ID */}
                {/* <div>

                  <label className="block text-sm font-medium mb-2 text-slate-700">
                    Project ID
                  </label>

                  <input
                    type="text"
                    required
                    value={
                      formData.projectId
                    }
                    placeholder="Enter project ID"
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        projectId:
                          e.target.value,
                      })
                    }
                  />

                </div> */}
                <div>

                  <label className="block text-sm font-medium mb-2 text-slate-700">
                    Select Project
                  </label>

                  <select
                    required
                    value={formData.projectId}
                    className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        projectId:
                          e.target.value,
                      })
                    }
                  >

                    <option value="">
                      Select Project
                    </option>

                    {projects.map((project) => (

                      <option
                        key={project._id}
                        value={project._id}
                      >
                        {project.title}
                      </option>

                    ))}

                  </select>

                </div>


                {/* BUTTONS */}
                <div className="flex gap-3 pt-2">

                  <button
                    type="button"
                    onClick={() =>
                      setOpen(false)
                    }
                    className="w-1/2 border border-gray-300 hover:bg-gray-100 transition p-3 rounded-xl font-medium"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-1/2 bg-indigo-600 hover:bg-indigo-700 transition text-white p-3 rounded-xl font-medium"
                  >
                    {
                      loading
                        ? "Creating..."
                        : "Save Task"
                    }
                  </button>

                </div>

              </form>

            </div>

          </div>

        )
      }

    </div>
  );
}