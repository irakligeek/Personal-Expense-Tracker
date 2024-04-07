"use server";

export async function saveSettings(prevState, formData) {
  //must be integer
  const budget = formData.get("budget");
  //array of category objects with name and color properties
  let categories = formData.get("categories");
  if (categories) {
    categories = JSON.parse(categories);
  }

  // 1 . validate data

  // 2. save data to database

  // 2. return success message or error message based on the result

  //test
  return {
    message: "Settings saved successfully",
  };
}
