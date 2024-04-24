"use client";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import HeadingMain from "@/app/components/ui/HeadingMain";
import Subheading from "@/app/components/ui/Subheading";
import { saveBudget } from "@/app/actions/save-settings/actions";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import UserNotification from "@/app/components/UserNotification";

const initialState = {
  message: null,
  error: false,
};

export default function BudgetForm() {
  const [state, formAction] = useFormState(saveBudget, initialState);
  //@todo Use state object to inform the user about the status of the form submission
  const { message, error } = state;
  const [budget, setBudget] = useState(false);
  const [isBudgetEditable, setIsBudgetEditable] = useState(true);

  useEffect(() => {
    //fetch the budget from the server
    fetch("/api/settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result && data.result?.budget) {
          setBudget(data.result.budget);
          setIsBudgetEditable(false);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });
  }, []);

  return (
    <>
      {error && message && (
        <UserNotification type="error">{message}</UserNotification>
      )}
      {!error && message && (
        <UserNotification type="success">{message}</UserNotification>
      )}

      <form action={formAction} className="h-full flex flex-col">
        <div className="section-padding border-b border-gray-200">
          <HeadingMain>Budget</HeadingMain>
          <Subheading>Set up your monthly spending budget</Subheading>
        </div>
        <div>
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 self-center">
                Monthly spending budget
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                <div className="relative">
                  <Input
                    className="w-full font-semibold pl-4"
                    placeholder="Enter your budget"
                    type="number"
                    name="budget"
                    required
                    value={budget > 0 ? budget : ""}
                    onChange={(e) => setBudget(e.target.value)}
                    disabled={!isBudgetEditable}
                  />
                  <span className="absolute left-0 top-0 h-full flex items-center pl-2">
                    $
                  </span>
                </div>
              </dd>
              {!isBudgetEditable && (
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0">
                  <Button
                    className="bg-blue-600 hover:bg-blue-700"
                    type="submit"
                    variant={"ghost"}
                    onClick={(e) => {
                      e.preventDefault();
                      setIsBudgetEditable(!isBudgetEditable);
                    }}
                  >
                    {isBudgetEditable ? "Save" : "Edit"}
                  </Button>
                </dd>
              )}
            </div>
          </dl>
        </div>
        <div className="section-padding flex justify-end ">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            type="submit"
            loading={true}
          >
            Save & Finish
          </Button>
        </div>
      </form>
    </>
  );
}
