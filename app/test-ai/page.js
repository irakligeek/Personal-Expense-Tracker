"use client";

async function fetchEmojis() {
  try {
    const response = await fetch("/api/ai/generate-emojis", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category: "Car",
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const result = response.result;
    console.log("res____", result);
  } catch (error) {
    console.error(error);
  }
}

function handleClick(e) {
    console.log("clicked");
    fetchEmojis();
}

export default function Page() {
  return (
    <div>
      <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={handleClick}>Generate</button>
    </div>
  );
}
