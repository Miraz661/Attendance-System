import { useLocation, Link } from "react-router-dom";
import avater from '../../../assets/Images/avater.png';
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import Attendancedata from "./Attendancedata";
import axios from "axios";


function Attendance() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const user = params.get('show');
  let home = user.split('batches');
  home = home[0] + '@uttarauniversity.edu.bd';
  let code = user.split('code');
  code = code[1];
  console.log(user);
  const [account, setAccount] = useState(0);
  const navigation = useNavigate();
  const [attData,setAttData] = useState([]);
  const [Today,setToday] = useState();
  const [LastDate, setLastDate] = useState();

  useEffect(()=>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const date = `${year}-${month}-${day}`;
    setToday(date);
    var last = new Date();
    last.setDate(currentDate.getDate() - 7);
    last = last.toLocaleDateString();
    const dateRange = last.split('/');
    const d = dateRange[0].padStart(2,'0');
    const m = dateRange[1].padStart(2,'0');
    const y = dateRange[2];
    last = `${y}-${m}-${d}`;
    setLastDate(last);
  },[])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/loadattendance/data',{user,code,Today,LastDate});
        setAttData(response.data.result);
        console.log(response.data.result);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [user,code,Today,LastDate])

  console.log("last date : " +Today);

  const handleLogOut = () => {
    setAccount(1);
  }

  const handleLogOutConf = () => {
    setAccount(0);
    navigation('/');
  }

  const showdata = () =>{
    console.log(attData);
  }

  return (
    <div className="overflow-hidden">
      <div className='bg-[#181818] text-white flex justify-between align-items-center w-full py-4 md:px-10 sm:px-6 px-2'>
        <div className='text-3xl font-semibold'>
          <Link to={`/home?user=${home}`}>
            <h1 className='cursor-pointer' onClick={showdata}>Students</h1>
          </Link>
        </div>
        <div className='text-2xl font-semibold sm:block hidden'>
          <h1 className='select-none'>{code}</h1>
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
      <div className="w-full flex justify-between text-white pt-4 px-4">
        <div className="font-semibold text-xl flex gap-2">
          <div>Title : Software Eng.</div>
          <div>
            <form className="flex gap-4 text-black">
              <input type="date" value={Today}/>
              <input type="date" value={LastDate}/>
            </form>
          </div>
        </div>
        <div>
          <input type="text" />
        </div>
      </div>
      <div className={`hide-scrollbar w-full xxsm:overflow-y-scroll xxsm:overflow-x-hidden overflow-hidden py-6 px-4 mb-4`}>
        <table className="text-white border-2 w-full border-collapse min-w-[500px]">
          <thead>
            <tr className="border-2">
              <th className="border-2">Date</th>
              <th className="border-2">Name</th>
              <th className="border-2">ID</th>
              <th className="border-2">Attendance</th>
              <th className="border-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              attData.map(data => (
                <Attendancedata key={data.Id} date = {data.date} stId = {data.stId} name = {data.courseCode} attendance = {data.Attendance}/>
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance