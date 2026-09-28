import axios from "axios";
export const studentResultsApi = {
  saveResult: async (resultData) => {
    try {
      const response = await axios.post(
        "/.netlify/functions/firebaseHandler",
        resultData, {headers: {
            'Content-Type': 'application/json'
          }});
      return response.data;
    } catch (error) {
        console.error('Error Details:', {
            message: error.message,
            code: error.code,
            response: error.response,
            request: error.request,
            config: error.config
          });
    }
  },
  //Get result of a student
  getResult: async (studentId) => {
    try {
      const response = await axios.get(
        `/.netlify/functions/firebaseHandler?regNo=${regNo}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching result:", error);
    }
  },
   //Get result of all students
  getResults: async () => {
    try {
      const response = await axios.get("/.netlify/functions/firebaseHandler");
      return response.data;
      console.log("get response",response)
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }
};
