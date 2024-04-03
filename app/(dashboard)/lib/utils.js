// This will be used to format the spending amount as USD
export const formatUSD = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  };
  


export const generateFakeSpendingData = () => {
  const categories = spendingCategories.map((category) => category.name);
  const data = [];

  for (let i = 0; i < 100; i++) {
    const randomCategory =
      categories[Math.floor(Math.random() * categories.length)];
    const randomDay = Math.floor(Math.random() * 30) + 1;
    const randomMonth = Math.floor(Math.random() * 2) + 3; // 3 for March, 4 for April
    const randomDate = new Date(2024, randomMonth - 1, randomDay).toISOString();
    const randomAmount = (Math.random() * 500 + 1).toFixed(2);

    const item = {
      userid: "ika05010",
      category: randomCategory,
      name: `${randomCategory} spending`,
      date: randomDate,
      amount: randomAmount,
    };

    data.push(item);
  }

  console.log(JSON.stringify(data, null, 2));
};