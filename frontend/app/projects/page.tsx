// "use client";

// import { useEffect, useState } from "react";

// import api from "@/services/api";

// import toast from "react-hot-toast";

// import ProjectCard from "@/components/projects/ProjectCard";

// import CreateProjectModal from "@/components/projects/CreateProjectModal";

// export default function ProjectsPage() {

//   const [projects, setProjects] = useState([]);

//   useEffect(() => {

//     fetchProjects();

//   }, []);

//   const fetchProjects = async () => {

//     try {

//       const { data } = await api.get(
//         "/projects"
//       );

//       setProjects(data);

//     } catch (error) {

//       console.log(error);
//     }
//   };


//   const deleteProject = async (
//     id: string
//   ) => {

//     try {

//       await api.delete(`/projects/${id}`);

//       toast.success("Project deleted");

//       fetchProjects();

//     } catch (error: any) {

//       toast.error(
//         error.response?.data?.message
//       );
//     }
//   };

//   return (
//     <div>

//       <div className="flex items-center justify-between mb-6">

//         <div>

//           <h1 className="text-3xl font-bold">
//             Projects
//           </h1>

//           <p className="text-gray-500">
//             Manage all sprint projects
//           </p>

//         </div>

//         <CreateProjectModal
//           onSuccess={fetchProjects}
//         />

//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">

//         {projects.map((project: any) => (

//           <ProjectCard
//             key={project._id}
//             project={project}
//             onDelete={deleteProject}
//           />

//         ))}

//       </div>

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import toast from "react-hot-toast";

import ProjectCard from "@/components/projects/ProjectCard";

import CreateProjectModal from "@/components/projects/CreateProjectModal";

import EditProjectModal from "@/components/projects/EditProjectModal";

import {
  FolderKanban,
  Search,
} from "lucide-react";

export default function ProjectsPage() {

  // STATES
  const [projects, setProjects] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  // EDIT STATES
  const [editOpen, setEditOpen] =
    useState(false);

  const [selectedProject, setSelectedProject] =
    useState<any>(null);


  // FETCH PROJECTS
  useEffect(() => {

    fetchProjects();

  }, []);


  const fetchProjects = async () => {

    try {

      setLoading(true);

      const { data } =
        await api.get("/projects");

      setProjects(data);

    } catch (error) {

      console.log(error);

      toast.error(
        "Failed to fetch projects"
      );

    } finally {

      setLoading(false);
    }
  };


  // DELETE PROJECT
  const deleteProject = async (
    id: string
  ) => {

    const confirmDelete = confirm(
      "Delete this project?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/projects/${id}`
      );

      toast.success(
        "Project deleted"
      );

      fetchProjects();

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Delete failed"
      );
    }
  };


  // EDIT PROJECT
  const editProject = (
    project: any
  ) => {

    setSelectedProject(project);

    setEditOpen(true);
  };


  // SEARCH FILTER
  const filteredProjects =
    projects.filter((project: any) =>
      project.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const user =
    typeof window !== "undefined"
      ? JSON.parse(
        localStorage.getItem(
          "user"
        ) || "{}"
      )
      : null;

  // LOADING UI
  if (loading) {

    return (

      <div className="animate-pulse">

        <div className="flex items-center justify-between mb-8">

          <div>

            <div className="h-10 w-52 bg-slate-200 rounded mb-3" />

            <div className="h-4 w-72 bg-slate-200 rounded" />

          </div>

          <div className="h-12 w-40 bg-slate-200 rounded-xl" />

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

          {[1, 2, 3].map((item) => (

            <div
              key={item}
              className="bg-white rounded-2xl p-6 h-56"
            />

          ))}

        </div>

      </div>
    );
  }


  return (

    <div className="space-y-6 mt-4 mx-4">

      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

        <div>

          <div className="flex items-center gap-3">

            <div className="bg-indigo-100 p-3 rounded-2xl">

              <FolderKanban className="text-indigo-600" />

            </div>

            <div>

              <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
                Projects
              </h1>

              <p className="text-gray-500 mt-1">
                Manage all sprint projects
              </p>

            </div>

          </div>

        </div>

        {
          user?.isAdmin && (

            <CreateProjectModal
              onSuccess={fetchProjects}
            />

          )
        }

      </div>


      {/* SEARCH */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border w-full md:w-2/4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

      </div>


      {/* PROJECTS GRID */}
      {
        filteredProjects.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">

            {filteredProjects.map(
              (project: any) => (

                <ProjectCard
                  key={project._id}
                  project={project}
                  onDelete={deleteProject}
                  onEdit={editProject}
                />

              )
            )}

          </div>

        ) : (

          <div className="bg-white rounded-2xl shadow-sm border p-14 text-center">

            <div className="flex justify-center mb-5">

              <div className="bg-slate-100 p-5 rounded-full">

                <FolderKanban
                  size={40}
                  className="text-slate-400"
                />

              </div>

            </div>

            <h2 className="text-2xl font-bold text-slate-700">
              No Projects Found
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first sprint project to get started.
            </p>

          </div>

        )
      }


      {/* EDIT MODAL */}
      {
        editOpen &&
        selectedProject && (

          <EditProjectModal
            project={selectedProject}
            onClose={() =>
              setEditOpen(false)
            }
            onSuccess={() => {

              fetchProjects();

              setEditOpen(false);
            }}
          />

        )
      }

    </div>
  );
}