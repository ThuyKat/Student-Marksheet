import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSchool } from '@fortawesome/free-solid-svg-icons'
import {Link} from "react-router-dom"

export default function Header(){
    return(
        <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <FontAwesomeIcon 
                        icon={faSchool} 
                        className="h-8 text-indigo-500" 
                        />
                        <h1 className="text-2xl font-bold text-gray-900">Student Performance Dashboard</h1>
                    </div>
                    <div className="flex items-center space-x-4">
                    <Link to="/"  
                    className="!rounded-button px-4 py-2 bg-indigo-600 text-white hover:bg-indigo-700 whitespace-nowrap"
                        > 👉 Back To Marksheet</Link>   
                    </div>
                </div>
            </div>
      </header>
    )
}