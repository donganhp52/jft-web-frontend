import examApiRequest from "@/apiRequest/exam";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type {
  ExamType,
  SessionDetailType,
} from "@/schemaValidations/exam.schema";

export const usePublishedExamQuery = ({ examId }: { examId: string }) => {
  return useQuery<ExamType>({
    queryKey: ["exam", examId],
    queryFn: () => examApiRequest.getPublishedExam(examId),
    enabled: Boolean(examId),
  });
};

export const useStartSessionMutation = () => {
  return useMutation({
    mutationFn: (examId: string) => examApiRequest.startSession(examId),
  });
};

export const useSessionDetailQuery = ({
  examId,
  sessionId,
}: {
  examId: string;
  sessionId: string;
}) => {
  return useQuery<SessionDetailType>({
    queryKey: ["sessionDetail", examId, sessionId],
    queryFn: () => examApiRequest.getSessionDetail(examId, sessionId),
    enabled: Boolean(examId) && Boolean(sessionId),
  });
};

export const useSaveAnswerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      sessionId,
      data,
    }: {
      sessionId: string;
      data: { questionId: string; selectedOptionId: string };
    }) => examApiRequest.saveSessionAnswer(sessionId, data),
    onSuccess: () => {
      // Refetch session detail để update UI với answer mới
      queryClient.invalidateQueries({ queryKey: ["sessionDetail"] });
    },
  });
};
