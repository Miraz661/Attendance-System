import { FaCheck, FaTrash } from 'react-icons/fa'
import { useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

function Student(props) {
    const { id, upDateDel, onDataUpdate } = props;
    const [attendance, setAttendance] = useState(0);

    const present = () => {
        setAttendance(1);
        onDataUpdate(id, 'true');
    }

    const absent = () => {
        setAttendance(2);
        onDataUpdate(id, 'false');
    }

    const handleDel = () => {
        upDateDel(1);
    }

    return (
        <tr className="border-2">
            <td className="border-2 text-center">53</td>
            <td className="border-2 text-center">B</td>
            <td className="border-2 text-center">Miraz Hossain</td>
            <Link to="/attendance" className='w-full block'>
                <td className="text-center w-full block hover:underline">{id}</td>
            </Link>
            <td className="border-2">
                <button className={`flex justify-center w-full`} onClick={present}><FaCheck className={`rounded-full bg-white ${attendance == 1 ? 'text-[green]' : ''} p-[4px] text-2xl`} /></button>
            </td>
            <td className="border-2">
                <label className="flex justify-center w-full" onClick={absent}><FaCheck className={`rounded-full bg-white ${attendance == 2 ? 'text-[red]' : ''} p-[4px] text-2xl`} /></label>
            </td>
            <td className="flex justify-center pt-[2px]"><FaTrash className='p-[2px] text-2xl rounded-full cursor-pointer' onClick={handleDel} /></td>
        </tr>
    )
}

export default Student


Student.propTypes = {
    id: PropTypes.string.isRequired,
    onDataUpdate: PropTypes.func.isRequired,
    upDateDel: PropTypes.func.isRequired,
};