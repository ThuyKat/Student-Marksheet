

import ReactECharts from 'echarts-for-react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination, Autoplay } from 'swiper/modules';
import{useState, useEffect} from "react"
import {studentResultsApi} from "../../../firebaseConfig2"
import Student from './Student';
import Modal from './Modal';
import StatisticCard from './StatisticCard';

export default function Main(){
    //students state
    // fetch data from firebase
    // initalise students state
    const [students,setStudents] = useState([])
    const[selectedStudent,setSelectedStudent]=useState(null)
    const[showModal,setShowModal]=useState(false)
    useEffect(()=>{
        try{
            async function fetchData(){
                const response = await studentResultsApi.getResults()
                const studentData = response.data
                console.log(studentData)
                studentData?setStudents(Object.values(studentData)):null
            }
            fetchData()
        }catch(e){
            console.log(e)
        }
       
        
    },[])
   
    const barChartOption = {
        animation: false,
        title: {
            text: 'Grade Distribution',
            left: 'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            type: 'category',
            data: gradeFrequencies().map(obj => obj.grade)
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: gradeFrequencies().map(obj=>obj.frequencies),
            type: 'bar',
            color: '#4F46E5'
        }]
        }
    const pieChartOption={
        animation: false,
        title: {
          text: 'Pass/Fail Ratio',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        series: [{
          type: 'pie',
          radius: '50%',
          data: [
            { value: gradeFrequencies().reduce((sum,current)=>current.grade!=="F"?sum+current.frequencies:sum,0), name: 'Pass' },
            { value: gradeFrequencies().reduce((sum,current)=>current.grade ==="F"?sum+current.frequencies:sum,0), name: 'Fail' }
          ],
          color: ['#10B981', '#EF4444']
        }]
      
    }
    //function to find grade frequencies
    function gradeFrequencies(){
        const grades = students.map(student => student.grade)
        const allGrades=["A","B","C","D","E","F"]
        const gradeFrequencies = allGrades.map((grade) =>({grade,frequencies:grades.filter(el=>el===grade).length}))
       return gradeFrequencies
    }
     //function to toggle modal
    const handleActionClick = (student) => {
        setSelectedStudent(student);
        setShowModal(true);
    }
    //function to calculate performance review
    function calculatePerformanceOverview(){
        if(students.length===0 || !students){
           
            return {
                "Class Average":"-",
                "Highest Score":"-",
                "Pass Rate":"-"    
            }
        }
        const percentageArr = students.map(student=>student.percentage)
        const avgPercentage =( (percentageArr.reduce((sum,current)=>sum+Number(current),0))/students?.length).toFixed(2)
        const highestScore = Math.max(...percentageArr,0)
        const passRate = ((gradeFrequencies().reduce((sum,current)=>current.grade!=="F"?sum+current.frequencies:sum,0)/students.length)*100).toFixed(0)
        return {
            "Class Average":avgPercentage,
            "Highest Score":highestScore,
            "Pass Rate":passRate     
        }      
    }
   const performanceOverview = calculatePerformanceOverview()
   console.log(performanceOverview)
    
    return(
        <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Performance Overview Cards */}
        <div className="grid grid-cols-3 gap-6 mb-8">
            {Object.entries(performanceOverview).map(([name,value])=><StatisticCard key={name} name={name} value={value}/>)}
        </div>
        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-6 mb-8">
         <div className="bg-white p-6 rounded-lg shadow">
            <ReactECharts option={barChartOption} style={{ height: '300px' }}/>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
            <ReactECharts option={pieChartOption} style={{ height: '300px' }}/>
        </div>
        </div>
         {/* Student Results Table */}
         <div className="bg-white rounded-lg shadow overflow-hidden">

         <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
                <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Grade
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        GPA
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
                {students.map(student =><Student key={student.regNo} student={student} showModal={()=>handleActionClick(student)}/>)}
            </tbody>
         </table>
         </div>
          {/* Student Detail Modal */}
          {showModal && selectedStudent && <Modal selectedStudent={selectedStudent} setShowModal={setShowModal}/>}

        </main> 

    )
}