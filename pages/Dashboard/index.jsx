import Header from "./Header"
import Main from "./Main/index"
export default function Dashboard(){
    return(
        <div className="min-h-screen bg-gray-50">
            <Header/>
            <Main/>
        </div>
    )
}