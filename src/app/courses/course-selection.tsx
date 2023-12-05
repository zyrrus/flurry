"use client";

import { type FormEvent, useState } from "react";

export default function CourseSelection() {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedLanguage(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    // Handle form submission logic here, e.g., send selectedLanguage to the server
    console.log("Selected language:", selectedLanguage);
  };

  return (
    <form className="flex flex-col gap-y-2" onSubmit={handleSubmit}>
      <label htmlFor="course-select">Select a language:</label>
      <select
        id="course-select"
        name="course"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className="border"
      >
        <option value="">Select...</option>
        <option value="Japanese">Japanese 🇯🇵</option>
        <option value="French">French 🇫🇷</option>
      </select>
      <button type="submit" className="border">
        Submit
      </button>
    </form>
  );
}
