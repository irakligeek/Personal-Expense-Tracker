"use client";

async function test() {
  try {
    const response = await fetch("/api/ai/assistant-ai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
  test();
}

export default function Page() {
  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleClick}
      >
        Generate
      </button>
    </div>
  );
}
