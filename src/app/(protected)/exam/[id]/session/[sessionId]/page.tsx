"use client";

import { useSaveAnswerMutation, useSessionDetailQuery } from "@/queries/exam";
import { useParams } from "next/navigation";

export default function ExamSessionPage() {
  const params = useParams<{ id: string; sessionId: string }>();
  const examId = params?.id ?? "";
  const sessionId = params?.sessionId ?? "";
  const { data, isLoading, isError, error } = useSessionDetailQuery({
    examId,
    sessionId,
  });

  const saveAnswerMutation = useSaveAnswerMutation();
  const handeSelectOption = (questionId: string, selectedOptionId: string) => {
    saveAnswerMutation.mutate({
      sessionId,
      data: { questionId, selectedOptionId },
    });
  };

  if (isLoading) return <div className="p-6">Đang tải câu hỏi...</div>;
  if (isError)
    return <div className="p-6 text-red-600">Lỗi: {String(error)}</div>;
  if (!data) return <div className="p-6">Không có dữ liệu...</div>;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">{data.questions.length} câu hỏi</h1>
      {data.questions.map((q) => (
        <div key={q.questionId} className="border p-4 rounded">
          <h3 className="font-semibold">
            Câu {q.order}:{" "}
            <span dangerouslySetInnerHTML={{ __html: q.contentHtml }} />
          </h3>
          <div className="mt-2 space-y-2">
            {q.options.map((opt) => (
              <label key={opt.id} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`q-${q.questionId}`}
                  value={opt.id}
                  checked={q.selectedOptionId === opt.id}
                  onChange={() => handeSelectOption(q.questionId, opt.id)}
                />
                <span dangerouslySetInnerHTML={{ __html: opt.contentHtml }} />
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
