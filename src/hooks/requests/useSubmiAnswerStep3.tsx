import { useMutation } from "@tanstack/react-query";
import { api } from "../../config/axios";
import { toast } from "react-toastify";
import { useStep3Store } from "../../store/Step3Store";

// Savolga javob yuborish uchun hook
const useSubmitAnswerStep3 = () => {
  const { answers } = useStep3Store(); // Zustand store`dan javoblarni olish
  const userId = localStorage.getItem("user_id");
  console.log(userId); // localStorage dan user_id olish

  const { mutateAsync, isError, isSuccess } = useMutation({
    mutationKey: ["submitAnswer"],
    mutationFn: async () => {
      const response = await Promise.all(
        Object.keys(answers).map(async (questionId) => {
          const answerObj = answers[questionId];

          // Javob string formatida yuborilishi kerak
          const answerText =
            typeof answerObj === "string" ? answerObj : answerObj.answer_text; // object bo‘lsa, answer_text ni ajratib olamiz

          const res = await api.post("/admin/question-answer", {
            question_id: questionId,
            answer_text: String(answerText), // stringga o‘tkazish
            user_id: userId,
          });
          return res.data;
        })
      );
      return response;
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to submit answers!");
    },
    onSuccess: () => {
      toast.success("Answers successfully submitted!");
    },
  });

  return { mutateAsync, isError, isSuccess };
};

export default useSubmitAnswerStep3;
