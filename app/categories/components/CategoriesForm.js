"use client";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import HeadingMain from "@/app/components/ui/HeadingMain";
import Subheading from "@/app/components/ui/Subheading";
import { useState, useRef, useEffect } from "react";
import { saveCategories } from "@/app/actions/save-settings/actions";
import { useFormState } from "react-dom";
import UserNotification from "@/app/components/UserNotification";

const defaultCategoryColor = "#FFC107";
const initialErrorState = {
  message: null,
  error: false,
  input: null,
  count: 0,
  warning: false,
};

export default function CategoriesForm() {
  const [state, formAction] = useFormState(saveCategories, {
    message: null,
    error: false,
  });
  const [categories, setCategories] = useState([]);
  const [isCategoryEditable, setCategoryEditable] = useState(false);
  const [randomColor, setRandomColor] = useState(defaultCategoryColor);
  const categoryNameRef = useRef();
  const categoryColorRef = useRef();
  const [errorState, setErrorState] = useState(initialErrorState);

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

  //Set error state based on the error from the server action
  useEffect(() => {
    setErrorState({
      message: state.message,
      error: state.error,
      count: Math.random(),
      warning: state.warning,
    });
  }, [state]);

  //Generate random color debounce method
  useEffect(() => {
    const delay = setTimeout(() => {
      const randomColor =
        "#" + Math.floor(Math.random() * 16777215).toString(16);
      categoryColorRef.current.value = randomColor;
    }, 500);
    return () => clearTimeout(delay);
  }, [randomColor]);

  const handleAddCategory = (e) => {
    e.preventDefault();
    //reset error state
    setErrorState(initialErrorState);

    //check for duplicate category names
    const isDuplicate = categories.some(
      (category) =>
        category.name.toLowerCase() ===
        categoryNameRef.current.value.toLowerCase()
    );
    if (isDuplicate) {
      setErrorState({
        message: "Category name already exists",
        error: true,
        count: Math.random(),
        input: categoryNameRef.current.id,
      });

      return;
    }
    //Convert category name to Camel case
    let categoryName = categoryNameRef.current.value
      .split(" ")
      .map((word, index) => {
        if (word.length < 2) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
    const categoryColor = categoryColorRef.current.value;

    setCategories([
      ...categories,
      { name: categoryName, color: categoryColor },
    ]);

    //reset the input fields
    categoryNameRef.current.value = "";
    categoryColorRef.current.value = defaultCategoryColor;
  };

  const toggleEditCategory = (e, categoryIndex) => {
    e.preventDefault();

    setCategoryEditable((prevState) => ({
      ...prevState,
      [categoryIndex]: !prevState[categoryIndex],
    }));
  };

  const handleCategoryDelete = (e, categoryIndex) => {
    e.preventDefault();
    setCategories((prevCategories) => {
      const updatedCategories = [...prevCategories].filter(
        (el) => el !== prevCategories[categoryIndex]
      );
      return updatedCategories;
    });
  };

  const handleCategoryNameChange = (e) => {
    setErrorState(initialErrorState);
    setRandomColor(e.target.value);
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
      <form action={formAction} className="h-full flex flex-col">
        <div className="section-padding border-b border-gray-200">
          <HeadingMain>Categories</HeadingMain>
          <Subheading>
            Add your spending categories, based on your spending habits
          </Subheading>
        </div>
        <div>
          <dl>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 col-span-2">
                Add category
              </dt>
              <dd
                className="mt-1 text-sm text-gray-900 
          col-start-3 col-span-4
          sm:mt-0"
              >
                <div className="flex items-center gap-4">
                  <Input
                    className={`w-1/2 ${
                      errorState.input === "new-category" &&
                      "border-red-500 shadow-sm outline-none"
                    }`}
                    placeholder="Category name"
                    type="text"
                    name="category-name"
                    id="new-category"
                    ref={categoryNameRef}
                    required={categories.length === 0}
                    onChange={handleCategoryNameChange}
                  />
                  <Input
                    className="border-0 rounded-md flex flex-[1_0_38px] p-0"
                    type="color"
                    defaultValue={defaultCategoryColor}
                    name="category-color"
                    ref={categoryColorRef}
                  />
                  <Button
                    className="bg-transparent"
                    variant="ghost"
                    onClick={handleAddCategory}
                  >
                    Add
                  </Button>
                </div>
              </dd>
            </div>
          </dl>

          {/* Added categories */}
          {categories.length > 0 &&
            categories
              .filter((el) => el.name.toLowerCase() !== "other")
              .map((category, index) => (
                <div
                  key={index}
                  className="bg-white px-4 py-5 sm:grid sm:grid-cols-6 
            sm:gap-4 sm:px-6 even:bg-gray-50 relative"
                >
                  <div className="col-start-3 col-span-4">
                    <div className="flex items-center gap-4">
                      <Button
                        className="text-sm text-red-500 sm:absolute 
                  sm:left-0 sm:ml-7 hover:underline"
                        variant={"link"}
                        onClick={(e) => {
                          handleCategoryDelete(e, index);
                        }}
                      >
                        Delete
                      </Button>

                      <Input
                        required
                        disabled={!isCategoryEditable[index]}
                        style={isCategoryEditable[index] ? {} : { border: "0" }}
                        className={`w-1/2`}
                        placeholder="Category name"
                        id={`category-${index}`}
                        type="text"
                        value={categories[index].name}
                        onChange={(e) => {
                          setCategories((prevCategories) => {
                            const updatedCategories = [...prevCategories];
                            updatedCategories[index].name = e.target.value;
                            return updatedCategories;
                          });
                        }}
                      />
                      <Input
                        disabled={!isCategoryEditable[index]}
                        className="border-0 rounded-md flex flex-[1_0_38px] p-0"
                        type="color"
                        value={categories[index].color}
                        onChange={(e) => {
                          setCategories((prevCategories) => {
                            const updatedCategories = [...prevCategories];
                            updatedCategories[index].color = e.target.value;
                            return updatedCategories;
                          });
                        }}
                      />
                      <Button
                        type="button"
                        className="bg-transparent"
                        variant="ghost"
                        onClick={(e) => toggleEditCategory(e, index)}
                      >
                        {isCategoryEditable[index] ? "Save" : "Edit"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
        </div>
        <div className="section-padding flex justify-end">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            type="submit"
            loading={true}
          >
            Save & Finish
          </Button>
        </div>
        <input
          type="hidden"
          name="categories"
          value={JSON.stringify(categories)}
        />
      </form>
    </>
  );
}
