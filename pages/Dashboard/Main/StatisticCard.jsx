export default function StatisticCard(props){
    return(
        <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{props?.name}</h3>
            <p className="text-3xl font-bold text-indigo-600">{props?.value?`${props.value} %`:0}</p>
        </div>
    )
}