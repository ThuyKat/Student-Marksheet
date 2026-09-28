import { initializeApp } from "firebase/app";
import { getDatabase, ref,child, set,get} from 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyBn7mchuXS8VgD1sd8lYGaMZ6fiQ2hhbmI",
    authDomain: "student-marksheet-49296.firebaseapp.com",
    projectId: "student-marksheet-49296",
    storageBucket: "student-marksheet-49296.firebasestorage.app",
    messagingSenderId: "53012535239",
    appId: "1:53012535239:web:ead64ba994af34eb95abe2",
    measurementId: "G-CY1MDFG2V0",
    databaseURL:process.env.FIREBASE_DATABASE_URL
  };

// Initialize Firebase
let app;
let database;

try {
  app = initializeApp(firebaseConfig);
  database = getDatabase(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}
//DB reference
const referenceInDB = ref(database,"students")
export default async function handler(event,context) {
    console.log('hello')
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS, GET',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    }
    
    

    try {
        // Handle OPTIONS request
        if (event.httpMethod === 'OPTIONS') {
            return new Response(null, { status: 204, headers });
        }
        // Create Request object and parse JSON
        const request = new Request(event.url, {
        method: event.method,
        headers: event.headers,
        body: event.body,
        duplex: 'half'  // Required in Node.js when sending a body
        })
       

        switch(request.method){
            case 'POST':
                try {
                    
                    const resultData = await request.json();
                    console.log('Parsed request body:', resultData)

                    const studentRef =child(referenceInDB,resultData.regNo)
                    await set(studentRef,{
                        name:resultData.name,
                        regNo:resultData.regNo,
                        marks:resultData.marks,
                        totalMark:resultData.totalMark,
                        percentage:resultData.percentage,
                        grade:resultData.grade,
                        timestamp:Date.now()
                    })
                    return new Response(
                        JSON.stringify({ 
                          message: 'Student result saved successfully',
                          data: resultData 
                        }),
                        {
                          status: 200,
                          headers: {
                            'Content-Type': 'application/json'
                          }
                        }
                      )
                    
                } catch (error) {
                    return new Response(
                        JSON.stringify({ 
                          message: 'Error saving student result',
                          error: error.message 
                        }),{
                            status:500,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                      
                }
            case 'GET':
                try {
                    // Extract query parameters
                    const { regNo } = event.queryStringParameters || {}
                    if (!regNo) {
                        // Fetch all students if no specific regNo provided
                        const snapshot = await get(referenceInDB)
                        return new Response( JSON.stringify({
                              message: 'All students retrieved',
                              data: snapshot.val() || {}
                            }),
                            {
                                status: 200,
                                headers: {
                                  'Content-Type': 'application/json'
                                }
                              }
                        )
                    }
                    // Fetch specific student
                    const studentRef =ref(referenceInDB,regNo)
                    const snapshot = await get(studentRef)
                    if (snapshot.exists()) {
                        return new Response(
                            JSON.stringify({
                              message: 'Results retrieved',
                              data: snapshot.val() || {}
                            }),
                            {
                              status: 200,
                              headers: {
                                'Content-Type': 'application/json'
                              }
                            }
                          )
                    } else {
                        return new Response(
                            JSON.stringify({
                                message:'Student not found',

                            }),
                            {
                                status:404,
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            }
                        )
                    }

                    
                } catch (error) {
                    return new Response(
                        JSON.stringify({
                            message:"Error retrieving student",
                            error:error.message

                        }),
                        {
                            status:500,
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        }
                    )
                }
            default:
                return new Response(
                    JSON.stringify({
                        message:'Method Not Allowed',

                    }),
                    {
                        status:405,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                )
        }

    
    } catch (error) {
        console.error('Server error:', error);
        return new Response(
                    JSON.stringify({
                        error: 'Server error',
                        message: error.message,
                        stack: error.stack
                    }),
                    { status: 500, headers: {
                        'Content-Type': 'application/json'
                    } }
                )
    }

}