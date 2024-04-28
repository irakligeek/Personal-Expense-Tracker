"use client";
import Button from "@/app/components/ui/Button";
import Input from "@/app/components/ui/Input";
import HeadingMain from "@/app/components/ui/HeadingMain";
import Subheading from "@/app/components/ui/Subheading";
import Select from "react-select"; //https://react-select.com/styles
import { useState, useEffect } from "react";
import { useFormState } from "react-dom";
import { addExpense } from "@/app/actions/add-expense/actions";

export default function NewExpenseForm() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null); //selected category from the dropdown

  const [state, formAction] = useFormState(addExpense, {
    message: null,
    error: false,
  });

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

  console.log("categories", selectedCategory);
  return (
    <form action={formAction}>
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
              id="amount"
              placeholder="$0.00"
              type="number"
              name="amount"
              required
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
            />
          </div>
        </div>
      </div>
      <div className="section-padding flex justify-end ">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          type="submit"
          loading={true}
        >
          Add Expense
        </Button>
      </div>
      {/* Add categories name property into the hidden input value */}

      <input type="hidden" name="selectedCategory" value={selectedCategory?.name}/>
    </form>
  );
}
