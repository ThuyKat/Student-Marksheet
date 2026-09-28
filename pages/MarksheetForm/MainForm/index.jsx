import { useState } from "react"
import Subject from "./Subject"
import { studentResultsApi } from "../../../firebaseConfig2"
export default function Main() {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    marks: {
      math: "",
      physics: "",
      chemistry: "",
      biology: "",
      english: "",
    },
  });
  const [result, setResult] = useState({
    isEmpty: true,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  function handleChange(e, category) {
    const { name, value } = e.target;
    setFormData((prevData) => {
      if (category) {
        return {
          ...prevData,
          [category]: {
            ...prevData[category],
            [name.split(".")[1]]: value,
          },
        };
      } else {
        return {
          ...prevData,
          [name]: value,
        };
      }
    });
  }

  async function submitForm(FormData) {
    // auto handle e.preventDefault and form reset
    if (!FormData.get("name") || !FormData.get("regNo")) {
      setError("Please fill in all student information");
      return;
    }
    if (FormData.get("regNo").length !== 10) {
      setError("Registration number must be 10 digits");
      return;
    }
    const hasEmptyMarks = Object.values(formData.marks).some(
      (mark) => mark === ""
    );
    if (hasEmptyMarks) {
      setError("Please enter marks for all subjects");
      return;
    }
    //calculate total marks
    const data = Object.fromEntries(FormData);

    const allMarks = Object.entries(data)
      .filter((el) => el[0].startsWith("marks."))
      .map((el) => Number(el[1]));
    const totalMark = allMarks.reduce((sum, current) => sum + current, 0);
    //calculate percentage
    const percentage = ((totalMark / 500) * 100).toFixed(2);
    //calculate grade
    const grade = (() => {
      switch (true) {
        case percentage >= 90:
          return "A";
        case percentage >= 80:
          return "B";
        case percentage >= 70:
          return "C";
        case percentage >= 60:
          return "D";
        case percentage >= 50:
          return "E";
        default:
          return "F";
      }
    })();
    const finalResult = {
      name: FormData.get("name"),
      regNo: FormData.get("regNo"),
      totalMark,
      percentage,
      grade,
    };
    //display result
    setResult((prevResult) => ({
      ...finalResult,
      isEmpty: false,
    }));
    //save result to database
    try {
      // Save to Firebase using the utility function
      await studentResultsApi.saveResult( {
        ...finalResult,
        marks: formData.marks,
      });
      setError("");
      setSuccess("Marksheet submitted successfully!");
    } catch (error) {
      console.error("unable to submit marksheet", error);
      setError("Faild to save result");
    }
  }
  function handleReset() {
    setFormData({
      name: "",
      regNo: "",
      marks: {
        math: "",
        physics: "",
        chemistry: "",
        biology: "",
        english: "",
      },
    });
  }

  return (
    <main>
      <form action={submitForm} className="p-8">
        {/* Student Information */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              {" "}
              Student Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter student name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></input>
          </div>
          <div>
            <label
              htmlFor="regNo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Registration Number
            </label>
            <input
              id="regNo"
              type="text"
              name="regNo"
              maxLength={10}
              pattern="\d*"
              placeholder="Enter 10-digit number"
              value={formData.regNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></input>
          </div>
        </div>
        {/* Marks Entry */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Subject Marks</h2>
          <div className="space-y-4">
            {Object.keys(formData.marks).map((subject) => (
              <Subject
                key={subject}
                id={subject}
                subjectName={subject}
                subjectMark={formData.marks[subject]}
                onChange={(e) => handleChange(e, "marks")}
                className="grid grid-cols-2 gap-4 items-center"
              />
            ))}
          </div>
        </div>
        {/* Error and Success Messages */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-md">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 p-4 bg-green-50 text-green-700 rounded-md">
            {success}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          {/* submit button */}
          <button
            type="submit"
            className="!rounded-button px-6 py-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            Submit
          </button>
          {/* reset button */}
          <button
            type="reset"
            onClick={handleReset}
            className="!rounded-button px-6 py-2 bg-gray-500 text-white hover:bg-gray-600 transition-colors whitespace-nowrap"
          >
            Reset
          </button>
        </div>
      </form>

      {!result.isEmpty && (
        <div className="mb-8 p-6 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Result Preview</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600">Student Name:</p>
              <p className="font-medium">{result.name}</p>
            </div>
            <div>
              <p className="text-gray-600">Registration Number:</p>
              <p className="font-medium">{result.regNo}</p>
            </div>
            <div>
              <p className="text-gray-600">Total Marks:</p>
              <p className="font-medium">{result.totalMark}</p>
            </div>
            <div>
              <p className="text-gray-600">Percentage:</p>
              <p className="font-medium">{result.percentage}%</p>
            </div>
            <div>
              <p className="text-gray-600">Grade:</p>
              <p className="font-medium">{result.grade}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
