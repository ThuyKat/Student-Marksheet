import studentImg from "../../../student.png" 
export default function Student({student,showModal}){
    return(
        <tr>
            
            <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img className="h-10 w-10 rounded-full" src={studentImg} alt="" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        <div className="text-sm text-gray-500">{student.regNo}</div>
                      </div>
                    </div>     
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.grade}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.percentage}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                    onClick={showModal}
                    className="!rounded-button text-indigo-600 hover:text-indigo-900 whitespace-nowrap"
                >
                    View Details
                </button>
            </td>


        </tr>
        
    )
}