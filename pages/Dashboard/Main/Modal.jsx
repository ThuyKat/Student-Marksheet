import studentImg from "../../../student.png" 

export default function Modal({selectedStudent,setShowModal}){
    return(
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
        <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        
        <div className="p-6">
        <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Student Details</h2>
            <button
            onClick={() => setShowModal(false)}
            className="text-gray-400 hover:text-gray-500"
            >
            <i className="fas fa-times"></i>
            </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
                <img
                    src={studentImg}
                    alt={selectedStudent.name}
                    className="w-32 h-32 rounded-full"
                />
                <div>
                    <h3 className="font-medium text-gray-900">Name</h3>
                    <p>{selectedStudent.name}</p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-900">Student ID</h3>
                    <p>{selectedStudent.regNo}</p>
                </div>
            </div>
            <div className="space-y-4">
                <div>
                    <h3 className="font-medium text-gray-900">Grade</h3>
                    <p>{selectedStudent.grade}</p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-900">GPA</h3>
                    <p>{selectedStudent.percentage}</p>
                </div>
            
            </div>
        </div>
        <div className="mt-6">
            <h3 className="font-medium text-gray-900 mb-2">Subject Scores</h3>
            <div className="space-y-2">
              {Object.entries(selectedStudent.marks).map((subject) => (
                <div key={subject[0]} className="flex justify-between">
                  <span>{subject[0]}</span>
                  <span>{subject[1]}%</span>
                </div>
              ))}
            </div>
        </div>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex justify-end">
            <button
                onClick={() => setShowModal(false)}
                className="!rounded-button px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 whitespace-nowrap"
            >
                Close
            </button>
        </div>
    </div>
    </div>
      
      )
}