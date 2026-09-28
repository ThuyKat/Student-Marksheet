export default function Subject(props){
    return(
        <div className="grid grid-cols-2 gap-4 items-center">
            <label className="text-gray-700"   htmlFor={props.subjectName}>{props.subjectName.toUpperCase()}</label>
            <input 
                id={props.subjectName}
                name={`marks.${props.subjectName}`}
                type="number"
                value={props.subjectMark}
                min="0"
                max="100"
                placeholder="Enter marks (0-100)"
                onChange={props.onChange}
                className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"

            ></input>
        </div>
    )
}