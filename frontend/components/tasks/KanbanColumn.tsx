

import TaskCard from "./TaskCard";

type Props = {
  title: string;
  tasks: any[];
  onEdit: (task: any) => void;
  onDelete: (id: string) => void;

};

export default function KanbanColumn({
  title,
  tasks,
  onEdit,
  onDelete
}: Props) {

  return (

    <div className="bg-slate-100 rounded-2xl p-4 min-h-[500px]">

      <div className="flex items-center justify-between mb-4">

        <h2 className="font-bold text-lg">
          {title}
        </h2>

        <span className="bg-white px-3 py-1 rounded-full text-sm">
          {tasks.length}
        </span>

      </div>

      <div className="space-y-4">

        {tasks.map((task) => (

          <TaskCard
            key={task._id}
            task={task}
            onEdit={onEdit}
            onDelete={onDelete}
          />

        ))}

      </div>

    </div>
  );
}