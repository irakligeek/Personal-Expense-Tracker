"use client";
import Input from "./components/ui/Input";
import Button from "./components/ui/Button";
import HeadingMain from "@/app/components/ui/HeadingMain";
import Subheading from "@/app/components/ui/Subheading";
import Panel from "@/app/components/ui/Panel";

import { useState, useRef } from "react";

export default function SettingsPage() {
  const categoryNameRef = useRef();
  const categoryColorRef = useRef();
  const [categories, setCategories] = useState([]);
  const defaultCategoryColor = "#FFC107";

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

    console.log(categories); // This will log the updated categories
  };

  return (
    <Panel>
      <form action="" className="h-full flex flex-col">
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
                />
              </dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Spending categories
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Input
                      className="w-1/2"
                      placeholder="Category name"
                      type="text"
                      name="category-name"
                      ref={categoryNameRef}
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
                </div>
              </dd>
            </div>
          </dl>

          {/* Added categories */}

          {categories.length > 0 &&
            categories.map((category, index) => (
              <form className="space-y-4 text-sm text-gray-900 gray-50 px-4 py-5">
                <div className="flex items-center gap-4">
                  <Input
                    disabled
                    className="w-1/2 border-0 "
                    placeholder="Category name"
                    type="text"
                    value={category.name}
                  />
                  <Input
                    disabled
                    className="border-0 rounded-md flex flex-[1_0_38px] p-0"
                    type="color"
                    defaultValue={defaultCategoryColor}
                    value={category.color}
                  />
                  <Button className="bg-transparent" variant="ghost">
                    Edit
                  </Button>
                </div>
              </form>
            ))}


        </div>
        <div className="section-padding flex justify-end items-end m-[auto_0_0_0]">
          <Button
            className="bg-blue-600 hover:bg-blue-700"
            type="submit"
            loading={false}
          >
            Save & Finish
          </Button>
        </div>
      </form>
    </Panel>
  );
}
