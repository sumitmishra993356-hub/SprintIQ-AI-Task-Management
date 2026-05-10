type Props = {
  insights: string[];
};

import {
  Sparkles,
} from "lucide-react";

export default function AIInsights({
  insights,
}: Props) {

  return (

    <div className="bg-white rounded-2xl p-6 shadow-sm border">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-5">

        <div className="bg-indigo-100 p-2 rounded-xl">

          <Sparkles
            size={20}
            className="text-indigo-600"
          />

        </div>

        <div>

          <h2 className="text-xl font-semibold text-slate-800">
            AI Insights
          </h2>

          <p className="text-sm text-gray-500">
            Smart sprint productivity suggestions
          </p>

        </div>

      </div>


      {/* EMPTY STATE */}
      {
        insights?.length === 0 ? (

          <div className="bg-slate-50 border rounded-xl p-5 text-center text-gray-500">

            No AI insights available.

          </div>

        ) : (

          <div className="space-y-3">

            {insights?.map(
              (insight, index) => (

                <div
                  key={index}
                  className="bg-indigo-50 border border-indigo-100 text-indigo-700 p-4 rounded-xl flex items-start gap-3"
                >

                  <Sparkles
                    size={18}
                    className="mt-1 flex-shrink-0"
                  />

                  <p className="text-sm leading-relaxed">
                    {insight}
                  </p>

                </div>

              )
            )}

          </div>

        )
      }

    </div>
  );
}