import { useLocation, Link } from "react-router-dom";
import avater from '../../../assets/Images/avater.png';
import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";


function Attendance() {
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const user = params.get('show');
  let home = user.split('batches');
  home = home[0] + 'uttarauniversity.edu.bd';
  let code = user.split('code');
  code = code[1];
  console.log(home);
  const [account, setAccount] = useState(0);
  const navigation = useNavigate();
  const [height, setHeight] = useState('100vh');


  useEffect(()=>{
    const calculatedHeight = window.innerHeight - 191;
    setHeight(calculatedHeight);
  },[])


  const handleLogOut = () => {
    setAccount(1);
  }

  const handleLogOutConf = () => {
    setAccount(0);
    navigation('/');
  }

  return (
    <div>
      <div className='bg-[#181818] text-white flex justify-between align-items-center w-full py-4 md:px-10 sm:px-6 px-2'>
        <div className='text-3xl font-semibold'>
          <Link to={`/home?user=${home}`}>
            <h1 className='cursor-pointer'>Students</h1>
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
        <div className="font-semibold text-xl">Software Engineering</div>
        <div>
          <input type="text" />
        </div>
      </div>
      <div className={`hide-scrollbar w-full xxsm:overflow-y-scroll xxsm:overflow-x-hidden overflow-scroll py-6 px-4 h-[${height}px] mb-4`}>
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
            {/* {
              stData.map(st => (
                <Student key={st.Id} id={st.Id} stId={st.stId} stBatch={st.stBatch} stName={st.stName} stSection={st.stSection} upDateDel={upDateDelData} onDataUpdate={updateData} />
              ))
            } */}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Attendance