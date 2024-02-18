import PropTypes from 'prop-types';
import { FaTrash } from 'react-icons/fa';

function Attendancedata(props) {
    const { date, stId, attendance, del} = props;
    // console.log(date);

    const handleDel = () =>{
        del(1,stId,date);
    }

    return (
        <tr>
            <td className="border-2 text-center">{date}</td>
            <td className="border-2 text-center">{stId}</td>
            <td className="border-2 text-center">{attendance}</td>
            <td className="border-2 text-center">
                <div className='flex justify-center'>
                    {/* <span className='mr-4 cursor-pointer'>UpDate</span> */}
                    <FaTrash className='cursor-pointer' onClick={handleDel}/>
                </div>
            </td>
        </tr>
    )
}

export default Attendancedata;

Attendancedata.propTypes = {
    date: PropTypes.string.isRequired,
    stId: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    attendance: PropTypes.string.isRequired,
    del: PropTypes.func.isRequired
};