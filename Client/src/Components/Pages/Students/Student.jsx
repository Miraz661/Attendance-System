import { FaCheck, FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import PropTypes from 'prop-types';

function Student(props) {
    const { stId,id,stBatch,stSection,stName, upDateDel, onDataUpdate } = props;
    const [attendance, setAttendance] = useState(0);

    const present = () => {
        setAttendance(1);
        onDataUpdate(stId, 'Present');
    }

    const absent = () => {
        setAttendance(2);
        onDataUpdate(stId, 'Absent');
    }

    const handleDel = () => {
        upDateDel(1,stId);
    }

    return (
        <tr key={id} className="border-2">
            <td className="border-2 text-center">{stBatch}</td>
            <td className="border-2 text-center">{stSection}</td>
            <td className="border-2 text-center">{stName}</td>
            <td className="text-center w-full block">{stId}</td>
            <td className="border-2">
                <button className={`flex justify-center w-full`} onClick={present}><FaCheck className={`rounded-full bg-white ${attendance == 1 ? 'text-[green]' : 'text-[white]'} p-[4px] text-2xl`} /></button>
            </td>
            <td className="border-2">
                <button className="flex justify-center w-full" onClick={absent}><FaCheck className={`rounded-full bg-white ${attendance == 2 ? 'text-[red]' : 'text-[white]'} p-[4px] text-2xl`} /></button>
            </td>
            <td className="flex justify-center pt-[2px]"><FaTrash className='p-[2px] text-2xl rounded-full cursor-pointer' onClick={handleDel} /></td>
        </tr>
    )
}

export default Student


Student.propTypes = {
    stId: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    // data: PropTypes.number.isRequired,
    stBatch: PropTypes.string.isRequired,
    stSection: PropTypes.string.isRequired,
    stName: PropTypes.string.isRequired,
    onDataUpdate: PropTypes.func.isRequired,
    upDateDel: PropTypes.func.isRequired,
};