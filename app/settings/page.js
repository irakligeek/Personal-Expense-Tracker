"use client";
import Input from "@/app/components/ui/Input";
import Button from "@/app/components/ui/Button";
import HeadingMain from "@/app/components/ui/HeadingMain";
import Subheading from "@/app/components/ui/Subheading";
import Panel from "@/app/components/ui/Panel";
import { useState, useRef } from "react";
import { saveSettings } from "@/app/actions/save-settings/actions";
import { useFormState } from "react-dom";

const initialState = {
  message: null,
  error: false,
};
const defaultCategoryColor = "#FFC107";

export default function SettingsPage() {
  const categoryNameRef = useRef();
  const categoryColorRef = useRef();
  const [categories, setCategories] = useState([]);
  const [isCategoryEditable, setCategoryEditable] = useState(false);

  const [state, formAction] = useFormState(saveSettings, initialState);

  //@todo Use state object to inform the user about the status of the form submission

  const handleAddCategory = (e) => {
    e.preventDefault();

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
    console.log("categoryIndex", categoryIndex);
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

  return (
    <Panel>
      <form action={formAction} className="h-full flex flex-col">
        <div className="section-padding border-b border-gray-200">
          <HeadingMain>Settings</HeadingMain>
          <Subheading>
            Set up your monthly spending budget and expense categories
          </Subheading>
        </div>
        <div>
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Monthly spending budget $
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <Input
                  className="w-full"
                  placeholder="Enter your monthly budget"
                  type="number"
                  name="budget"
                  required
                />
              </dd>
            </div>

            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-6 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500 col-span-2">
                Spending categories
              </dt>
              <dd
                className="mt-1 text-sm text-gray-900 
              col-start-3 col-span-4
              sm:mt-0"
              >
                <div className="flex items-center gap-4">
                  <Input
                    className="w-1/2"
                    placeholder="Category name"
                    type="text"
                    name="category-name"
                    ref={categoryNameRef}
                    required={categories.length === 0}
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
            categories.map((category, index) => (
              <div
                key={index}
                className="bg-white px-4 py-5 sm:grid sm:grid-cols-6 
                sm:gap-4 sm:px-6 even:bg-gray-50 relative"
              >
                <div className="col-start-3 col-span-4">
                  <div className="flex items-center gap-4">
                    {isCategoryEditable[index] && (
                      <Button
                        className="text-sm text-red-500 sm:absolute sm:left-0 sm:ml-7 hover:underline"
                        variant={"link"}
                        onClick={(e) => {
                          handleCategoryDelete(e, index);
                        }}
                      >
                        Delete
                      </Button>
                    )}

                    <Input
                      required
                      disabled={!isCategoryEditable[index]}
                      style={isCategoryEditable[index] ? {} : { border: "0" }}                      className={`w-1/2`}
                      placeholder="Category name"
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
        <div className="section-padding flex justify-end items-end m-[auto_0_0_0]">
          <Button className="bg-blue-600 hover:bg-blue-700" type="submit">
            Save & Finish
          </Button>
        </div>
        <input
          type="hidden"
          name="categories"
          value={JSON.stringify(categories)}
        />
      </form>
    </Panel>
  );
}
