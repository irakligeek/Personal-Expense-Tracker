"use client";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import HeadingMain from "@/app/components/ui/HeadingMain";
import Subheading from "@/app/components/ui/Subheading";
import Select from "react-select"; //https://react-select.com/styles
import { useState, useEffect, useRef, useContext } from "react";
import UserNotification from "@/app/components/UserNotification";
import { ModalContext } from "@/app/context/modalContext";

export default function NewExpenseForm() {
  const { setModalClose } = useContext(ModalContext);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorObj, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "",
    label: "",
  });
  //create formRef so you can reset the form after submission
  const formRef = useRef();
  const selectRef = useRef();
  //Fetch categories from the server and update the categories state
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
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    //Make POST call to 'api/expenses' to add expense to the database, use try catch block
    try {
      const response = await fetch("/api/expenses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // set error message
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();
      const { error, message } = jsonData.response;

      let responseMessage = { error, message };
      //add optional field to the responseMessage if it is provided
      if (jsonData.response.field) {
        responseMessage = {
          ...responseMessage,
          field: jsonData.response.field,
        };
      }

      responseMessage.key = Math.random();

      setError(responseMessage);

      if (!error) {
        //reset the form after successful submission and close the modal
        resetForm();
        setModalClose(true); // close modal
      }
    } catch (error) {
      console.error("Error", error);
    }

    setIsLoading(false);
  };

  const resetForm = () => {
    formRef.current.reset();
    selectRef.current.clearValue();
  };

  //@todo add reoccuring expenses checkbox to the form
  return (
    <>
      {errorObj?.error && errorObj?.message && (
        <UserNotification type="error" key={errorObj.key}>
          {errorObj.message}
        </UserNotification>
      )}
      {!errorObj?.error && errorObj?.message && (
        <UserNotification type="success" key={errorObj.key}>
          {errorObj.message}
        </UserNotification>
      )}

      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="section-padding">
          <HeadingMain>Add Expense</HeadingMain>
          <Subheading>
            Add your spending amount, category and optional name
          </Subheading>

          <div className="sm:grid sm:grid-cols-[0.5fr_1fr] gap-4 flex flex-col">
            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="text-sm font-medium text-gray-500 self-center"
              >
                Amount
              </label>
              <Input
                className={`${
                  errorObj?.field === "amount" ? "border border-red-500" : ""
                }`}
                id="amount"
                placeholder="$0.00"
                type="number"
                name="amount"
                step="0.5"
                required
                onChange={() =>
                  setError((prev) => {
                    return { ...prev, field: null };
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-500 self-center"
              >
                Category
              </label>
              <Select
                className={`${
                  errorObj?.field === "category"
                    ? "rounded-md border border-red-500"
                    : ""
                }`}
                ref={selectRef}
                required
                getOptionValue={(option) => option}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    boxShadow: state.isFocused
                      ? "0 0 0 3px rgba(0, 123, 255, 0.25)"
                      : "0", // Add your offset here
                  }),
                  menuList: (base) => ({
                    ...base,
                    height: "180px",
                    overflowY: "scroll",
                  }),
                  placeholder: (base) => ({
                    ...base,
                    fontSize: "14px", // Change the font size here
                    color: "#A5A5A5",
                  }),
                  option: (
                    styles,
                    { data, isDisabled, isFocused, isSelected }
                  ) => {
                    let color;
                    //map cagegory colors to the options
                    categories.map((category) => {
                      if (data.label === category.name) {
                        color = category.color;
                      }
                    });
                    return {
                      ...styles,
                      backgroundColor: isDisabled
                        ? null
                        : isSelected
                        ? styles.backgroundColor
                        : isFocused
                        ? "#f5f5f5"
                        : null,
                      borderRight: `6px solid ${color}`,
                    };
                  },
                }}
                isDisabled={false}
                isLoading={false}
                isClearable={true}
                isSearchable={true}
                name="category"
                options={categories.map((category) => {
                  return { name: category.name, label: category.name };
                })}
                value={categories.find(
                  (category) => category.name === selectedCategory
                )}
                onChange={(option) => {
                  setError((prev) => {
                    return { ...prev, field: null };
                  });
                  setSelectedCategory(option);
                }}
              />
            </div>
            <div className="space-y-2 col-span-full">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-500 self-center"
              >
                Name (optional)
              </label>
              <Input
                id="name"
                placeholder="Ex. Weekly shopping"
                type="text"
                name="name"
                onChange={() =>
                  setError((prev) => {
                    return { ...prev, field: null };
                  })
                }
                className={`${
                  errorObj?.field === "name" ? "border border-red-500" : ""
                }`}
              />
            </div>
          </div>
        </div>
        <div className="section-padding flex justify-end ">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            type="submit"
            loading={true}
            loadingManually={isLoading}
          >
            Add Expense
          </Button>
        </div>
        <input
          type="hidden"
          name="selectedCategory"
          value={selectedCategory?.name}
        />
      </form>
    </>
  );
}
