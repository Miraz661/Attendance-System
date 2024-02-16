import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import '../../../CSS/Home.css';
import { useNavigate } from "react-router-dom";
import avater from '../../../assets/Images/avater.png';
import axios from "axios";
import Student from "./Student";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx';


function Students() {

  const navigation = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const user = params.get('course');
  let target = user.split("CSEC");
  target = target[0] + 'students';
  let home = user.split("batches");
  home = home[0] + '@uttarauniversity.edu.bd';
  let code = user.split('CSEC');
  const getSt = code[0];
  code = 'CSEC' + code[1];
  const [showNewCourse, setShowNewCourse] = useState(0);
  const [account, setAccount] = useState(0);
  const [attendanceData, setAttendanceData] = useState({})
  const [showDelConf, setShowDelConf] = useState(0);
  const [today, setToday] = useState('');
  const [height, setHeight] = useState('100vh');
  const [stData, setStData] = useState([]);
  const [rerend, setRerend] = useState(0);
  const [delId, setDelId] = useState();
  const [excelData, setExcelData] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    setToday(date);
    const calculatedHeight = window.innerHeight - 191;
    setHeight(calculatedHeight);
  }, [height])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/loadStudent/data', { getSt, code });
        setStData(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [getSt, code, rerend])



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
    setAttendanceData({ ...attendanceData, [key]: value })
    // console.log(attendanceData);
  };

  const handleNewCourseAddition = async (e) => {
    e.preventDefault();
    if (excelData) {
      excelData.shift();
      try {
        await axios.post(`http://localhost:3000/addAllStudent/${target}/${code}`, excelData);
        alert('Data updated successfully!');
        setShowNewCourse(0);
        if (rerend) {
          setRerend(0);
        } else {
          setRerend(1);
        }
      } catch (error) {
        console.error('Error updating data:', error);
      }
      // console.log(excelData);
    } else {
      const id = e.target.id.value;
      const name = e.target.name.value;
      const batch = e.target.batch.value;
      const section = e.target.section.value;
      try {
        const response = await axios.post(`http://localhost:3000/addStudent/${target}`, { id, name, batch, section, code });
        // console.log(response.message);
        setShowNewCourse(0);
        if (rerend) {
          setRerend(0);
        } else {
          setRerend(1);
        }
      } catch (error) {
        console.error('Error adding data:', error);
      }
      setShowNewCourse(0);
    }
  }

  const handleDelConf = async () => {
    // console.log(delId);
    try {
      const response = await axios.post(`http://localhost:3000/deleteStudent/${target}`, { delId, code });
      // console.log(response.message);
      setShowNewCourse(0);
      if (rerend) {
        setRerend(0);
      } else {
        setRerend(1);
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
    setShowDelConf(0)
  }

  const handleDelCancel = () => {
    setShowDelConf(0);
  }

  const upDateDelData = (data, id) => {
    setShowDelConf(data);
    setDelId(id);
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      const workbook = XLSX.read(result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      setExcelData(data);
    };
    reader.readAsBinaryString(file);
  };

  const saveData = async () => {
    let data = attendanceData;
    if (Object.keys(data).length == 0) {
      // console.log("no data");
    } else {
      try {
        const response = await axios.post(`http://localhost:3000/addAttendance/${target}`, { data, code, today });
        // console.log(response.message);
        setAttendanceData({});
        if (rerend) {
          setRerend(0);
        } else {
          setRerend(1);
        }
      } catch (error) {
        console.error('Error adding data:', error);
      }
    }
  }

  const handleView = () => {
    navigation(`/attendance?show=${target}code${code}`);
    // console.log(target, code);
  }

  const handleDateChange = (e) => {
    const date = e.target.value;
    setToday(date);
  }

  return (
    <div className="overflow-hidden">
      <div className='bg-[#181818] text-white flex justify-between align-items-center w-full py-4 md:px-10 sm:px-6 px-2'>
        <div className='text-3xl font-semibold'>
          <Link to={`/home?user=${home}`}>
            <h1 className='cursor-pointer'>Students</h1>
          </Link>
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
                        <label htmlFor="id" className='font-medium'>Id:</label>
                        <input type="text" id='id' name="id" placeholder='Enter course code' className='w-full p-2 bg-[#0000009c] border-[2px] rounded outline-none focus:border-[#4f8dff]' />
                      </div>
                      <div className='pb-2'>
                        <label htmlFor="name" className='font-medium'>Name:</label>
                        <input type="text" id='name' name="name" placeholder='Enter course title' className='w-full p-2 bg-[#0000009c] border-[2px] rounded outline-none focus:border-[#4f8dff]' />
                      </div>
                      <div className='pb-2'>
                        <label htmlFor="batch" className='font-medium'>Batch No.:</label>
                        <input type="text" id='batch' name="batch" placeholder='Enter course title' className='w-full p-2 bg-[#0000009c] border-[2px] rounded outline-none focus:border-[#4f8dff]' />
                      </div>
                      <div className='pb-2'>
                        <label htmlFor="section" className='font-medium'>Section::</label>
                        <input type="text" id='section' name="section" placeholder='Enter course title' className='w-full p-2 bg-[#0000009c] border-[2px] rounded outline-none focus:border-[#4f8dff]' />
                      </div>
                      <div className="p-2 w-full flex align-items-center justify-center">
                        <input type="file" accept=".csv,.xls,.xlsx" onChange={handleFileUpload} />
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
            {
              stData.map(st => (
                <Student key={st.Id} id={st.Id} stId={st.stId} stBatch={st.stBatch} stName={st.stName} stSection={st.stSection} upDateDel={upDateDelData} onDataUpdate={updateData} />
              ))
            }
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-between px-4">
        <button onClick={handleView} className="border-2 py-2 px-4 text-white rounded">View</button>
        <button onClick={saveData} className="border-2 py-2 px-4 text-white rounded">Save</button>
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