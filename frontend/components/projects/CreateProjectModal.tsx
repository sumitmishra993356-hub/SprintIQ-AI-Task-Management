

"use client";

import { useState } from "react";

import api from "@/services/api";

import toast from "react-hot-toast";

import {
  Plus,
  X,
} from "lucide-react";

type Props = {
  onSuccess: () => void;
};

export default function CreateProjectModal({
  onSuccess,
}: Props) {

  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Planning",
  });


  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);

      await api.post(
        "/projects",
        formData
      );

      toast.success(
        "Project created successfully"
      );

      setFormData({
        title: "",
        description: "",
        status: "Planning",
      });

      setOpen(false);

      onSuccess();

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };


  return (
    <div>

      {/* OPEN BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-5 py-3 rounded-xl flex items-center gap-2 shadow-sm"
      >
        <Plus size={18} />

        Create Project
      </button>


      {/* MODAL */}
      {
        open && (

          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">

              {/* HEADER */}
              <div className="flex items-center justify-between border-b px-6 py-5">

                <div>

                  <h2 className="text-2xl font-bold text-slate-800">
                    Create Project
                  </h2>

                  <p className="text-sm text-gray-500 mt-1">
                    Add a new sprint project
                  </p>

                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="p-2 rounded-full hover:bg-slate-100 transition"
                >
                  <X size={20} />
                </button>

              </div>


              {/* FORM */}
              <form
                onSubmit={handleSubmit}
                className="p-6 space-y-5"
              >

                {/* TITLE */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Project Title
                  </label>

                  <input
                    type="text"
                    required
                    value={formData.title}
                    placeholder="Enter project title"
                    className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        title: e.target.value,
                      })
                    }
                  />

                </div>


                {/* DESCRIPTION */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Description
                  </label>

                  <textarea
                    required
                    rows={4}
                    value={formData.description}
                    placeholder="Enter project description"
                    className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        description: e.target.value,
                      })
                    }
                  />

                </div>


                {/* STATUS */}
                <div>

                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Status
                  </label>

                  <select
                    value={formData.status}
                    className="w-full border border-slate-200 bg-slate-50 p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
                  >
                    <option>Planning</option>
                    <option>Active</option>
                    <option>Completed</option>
                  </select>

                </div>


                {/* ACTIONS */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="w-full sm:w-1/2 border border-slate-300 hover:bg-slate-100 transition p-3 rounded-xl font-medium"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-1/2 bg-indigo-600 hover:bg-indigo-700 transition text-white p-3 rounded-xl font-medium"
                  >
                    {
                      loading
                        ? "Creating..."
                        : "Save Project"
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