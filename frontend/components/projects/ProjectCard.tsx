
type Props = {
  project: any;
  onDelete: (id: string) => void;
  onEdit?: (project: any) => void;
};

export default function ProjectCard({
  project,
  onDelete,
  onEdit,
}: Props) {

  const user =
  typeof window !== "undefined"
    ? JSON.parse(
        localStorage.getItem(
          "user"
        ) || "{}"
      )
    : null;

  return (

    <div className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition">

      <div className="flex items-start justify-between gap-4">

        <div>

          <h2 className="text-xl font-bold text-slate-800">
            {project.title}
          </h2>

          <p className="text-gray-500 mt-2 line-clamp-3">
            {project.description}
          </p>

        </div>

        <span
          className={`
            px-3 py-1 rounded-full text-sm whitespace-nowrap

            ${
              project.status === "Completed"
                ? "bg-green-100 text-green-700"

                : project.status === "Active"
                ? "bg-blue-100 text-blue-700"

                : "bg-yellow-100 text-yellow-700"
            }
          `}
        >
          {project.status}
        </span>

      </div>

  {user?.isAdmin && (
      <div className="mt-6 flex gap-3">

        <button
          onClick={() => onEdit?.(project)}
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white px-4 py-2 rounded-lg"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(project._id)}
          className="bg-red-500 hover:bg-red-600 transition text-white px-4 py-2 rounded-lg"
        >
          Delete
        </button>

      </div>

  )}
    </div>
  );
}

