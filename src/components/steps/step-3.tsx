import { useGetProfileQuestions } from "../../hooks/requests/useGetProfileQuestions";
import { useStep3Store } from "../../store/Step3Store";
import Input from "../ui/Input";
import RadioGroup from "../ui/RadioGroup";
import Select from "../ui/SelectInput";

export const Step3 = () => {
  const { answers, setAnswer } = useStep3Store(); // Zustand store orqali javoblarni saqlash
  const { data, isFetching } = useGetProfileQuestions(3);
  const questions = data?.data || [];

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswer(questionId, answer); // Javobni Zustand store`ga saqlash
  };

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {questions.map((q) => {
        switch (q.question_type) {
          case "text":
          case "email":
          case "password":
            return (
              <Input
                key={q.id}
                inputClassName="w-full"
                type={q.question_type}
                label={q.question_text}
                placeholder={q.question_text}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleAnswerChange(q.id, e.target.value)
                }
              />
            );

          case "select":
            return (
              <Select
                key={q.id}
                question_text={q.question_text}
                options={q.options || []}
                onChange={(answer: string) => handleAnswerChange(q.id, answer)} // Javobni saqlash
              />
            );

          case "radio":
            return (
              <RadioGroup
                key={q.id}
                question_text={q.question_text}
                options={q.options || []}
                onChange={(answer: string) => handleAnswerChange(q.id, answer)} // Javobni saqlash
              />
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
