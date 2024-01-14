import { useEffect, useState } from "react";
import avater from '../../../assets/Images/avater.png';
import { useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import axios from "axios";
import '../../../CSS/Home.CSS'
import { Link } from "react-router-dom";


function Courses() {

  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const user = params.get('batch');
  let batchSec = user.split('batches');
  let home = batchSec[0]+ '@uttarauniversity.edu.bd';
  batchSec = batchSec[1];
  console.log("User:" + user)
  const [account, setAccount] = useState(0);
  const [showNewCourse, setShowNewCourse] = useState(0);
  const navigation = useNavigate();
  const [showDelConf, setShowDelConf] = useState(0);
  const [batch, setBatch] = useState(0);
  const [section, setSection] = useState('');
  const [delData, setDelData] = useState(0);
  const [rerend, setRerend] = useState(0);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    let batch = batchSec.slice(0, -1);
    let sec = batchSec.slice(-1);
    setBatch(batch);
    setSection(sec);
  }, [batchSec])

  useEffect(() => {
    console.log("User call" + user);
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/loadcourse/data', { user });
        setCourseData(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user, rerend]);

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

  const handleCourse = (e) => {
    const code = e.currentTarget.querySelector('h1').innerText;
    navigation(`/students?course=${user + code}`);
  }

  const handleDelCourse = (e) => {
    const parentEle = e.currentTarget.parentElement;
    const childEle = parentEle.querySelector('.parent');
    const code = childEle.querySelector('h1').innerText;
    setDelData(code);
    setShowDelConf(1);
  }

  const handleDelConf = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/deleteCourse/${user}`, { code: delData });
      console.log(response.message);
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

  const handleNewCourseAddition = async (e) => {
    e.preventDefault();
    const code = e.target.code.value;
    const title = e.target.title.value;
    const num = Math.floor(Math.random() * 10) + 1;
    const img = `/src/assets/Images/batchBg${num}.jpg`;
    console.log(code, title);
    try {
      const response = await axios.post(`http://localhost:3000/addCourse/${user}`, { code, title, img });
      console.log(response.message);
      setShowNewCourse(0);
      if (rerend) {
        setRerend(0);
      } else {
        setRerend(1);
      }
    } catch (error) {
      console.error('Error adding data:', error);
    }
  }

  return (
    <div className="">
      <div className='bg-[#181818] text-white flex justify-between align-items-center w-full py-4 md:px-10 sm:px-6 px-2'>
        <div className='text-3xl font-semibold'>
          <Link to={`/home?user=${home}`}>
            <h1 className='cursor-pointer'>Courses</h1>
          </Link>
        </div>
        <div className='text-2xl font-semibold sm:block hidden'>
          <h1 className='select-none'>{batch + section}</h1>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='w-10 h-10 border-2 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#7b7b7b]'>
            <span className='text-2xl' onClick={openCourseAdd}>+</span>
            {
              showNewCourse ?
                <div className='cursor-default w-screen h-screen absolute top-0 left-0 bg-[#000000de] z-[2] flex justify-center items-center'>
                  <form className='p-4 border-2 rounded relative bg-black' onSubmit={handleNewCourseAddition}>
                    <span className='absolute top-0 right-0 text-3xl pr-2 rotate-45 cursor-pointer' onClick={closeCourseAdd}>+</span>
                    <h1 className='text-center text-xl font-semibold pb-4'>Add new Course</h1>
                    <div className='flex flex-col max-w-60'>
                      <div className='pb-2'>
                        <label htmlFor="code" className='font-medium'>Course code:</label>
                        <input type="text" id='code' placeholder='Enter course code' required className='w-full p-2 bg-[#0000009c] border-[2px] rounded outline-none focus:border-[#4f8dff]' />
                      </div>
                      <div className='pb-4'>
                        <label htmlFor="title" className='font-medium'>Course Title:</label>
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
      <div className='mainSectionHeight m-6 p-4 rounded bg-[#181818] max-w-full overflow-y-scroll flex flex-wrap justify-center xsm:justify-between items-center'>
        {
          courseData.map(course => (
            <div key={course.id} className='w-60 h-32 border-2 mb-4 relative rounded bg-cover bg-center' style={{ backgroundImage: `url('${course.img}')` }}>
              <div className='absolute bottom-0 left-0 bg-[#ffffffb0] w-full px-4 py-2 flex justify-between'>
                <div className='parent batch w-max text-xl font-semibold cursor-pointer overflow-hidden' onClick={handleCourse}>
                  <h1 name='batch' className=''>{course.code}</h1>
                  <h3 name='section' className="text-sm whitespace-nowrap">{course.title}</h3>
                </div>
                <div className='text-xl h-max px-[2px] py-[2px] rounded-full cursor-pointer hover:bg-[#0000009c]' onClick={handleDelCourse}>
                  <FaTrash />
                </div>
              </div>
            </div>
          ))
        }
      </div>
      {
        showDelConf ?
          <div className='absolute z-[3] top-0 left-0 w-screen h-screen bg-[#000000de] flex justify-center items-center'>
            <div className='border-2 rounded py-3 px-5 text-white bg-black'>
              <div className='pb-4'>
                <h1 className='text-3xl text-center'>Are you sure?</h1>
                <h2 className='text-sm text-center'>wants to delete : {delData}</h2>
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

export default Courses