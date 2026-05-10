type Props = {
  title: string;
  value: number;
};

export default function StatCard({
  title,
  value,
}: Props) {

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h3 className="text-gray-500 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}