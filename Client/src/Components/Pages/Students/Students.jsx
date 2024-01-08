import { useLocation } from "react-router-dom";
import { useState } from "react";
import '../../../CSS/Home.css';
import { useNavigate } from "react-router-dom";
import avater from '../../../assets/Images/avater.png';
import axios from "axios";


function Students() {

  const navigation = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const user = params.get('course');
  let code = user.split('CSEC');
  code = 'CSEC'+code[1];
  const [showNewCourse, setShowNewCourse] = useState(0);
  const [account, setAccount] = useState(0);


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

  return (
    <div>
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
    </div>
  )
}

export default Students