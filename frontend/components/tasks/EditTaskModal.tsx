"use client";

import {
  useEffect,
  useState,
} from "react";

import api from "@/services/api";

import toast from "react-hot-toast";

type Props = {
  task: any | null;
  onClose: () => void;
  onSuccess: () => void;
};

export default function EditTaskModal({
  task,
  onClose,
  onSuccess,
}: Props) {

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


  // PREFILL TASK DATA
  useEffect(() => {

    if (task) {

      setFormData({
        title: task.title || "",
        description:
          task.description || "",
        priority:
          task.priority || "Medium",
        status:
          task.status || "Todo",
        projectId:
          task.projectId?._id ||
          task.projectId ||
          "",
      });
    }

  }, [task]);


  // SAFETY
  if (!task) return null;


  // UPDATE TASK
  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.put(
        `/tasks/${task._id}`,
        formData
      );

      toast.success(
        "Task updated"
      );

      onSuccess();

      onClose();

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Update failed"
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">

      <div className="bg-white p-6 rounded-2xl w-full max-w-lg shadow-lg">

        <div className="flex items-center justify-between mb-5">

          <h2 className="text-2xl font-bold">
            Edit Task
          </h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ×
          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* TITLE */}
          <input
            type="text"
            value={formData.title}
            placeholder="Task Title"
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />


          {/* DESCRIPTION */}
          <textarea
            value={formData.description}
            placeholder="Description"
            rows={4}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                description:
                  e.target.value,
              })
            }
          />


          {/* PRIORITY */}
          <select
            value={formData.priority}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                priority:
                  e.target.value,
              })
            }
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>


          {/* STATUS */}
          <select
            value={formData.status}
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                status:
                  e.target.value,
              })
            }
          >
            <option>Todo</option>
            <option>In Progress</option>
            <option>Review</option>
            <option>Done</option>
          </select>


          {/* PROJECT ID */}
          <input
            type="text"
            value={formData.projectId}
            placeholder="Project ID"
            className="w-full border p-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) =>
              setFormData({
                ...formData,
                projectId:
                  e.target.value,
              })
            }
          />


          {/* BUTTONS */}
          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="w-1/2 border p-3 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="w-1/2 bg-indigo-600 hover:bg-indigo-700 transition text-white p-3 rounded-lg"
            >
              {
                loading
                  ? "Updating..."
                  : "Save Changes"
              }
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}