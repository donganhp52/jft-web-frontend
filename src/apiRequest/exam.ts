import { http } from "@/lib/http";
import type {
  ExamSessionType,
  ExamType,
  SaveAnswerResponseType,
  SessionDetailType,
} from "@/schemaValidations/exam.schema";

const prefix = "exams/";

const examApiRequest = {
  getPublishedExam: (examId: string) =>
    http.get(`${prefix}${examId}`).json<ExamType>(),

  startSession: (examId: string) =>
    http.post(`${prefix}${examId}/sessions`).json<ExamSessionType>(),

  getSessionDetail: (examId: string, sessionId: string) =>
    http
      .get(`${prefix}${examId}/sessions/${sessionId}`)
      .json<SessionDetailType>(),

  saveSessionAnswer: (
    sessionId: string,
    data: {
      questionId: string;
      selectedOptionId: string;
    },
  ) =>
    http
      .put(`${prefix}sessions/${sessionId}/answers`, { json: data })
      .json<SaveAnswerResponseType>(),
};

export default examApiRequest;
