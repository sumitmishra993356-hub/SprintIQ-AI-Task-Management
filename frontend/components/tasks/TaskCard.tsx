
type Props = {
  task: any;
  onEdit: (task: any) => void;
  onDelete: (id: string) => void;

};

export default function TaskCard({
  task,
  onEdit,
  onDelete
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

    <div className="bg-white rounded-xl p-4 shadow-sm border hover:shadow-md transition">

      <div className="flex items-start justify-between gap-3">

        <h3 className="font-semibold text-slate-800">
          {task.title}
        </h3>

        <span
          className={`
            text-xs px-2 py-1 rounded-full whitespace-nowrap

            ${task.priority === "High"
              ? "bg-red-100 text-red-700"

              : task.priority === "Medium"
                ? "bg-yellow-100 text-yellow-700"

                : "bg-green-100 text-green-700"
            }
          `}
        >
          {task.priority}
        </span>

      </div>

      <p className="text-sm text-gray-500 mt-2 line-clamp-3">
        {task.description}
      </p>

      <div className="mt-3">

        <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">

          {
            task.projectId?.title ||
            "No Project"
          }

        </span>

      </div>

      <div className="mt-4 flex items-center justify-between text-sm">

        <span className="text-gray-500">

          {
            task.assignedTo?.name
              ? task.assignedTo.name
              : "No Assignee"
          }

        </span>

        <span className="text-gray-400">

          {
            task.dueDate
              ? new Date(
                task.dueDate
              ).toLocaleDateString()

              : "No Deadline"
          }

        </span>

      </div>

      {user?.isAdmin && (
        <div className="mt-4 flex items-center justify-between">

          <button
            className="text-indigo-600 text-sm hover:text-indigo-700 font-medium"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>

          <button
            className="text-red-600 text-sm hover:text-red-700 font-medium"
            onClick={() => onDelete(task._id)}
          >
            Delete
          </button>

        </div>
      )}
    </div>
  );
}