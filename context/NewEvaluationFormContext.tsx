import { Anamnesis, Perimeters, SelectClient } from "@/lib/schema";
import { parseAsStringLiteral, useQueryState } from "nuqs";
import React, { createContext, useContext, useReducer, useEffect } from "react";

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
  isVisited: boolean;
};

const initialStatus: FormStatus = {
  isValid: true,
  isDirty: false,
  isSubmitted: false,
  isVisited: false,
};

type SelectClientFormData = {
  step: "client";
  status: FormStatus;
  values: SelectClient;
};

type AnamnesisFormData = {
  step: "anamnesis";
  status: FormStatus;
  values: Anamnesis;
};

type PerimetersFormData = {
  step: "perimeters";
  status: FormStatus;
  values: Perimeters;
};

type FormData = SelectClientFormData | AnamnesisFormData | PerimetersFormData;

export type State = {
  currentStep: Steps;
  formData: FormData[];
};

const initialState: State = {
  currentStep: "client",
  formData: [
    {
      step: "client",
      status: { ...initialStatus, isVisited: true },
      values: { clientId: "", date: new Date() },
    },
    {
      step: "anamnesis",
      status: initialStatus,
      values: {
        practiceExercise: "Não",
        exerciseType: "",
        exerciseFrequence: "",
        exerciseDuration: "",
        physicalActivityHistory: "",
        objectives: "",
        smoke: "Nunca fumei",
        smokeQuantity: "",
        smokeTimeSinceStop: "",
        alcoholComsumption: "Não",
        alcoholQuantity: "",
        sleepQuality: "",
        stressLevel: "",
        diseases: "Não",
        diseasesDetails: "",
        diseasesFamilyHistory: "Não",
        diseasesFamilyHistoryDetails: "",
        injuries: "Não",
        injuriesDetails: "",
        surgeries: "Não",
        surgeriesDetails: "",
        medication: "Não",
        medicationDetails: "",
        pains: "Não",
        painsDetails: "",
        physicalLimitations: "Não",
        physicalLimitationsDetails: "",
      },
    },
    {
      step: "perimeters",
      status: initialStatus,
      values: {
        armLeftRelaxed: undefined,
        armRightRelaxed: undefined,
        armLeftFlexed: undefined,
        armRightFlexed: undefined,
        forearmLeft: undefined,
        forearmRight: undefined,
        thighLeftProximal: undefined,
        thighRightProximal: undefined,
        thighLeftMedial: undefined,
        thighRightMedial: undefined,
        thighLeftDistal: undefined,
        thighRightDistal: undefined,
        calfLeft: undefined,
        calfRight: undefined,
        chest: undefined,
        abdomen: undefined,
        waist: undefined,
        hips: undefined,
      },
    },
  ],
};

type Action =
  | { type: "goToNextStep"; payload: Steps }
  | { type: "updateFormValues"; payload: SelectClient | Anamnesis | Perimeters }
  | { type: "updateFormStatus"; payload: FormStatus };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "goToNextStep":
      const updatedFormData = state.formData.map((data) => {
        if (data.step === action.payload) {
          return {
            ...data,
            status: { ...data.status, isVisited: true },
          };
        }
        return data;
      });

      return {
        ...state,
        currentStep: action.payload,
        formData: updatedFormData as FormData[],
      };

    case "updateFormValues":
      const updatedValues = state.formData.map((data) => {
        if (data.step === state.currentStep) {
          return {
            ...data,
            values: action.payload as (typeof data)["values"],
          };
        }
        return data;
      });

      return {
        ...state,
        formData: updatedValues as FormData[],
      };

    case "updateFormStatus":
      const updatedStatus = state.formData.map((data) =>
        data.step === state.currentStep
          ? { ...data, status: { ...action.payload, isSubmitted: true } }
          : data
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

  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(reducer, {
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
      if (action.type === "goToNextStep")
        setCurrentStep(action.payload, { scroll: true });
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
