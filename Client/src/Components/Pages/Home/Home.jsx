import { useLocation } from 'react-router-dom';


function Home() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const user = params.get('user');
    console.log(user);
  return (
    <div className="flex justify-center">
        <h2 className="font-semibold text-2xl w-max">Welcome Home {user}</h2>
    </div>
  )
}

export default Home