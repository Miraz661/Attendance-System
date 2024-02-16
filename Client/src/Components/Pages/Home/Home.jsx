import { useLocation } from 'react-router-dom';
import avater from '../../../assets/Images/avater.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../../../CSS/Home.css';
import { FaTrash } from 'react-icons/fa'
import axios from 'axios';



function Home() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const user = params.get('user');
  // console.log(user);
  let userReq = user.split("@");
  userReq = userReq[0]+'batches';
  const navigation = useNavigate();
  const [showNewBatch, setShowNewBatch] = useState(0);
  const [showDelConf, setShowDelConf] = useState(0);
  const [account, setAccount] = useState(0);
  const [batchData, setBatchData] = useState([]);
  const [rerend,setRerend] = useState(0);
  const [delData,setDelData] = useState({batch:0,sec:''})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/loadbatch/data',{userReq});
        setBatchData(response.data.result);
        // console.log(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [userReq,rerend]);


  const handleHome = () => {
    navigation(`/home?user=${user}`);
  }

  const openBatchAdd = () => {
    setShowNewBatch(1);
  }

  const closeBatchAdd = () => {
    setShowNewBatch(0);
  }

  const handleNewBatchAddition = async (e) => {
    e.preventDefault();
    const batch = e.target.batch.value;
    const sec = e.target.sec.value;
    const num = Math.floor(Math.random() * 10) +1;
    // console.log(num);
    const img = `/src/assets/Images/batchBg${num}.jpg`;
    try{
      const response = await axios.post(`http://localhost:3000/addBatches/${userReq}`, {batch,sec,img});
      // console.log(response.message);
      setShowNewBatch(0);
      if(rerend){
        setRerend(0);
      }else{
        setRerend(1);
      }
    }catch (error) {
      console.error('Error adding data:', error);
    }
  }

  const handleBatch = (e) => {
    const batch = e.currentTarget.querySelector('h1').innerText;
    const sec = e.currentTarget.querySelector('h3').innerText;
    let batchSec = userReq+batch+sec;
    // console.log(batchSec);
    navigation(`/course?batch=${batchSec}`);
  }

  const handleDelBatch = (e) => {
    const parentEle = e.currentTarget.parentElement;
    const childEle = parentEle.querySelector('.parent');
    const batch = childEle.querySelector('h1').innerText;
    const sec = childEle.querySelector('h3').innerText;
    setDelData({batch,sec});
    setShowDelConf(1);
  }

  const handleDelConf = async () => {
    try{
      const response = await axios.post(`http://localhost:3000/deleteBatch/${userReq}`, delData);
      console.log(response.message);
      setShowNewBatch(0);
      if(rerend){
        setRerend(0);
      }else{
        setRerend(1);
      }
    }catch (error) {
      console.error('Error adding data:', error);
    }
    setShowDelConf(0)
  }

  const handleDelCancel = () => {
    setShowDelConf(0);
  }

  const handleLogOut = () => {
    setAccount(1);
  }

  const handleLogOutConf = () => {
    setAccount(0);
    navigation('/');
  }

  return (
    <div className="">
      <div className='bg-[#181818] text-white flex justify-between align-items-center w-full py-4 md:px-10 sm:px-6 px-2'>
        <div className='text-3xl font-semibold'>
          <h1 className='cursor-pointer' onClick={handleHome}>Dashboard</h1>
        </div>
        <div className='text-2xl font-semibold sm:block hidden'>
          <h1 className='select-none'>E-Attendance</h1>
        </div>
        <div className='grid grid-cols-2 gap-4'>
          <div className='w-10 h-10 border-2 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#7b7b7b]'>
            <span className='text-2xl' onClick={openBatchAdd}>+</span>
            {
              showNewBatch ?
                <div className='cursor-default w-screen h-screen absolute top-0 left-0 bg-[#000000de] z-[2] flex justify-center items-center'>
                  <form className='p-4 border-2 rounded relative bg-black' onSubmit={handleNewBatchAddition}>
                    <span className='absolute top-0 right-0 text-3xl pr-2 rotate-45 cursor-pointer' onClick={closeBatchAdd}>+</span>
                    <h1 className='text-center text-xl font-semibold pb-4'>Add new batch</h1>
                    <div className='flex flex-col max-w-60'>
                      <div className='pb-2'>
                        <label htmlFor="batch" className='font-medium'>Batch No.:</label>
                        <input type="text" id='batch' placeholder='Enter batch no.' required className='w-full p-2 bg-[#0000009c] border-[2px] rounded outline-none focus:border-[#4f8dff]' />
                      </div>
                      <div className='pb-4'>
                        <label htmlFor="sec" className='font-medium'>Section:</label>
                        <input type="text" id='sec' placeholder='Enter section ' required className='w-full p-2 bg-[#0000009c] border-[2px] rounded outline-none focus:border-[#4f8dff]' />
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
          batchData.map(batch => (
            <div key={batch.id} className='w-60 h-32 border-2 mb-4 relative rounded bg-cover bg-center' style={{ backgroundImage: `url('${batch.img}')` }}>
              <div className='absolute bottom-0 left-0 bg-[#ffffffb0] w-full px-4 py-2 flex justify-between'>
                <div className='parent batch w-max text-xl font-semibold cursor-pointer' onClick={handleBatch}>
                  <h1 name='batch' className=''>{batch.batch}</h1>
                  <h3 name='section'>{batch.section}</h3>
                </div>
                <div className='text-xl h-max px-[2px] py-[2px] rounded-full cursor-pointer hover:bg-[#0000009c]' onClick={handleDelBatch}>
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
                <h2 className='text-sm text-center'>wants to delete : {delData.batch+delData.sec}</h2>
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

export default Home