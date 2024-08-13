import { Evaluation } from "@/lib/schema";
import { createContext, useContext, useReducer } from "react";

export type Steps =
  | "client"
  | "anamnesis"
  | "perimeters"
  | "skinfolds"
  | "observations";

type FormStatus = {
  isValid: boolean;
  isDirty: boolean;
};

type State = {
  currentStep: Steps;
  formData: {
    step: Steps;
    status: FormStatus;
    values: Evaluation;
  }[];
};

const initialState: State = {
  currentStep: "client",
  formData: [
    {
      step: "client",
      status: { isValid: false, isDirty: false },
      values: { clientId: "", date: new Date() },
    },
  ],
};

type Action =
  | { type: "goToNextStep"; payload: Steps }
  | { type: "updateFormValues"; payload: Evaluation }
  | { type: "updateFormStatus"; payload: FormStatus };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "goToNextStep":
      return { ...state, currentStep: action.payload };

    case "updateFormValues":
      const updatedValues = state.formData.map((data) =>
        data.step === state.currentStep
          ? { ...data, values: action.payload }
          : data
      );

      return {
        ...state,
        formData: updatedValues,
      };

    case "updateFormStatus":
      const updatedStatus = state.formData.map((data) =>
        data.step === state.currentStep
          ? { ...data, status: action.payload }
          : data
      );

      return { ...state, formData: updatedStatus };

    default:
      throw new Error("Unkown action");
  }
}

type NewEvaluationFormContextType = {
  state: State;
  dispatch: React.Dispatch<Action>;
};

const NewEvaluationFormContext = createContext<
  NewEvaluationFormContextType | undefined
>(undefined);

export function NewEvaluationFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <NewEvaluationFormContext.Provider value={{ state, dispatch }}>
      {children}
    </NewEvaluationFormContext.Provider>
  );
}

export function useNewEvaluationForm() {
  const context = useContext(NewEvaluationFormContext);
  if (!context)
    throw new Error(
      "useNewEvaluationForm cannot be used outside NewEvaluationFormProvider"
    );
  return context;
}
