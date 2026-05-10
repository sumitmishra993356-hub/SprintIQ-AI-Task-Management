type Props = {
  activities: any[];
};

export default function ActivityFeed({
  activities,
}: Props) {

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm">

      <h2 className="text-xl font-semibold mb-5">
        Recent Activities
      </h2>

      <div className="space-y-4">

        {activities?.map((activity, index) => (

          <div
            key={index}
            className="border-l-4 border-indigo-500 pl-4"
          >

            <p className="font-medium">
              {activity.action}
            </p>

            <p className="text-sm text-gray-500">
              {activity.userId?.name}
            </p>

          </div>
        ))}

      </div>
    </div>
  );
}