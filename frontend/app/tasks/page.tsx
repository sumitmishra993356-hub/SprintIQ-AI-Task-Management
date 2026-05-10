// "use client";

// import { useEffect, useState } from "react";

// import api from "@/services/api";

// import KanbanColumn from "@/components/tasks/KanbanColumn";

// import CreateTaskModal from "@/components/tasks/CreateTaskModal";

// export default function TasksPage() {

//   const [tasks, setTasks] = useState([]);
//   const [search, setSearch] = useState("");

//   useEffect(() => {

//     fetchTasks();

//   }, []);

//   const fetchTasks = async () => {

//     try {

//       const { data } = await api.get(
//         "/tasks"
//       );

//       setTasks(data);

//     } catch (error) {

//       console.log(error);
//     }
//   };

//   const todoTasks = tasks.filter(
//     (task: any) => task.status === "Todo"
//   );

//   const progressTasks = tasks.filter(
//     (task: any) =>
//       task.status === "In Progress"
//   );

//   const reviewTasks = tasks.filter(
//     (task: any) => task.status === "Review"
//   );

//   const doneTasks = tasks.filter(
//     (task: any) => task.status === "Done"
//   );

//   return (
//     <div>

//       <div className="flex items-center justify-between mb-6">

//         <div>

//           <h1 className="text-3xl font-bold">
//             Tasks Board
//           </h1>

//           <p className="text-gray-500">
//             Sprint workflow management
//           </p>

//         </div>

//         <CreateTaskModal
//           onSuccess={fetchTasks}
//         />

//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
//         <input
//           type="text"
//           placeholder="Search tasks..."
//           className="border p-3 rounded-xl"
//           onChange={(e) =>
//             setSearch(e.target.value)
//           }
//         />

//         <KanbanColumn
//           title="Todo"
//           tasks={todoTasks}
//         />

//         <KanbanColumn
//           title="In Progress"
//           tasks={progressTasks}
//         />

//         <KanbanColumn
//           title="Review"
//           tasks={reviewTasks}
//         />

//         <KanbanColumn
//           title="Done"
//           tasks={doneTasks}
//         />

//       </div>

//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

import api from "@/services/api";

import KanbanColumn from "@/components/tasks/KanbanColumn";

import CreateTaskModal from "@/components/tasks/CreateTaskModal";

import EditTaskModal from "@/components/tasks/EditTaskModal";

export default function TasksPage() {

  // STATES
  const [tasks, setTasks] =
    useState<any[]>([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  // EDIT STATES
  const [editOpen, setEditOpen] =
    useState(false);

  const [selectedTask, setSelectedTask] =
    useState<any>(null);


  // FETCH TASKS
  useEffect(() => {

    fetchTasks();

  }, []);


  const fetchTasks = async () => {

    try {

      setLoading(true);

      const { data } =
        await api.get("/tasks");

      setTasks(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };


  // OPEN EDIT MODAL
  const editTask = (
    task: any
  ) => {

    setSelectedTask(task);

    setEditOpen(true);
  };

  // DELETE TASK
  const deleteTask = async (
    id: string
  ) => {

    const confirmDelete = confirm(
      "Delete this task?"
    );

    if (!confirmDelete) return;

    try {

      await api.delete(
        `/tasks/${id}`
      );

      fetchTasks();

    } catch (error) {

      console.log(error);
    }
  };

  // SEARCH FILTER
  const filteredTasks =
    tasks.filter((task: any) =>
      task.title
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );


  // STATUS FILTERS
  const todoTasks =
    filteredTasks.filter(
      (task: any) =>
        task.status === "Todo"
    );

  const progressTasks =
    filteredTasks.filter(
      (task: any) =>
        task.status ===
        "In Progress"
    );

  const reviewTasks =
    filteredTasks.filter(
      (task: any) =>
        task.status === "Review"
    );

  const doneTasks =
    filteredTasks.filter(
      (task: any) =>
        task.status === "Done"
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

        <div className="h-10 w-56 bg-slate-200 rounded mb-6" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

          {[1, 2, 3, 4].map(
            (item) => (

              <div
                key={item}
                className="bg-white rounded-2xl p-5 min-h-[500px]"
              >

                <div className="h-6 w-32 bg-slate-200 rounded mb-6" />

                <div className="space-y-4">

                  {[1, 2, 3].map(
                    (card) => (

                      <div
                        key={card}
                        className="h-28 bg-slate-100 rounded-xl"
                      />

                    )
                  )}

                </div>

              </div>

            )
          )}

        </div>

      </div>
    );
  }


  return (

    <div className="mt-4 mx-4 md:mx-8 lg:mx-12 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

        <div>

          <h1 className="text-3xl font-bold">
            Tasks Board
          </h1>

          <p className="text-gray-500">
            Sprint workflow management
          </p>

        </div>

        {
          user?.isAdmin && (

            <CreateTaskModal
              onSuccess={fetchTasks}
            />

          )
        }

      </div>


      {/* SEARCH */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full md:w-80 border bg-white p-3 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
        />

      </div>


      {/* KANBAN BOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

        <KanbanColumn
          title="Todo"
          tasks={todoTasks}
          onEdit={editTask}
          onDelete={deleteTask}
        />

        <KanbanColumn
          title="In Progress"
          tasks={progressTasks}
          onEdit={editTask}
          onDelete={deleteTask}
        />

        <KanbanColumn
          title="Review"
          tasks={reviewTasks}
          onEdit={editTask}
          onDelete={deleteTask}
        />

        <KanbanColumn
          title="Done"
          tasks={doneTasks}
          onEdit={editTask}
          onDelete={deleteTask}
        />

      </div>


      {/* EDIT TASK MODAL */}
      {
        editOpen &&
        selectedTask && (

          <EditTaskModal
            task={selectedTask}
            onClose={() =>
              setEditOpen(false)
            }
            onSuccess={() => {

              fetchTasks();

              setEditOpen(false);
            }}
          />

        )
      }

    </div>
  );
}