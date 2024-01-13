import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../../CSS/Home.css';
import { useNavigate } from "react-router-dom";
import avater from '../../../assets/Images/avater.png';
// import axios from "axios";
import Student from "./Student";


function Students() {

  const navigation = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const user = params.get('course');
  let code = user.split('CSEC');
  code = 'CSEC' + code[1];
  const [showNewCourse, setShowNewCourse] = useState(0);
  const [account, setAccount] = useState(0);
  const [attendanceData, setAttendanceData] = useState({})
  const [showDelConf, setShowDelConf] = useState(0);
  const [today, setToday] = useState('');
  const [height,setHeight] = useState('100vh');

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    setToday(date);
    const calculatedHeight = window.innerHeight - 191;
    setHeight(calculatedHeight);
    console.log(height)
  }, [height])



  const openCourseAdd = () => {
    setShowNewCourse(1);
  }

  const closeCourseAdd = () => {
    setShowNewCourse(0);
  }

  const handleLogOut = () => {
    setAccount(1);
  }

  const handleLogOutConf = () => {
    setAccount(0);
    navigation('/');
  }

  const updateData = (key, value) => {
    setAttendanceData(prevAttendanceData => ({ ...prevAttendanceData, [key]: value }))
    console.log(attendanceData);
  };

  const handleNewCourseAddition = async (e) => {
    e.preventDefault();
    // const code = e.target.code.value;
    // const title = e.target.title.value;
    // const num = Math.floor(Math.random() * 10) +1;
    // const img = `/src/assets/Images/batchBg${num}.jpg`;
    // console.log(code,title);
    // try{
    //   const response = await axios.post(`http://localhost:3000/addCourse/${user}`, {code,title,img});
    //   console.log(response.message);
    //   setShowNewCourse(0);
    //   if(rerend){
    //     setRerend(0);
    //   }else{
    //     setRerend(1);
    //   }
    // }catch (error) {
    //   console.error('Error adding data:', error);
    // }
    setShowNewCourse(0);
  }

  const handleDelConf = async () => {
    // try{
    //   const response = await axios.post(`http://localhost:3000/deleteBatch/${userReq}`, delData);
    //   console.log(response.message);
    //   setShowNewBatch(0);
    //   if(rerend){
    //     setRerend(0);
    //   }else{
    //     setRerend(1);
    //   }
    // }catch (error) {
    //   console.error('Error adding data:', error);
    // }
    setShowDelConf(0)
  }

  const handleDelCancel = () => {
    setShowDelConf(0);
  }

  const upDateDelData = (data) => {
    setShowDelConf(data);
  }

  const saveData = () => {
    console.log(today);
  }

  const handleDateChange = (e) => {
    const date = e.target.value;
    setToday(date);
  }

  return (
    <div className="overflow-hidden">
      <div className='bg-[#181818] text-white flex justify-between align-items-center w-full py-4 md:px-10 sm:px-6 px-2'>
        <div className='text-3xl font-semibold'>
          <h1 className='cursor-pointer'>Students</h1>
        </div>
        <div className='text-2xl font-semibold sm:block hidden'>
          <h1 className='select-none'>{code}</h1>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='w-10 h-10 border-2 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#7b7b7b]'>
            <span className='text-2xl' onClick={openCourseAdd}>+</span>
            {
              showNewCourse ?
                <div className='cursor-default w-screen h-screen absolute top-0 left-0 bg-[#000000de] z-[2] flex justify-center items-center'>
                  <form className='p-4 border-2 flex flex-col rounded relative bg-black w-full h-full sm:w-max sm:h-max' onSubmit={handleNewCourseAddition}>
                    <span className='absolute top-0 right-0 text-3xl pr-2 rotate-45 cursor-pointer' onClick={closeCourseAdd}>+</span>
                    <h1 className='text-center text-xl font-semibold pb-4'>Add new Course</h1>
                    <div className='flex flex-col max-w-60 self-center'>
                      <div className='pb-2'>
                        <label htmlFor="code" className='font-medium'>Id:</label>
                        <input type="text" id='code' placeholder='Enter course code' required className='w-full p-2 bg-[#0000009c] border-[2px] rounded outline-none focus:border-[#4f8dff]' />
                      </div>
                      <div className='pb-2'>
                        <label htmlFor="title" className='font-medium'>Name:</label>
                        <input type="text" id='title' placeholder='Enter course title' required className='w-full p-2 bg-[#0000009c] border-[2px] rounded outline-none focus:border-[#4f8dff]' />
                      </div>
                      <div className='pb-2'>
                        <label htmlFor="title" className='font-medium'>Batch No.:</label>
                        <input type="text" id='title' placeholder='Enter course title' required className='w-full p-2 bg-[#0000009c] border-[2px] rounded outline-none focus:border-[#4f8dff]' />
                      </div>
                      <div className='pb-2'>
                        <label htmlFor="title" className='font-medium'>Section::</label>
                        <input type="text" id='title' placeholder='Enter course title' required className='w-full p-2 bg-[#0000009c] border-[2px] rounded outline-none focus:border-[#4f8dff]' />
                      </div>
                      <button type='submit' className='border-2 rounded px-4 py-2 w-max hover:bg-[#7b7b7b] cursor-pointer'>Add Now</button>
                    </div>
                  </form>
                </div>
                :
                ''
            }
          </div>
          <div className='w-10 h-10 rounded-full cursor-pointer relative' onClick={handleLogOut}>
            <img src={avater} className='w-10 h-10 rounded-full' />
            {
              account ?
                <div className='absolute top-10 left-[-12px] text-black bg-white py-1 px-2 rounded-full' onClick={handleLogOutConf}>Logout</div>
                :
                ''
            }
          </div>
        </div>
      </div>
      <div className="w-full flex justify-between text-white pt-4 px-4">
        <div className="font-semibold text-xl">Software Engineering</div>
        <div>
          <input type="date" id="dateInput" value={today} onChange={handleDateChange} className="w-[28px] xxsm:w-full text-white border-2 rounded bg-black xxsm:px-[4px]" />
        </div>
      </div>
      <div className={`hide-scrollbar w-full xxsm:overflow-y-scroll xxsm:overflow-x-hidden overflow-scroll py-6 px-4 h-[${height}px] mb-4`}>
        <table className="text-white border-2 w-full border-collapse min-w-[500px]">
          <thead>
            <tr className="border-2">
              <th className="border-2">Batch</th>
              <th className="border-2">Section</th>
              <th className="border-2">Name</th>
              <th className="border-2">ID</th>
              <th className="border-2">Present</th>
              <th className="border-2">Absent</th>
              <th className="border-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <Student id='2211081038' upDateDel={upDateDelData} onDataUpdate={updateData} />
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end px-4">
        <button onClick={saveData} className="border-2 py-2 px-4 text-white rounded">Save Attendance</button>
      </div>
      {
        showDelConf ?
          <div className='absolute z-[3] top-0 left-0 w-screen h-screen bg-[#000000de] flex justify-center items-center'>
            <div className='border-2 rounded py-3 px-5 text-white bg-black'>
              <div className='pb-4'>
                <h1 className='text-3xl text-center'>Are you sure?</h1>
                <h2 className='text-sm text-center'>wants to delete : 2211081038</h2>
              </div>
              <div className='flex justify-between'>
                <div className='px-2 py-1 border-2 rounded cursor-pointer' onClick={handleDelConf}>Confirm</div>
                <div className='px-2 py-1 border-2 rounded cursor-pointer' onClick={handleDelCancel}>Cancel</div>
              </div>
            </div>
          </div>
          :
          ''
      }
    </div>
  )
}

export default Students