import { useState, useEffect } from "react";

export default function UserNotification({ children, type }) {
  const [isVisible, setIsVisible] = useState(true);
  const [animation, setAnimation] = useState("fade-in");

  let classes = "";
  if (type === "success") {
    classes = "bg-green-50 border-green-500 border-l-4";
  } else if (type === "error") {
    classes = "bg-red-50 border-red-500 border-l-4";
  } else if (type === "warning") {
    classes = "bg-yellow-50 border-yellow-500 border-l-4";
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation('fade-out');
      const removeTimer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // same duration as the fade-out animation
      return () => clearTimeout(removeTimer);
    }, 3000);
  
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setAnimation('fade-out');
    setTimeout(() => {
      setIsVisible(false);
    }, 500); // same duration as the fade-out animation
  };

  return isVisible && (
    <div
      className={`${classes} ${animation} p-7 pr-12 absolute top-4 
      max-w-full z-50 w-max min-w-80 shadow-md
      left-1/2 transform -translate-x-1/2`}
      onAnimationEnd={() => !isVisible && setIsVisible(false)}
    >
      <button className="absolute right-6" onClick={handleClose}>
        <svg
          className="text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      {children}
    </div>
  );
}
