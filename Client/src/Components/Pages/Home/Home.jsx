import { useLocation } from 'react-router-dom';


function Home() {
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const param1 = params.get('param1');
  console.log(param1);
  return (
    <div className="flex justify-center">
        <h2 className="font-semibold text-2xl w-max">Welcome Home {param1}</h2>
    </div>
  )
}

export default Home