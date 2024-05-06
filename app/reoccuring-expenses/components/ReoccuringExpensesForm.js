"use client";
import HeadingMain from "@/app/components/ui/HeadingMain";
import Subheading from "@/app/components/ui/Subheading";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import Select from "react-select"; //https://react-select.com/styles
import UserNotification from "@/app/components/UserNotification";
import { useState, useEffect } from "react";
import { IoTrashOutline } from "react-icons/io5";
import AddNewButton from "./AddNewButton";
import { useRouter } from "next/navigation";

export default function ReoccuringExpensesForm({ data }) {
  if (!data) {
    return null;
  }

  const router = useRouter();

  const initialErrorState = {
    message: null,
    error: false,
    input: null,
    count: 0,
    warning: false,
  };

  const [errorState, setErrorState] = useState(initialErrorState);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [names, setNames] = useState("");
  const [amounts, setAmounts] = useState("");
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    fetch("/api/settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data && data.result && data.result?.categories) {
          setCategories(data.result.categories);
        }
      })
      .catch((error) => {
        console.error("Error", error);
      });

    setSelectedCategories(
      data.map((element) => ({
        name: element.category,
        label: element.category,
      }))
    );
    setFormData(data);
    setNames(data.map((element) => element.name));
    setAmounts(data.map((element) => element.amount));
  }, []);

  const handleSubmit = (e) => {
    //get all the data from the form
    e.preventDefault();
    setLoading(true);
    const categories = selectedCategories.map((category) => category.name);
    //get the Ids of the expense-${index} elements
    const data = formData.map((element, index) => {
      return {
        name: names[index],
        amount: amounts[index],
        category: categories[index],
        id: element._id,
      };
    });

    //Make fetch POST request to api/reoccuring-expense to save the data
    fetch("/api/reoccuring-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("data____", data);

        if (data && data?.response) {
          setErrorState({
            ...initialErrorState,
            message: "Reoccuring expenses saved successfully",
            count: Math.random(),
          });
          router.refresh();

        } else {
          setErrorState({
            ...initialErrorState,
            error: true,
            message: "Error occurred while saving reoccuring expenses",
            count: Math.random(),
          });
        }
      })
      .catch((error) => {
        setErrorState({
          ...initialErrorState,
          error: true,
          count: Math.random(),
          message: "Error occurred while saving reoccuring expenses",
        });
      });

    setTimeout(() => {
      setLoading(false);
    }, 400);
  };

  let errorType;
  if (errorState?.warning) {
    errorType = "warning";
  } else if (errorState?.error) {
    errorType = "error";
  } else {
    errorType = "success";
  }

  return (
    <>
      {errorState && errorState.message && (
        <UserNotification type={errorType} key={errorState.count}>
          {errorState.message}
        </UserNotification>
      )}

      <form className="h-full flex flex-col" onSubmit={handleSubmit}>
        <div className="section-padding border-b border-gray-200">
          <HeadingMain>Reoccuring expenses</HeadingMain>
          <Subheading>
            You can edit or add new reoccuring expenses that are automatically
            added to your spendings reports every month
          </Subheading>
        </div>
        <div>
          <div className="bg-white px-4 py-5 flex sm:px-6">
            <AddNewButton />
          </div>

          {formData.length === 0 && (
            <p
              className=" px-4 py-5 sm:px-6 text-gray-500 text-sm
          sm:flex items-center"
            >
              No Reoccuring expense
            </p>
          )}
          {formData.map((element, index) => {
            return (
              <div
                id={element?._id}
                key={index}
                name={`expense-${index}`}
                className="bg-white px-4 py-5 sm:px-6 even:bg-gray-50 
                sm:flex items-center sm:gap-4
                grid grid-cols-1 gap-2"
              >
                <Button
                  className="text-sm text-red-500 
                  sm:left-0 sm:ml-7 hover:underline order-1"
                  variant={"link"}
                  onClick={(e) => {
                    e.preventDefault();
                    const newFormData = [...formData];
                    newFormData.splice(index, 1);
                    setFormData(newFormData);
                  }}
                >
                  <IoTrashOutline className="text-lg mt-2 sm:mt-0" />
                </Button>

                <div className="relative min-w-28">
                  <Input
                    className="relative z-10 pl-5"
                    required
                    placeholder="Amount"
                    id={`amount-${index}`}
                    type="number"
                    step="0.5"
                    value={amounts[index]}
                    onChange={(e) => {
                      const newAmounts = [...amounts];
                      newAmounts[index] = e.target.value;
                      setAmounts(newAmounts);
                    }}
                  />
                  <span className="absolute left-2 top-2 z-10 text-gray-500">
                    $
                  </span>
                </div>

                <Input
                  required
                  placeholder="Expense name"
                  id={`name-${index}`}
                  type="text"
                  value={names[index]}
                  onChange={(e) => {
                    const newNames = [...names];
                    newNames[index] = e.target.value;
                    setNames(newNames);
                  }}
                />
                <Select
                  // ref={selectRef}
                  required
                  className="flex-grow-0 flex-shrink-0 basis-1/2"
                  getOptionValue={(option) => option}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={true}
                  isSearchable={true}
                  name="expenses-category"
                  options={categories.map((category) => {
                    return { name: category.name, label: category.name };
                  })}
                  // Set the default value to the current category element.category
                  value={selectedCategories[index]}
                  onChange={(option) => {
                    const newSelectedCategories = [...selectedCategories];
                    newSelectedCategories[index] = option;
                    setSelectedCategories(newSelectedCategories);
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="section-padding flex justify-end">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            type="submit"
            loadingManually={loading}
          >
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
