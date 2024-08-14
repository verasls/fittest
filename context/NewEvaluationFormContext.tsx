import { Evaluation } from "@/lib/schema";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import { createContext, useContext, useReducer, useEffect } from "react";

const steps = [
  "client",
  "anamnesis",
  "perimeters",
  "skinfolds",
  "observations",
] as const;
export type Steps = (typeof steps)[number];

export type FormStatus = {
  isValid: boolean;
  isDirty: boolean;
  isSubmitted: boolean;
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
      status: { isValid: false, isDirty: false, isSubmitted: false },
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
      const status = { ...action.payload, isSubmitted: true };
      const updatedStatus = state.formData.map((data) =>
        data.step === state.currentStep ? { ...data, status: status } : data
      );

      return { ...state, formData: updatedStatus };

    default:
      throw new Error("Unknown action");
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
  const [currentStep, setCurrentStep] = useQueryState(
    "step",
    parseAsStringLiteral(steps).withDefault("client")
  );

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    currentStep,
  });

  useEffect(() => {
    if (!currentStep || currentStep === "client") {
      setCurrentStep("client");
    }
  }, [currentStep, setCurrentStep]);

  const value = {
    state,
    dispatch: (action: Action) => {
      if (action.type === "goToNextStep") setCurrentStep(action.payload);
      dispatch(action);
    },
  };

  return (
    <NewEvaluationFormContext.Provider value={value}>
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
