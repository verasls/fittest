import { Evaluation } from "@/lib/schema";
import { createContext, useContext, useReducer } from "react";

export type Steps =
  | "client"
  | "anamnesis"
  | "perimeters"
  | "skinfolds"
  | "observations";

type State = {
  currentStep: Steps;
  formState: {
    step: Steps;
    state: Evaluation;
  }[];
};

const initialState: State = {
  currentStep: "client",
  formState: [{ step: "client", state: { clientId: "", date: new Date() } }],
};

type Action =
  | { type: "goToNextStep"; payload: Steps }
  | { type: "saveFormData"; payload: Evaluation };

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "goToNextStep":
      return { ...state, currentStep: action.payload };

    case "saveFormData":
      const updatedFormState = state.formState.map((form) =>
        form.step === state.currentStep
          ? { ...form, state: action.payload }
          : form
      );

      return { ...state, formState: updatedFormState };

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
