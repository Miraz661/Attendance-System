// import { useState, useEffect } from 'react';

// function Mysql() {
//   const [data, setData] = useState([]);
//   const [newData, setNewData] = useState({ email:'',password:'',user:''});
//   const [status,setStatus] = useState('');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch('http://localhost:3000/api/data');
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };
//     fetchData();
//   }, []);

//   const handleEmailChange = (e) => {
//     setNewData({ ...newData, [e.target.name]: e.target.value });
//   };
//   const handlePasswordChange = (e) => {
//     setNewData({ ...newData, [e.target.name]: e.target.value });
//   };

//   const handleAddData = async () => {
//     setNewData({user:'users'});
//     try {
//       const response = await fetch('http://localhost:3000/api/data', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newData),
//       });

//       const result = await response.json();

//       // Optionally, update the state with the newly inserted data
//       setData([...data, {id:result.id, email: newData.email,password:newData.password }]);
//       setStatus(result.Error);
      
//       // Clear the form
//       setNewData({ email:"",password:""});
//     } catch (error) {
//       console.error('Error adding data:', error);
//     }
//   };


//   return (
//     <div>
//       <h1>Data from MySQL Database</h1>
//       <ul>
//         {data.map((item) => (
//           <li key={item.id}>
//             <div>{item.email}</div>
//             <div>{item.password}</div>
//           </li>
//         ))}
//       </ul>

//       <h2>Add Data</h2>
//       <div>
//         <div>{status}</div>
//         <input
//           type="email"
//           name="email"
//           value={newData.email}
//           onChange={handleEmailChange}
//           placeholder="Enter email"
//         />
//         <input
//           type="password"
//           name="password"
//           value={newData.password}
//           onChange={handlePasswordChange}
//           placeholder="Enter email"
//         />
//         <button onClick={handleAddData}>Add Data</button>
//       </div>
//     </div>
//   );
// }

// export default Mysql;
