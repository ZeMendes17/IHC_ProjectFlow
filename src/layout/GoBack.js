import { useNavigate } from 'react-router-dom';

function GoBack() {
  const navigate = useNavigate();

const handleGoBack = () => {
    navigate(-1); // página anterior
}

  return (
    <div>
      <button className="py-2 px-4 rounded-full position: absolute w-[100px]" onClick={handleGoBack}>
      <svg className='w-5 inline-block' aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M19.5 12h-15m0 0l6.75 6.75M4.5 12l6.75-6.75" stroke-linecap="round" stroke-linejoin="round"></path>
      </svg>
         Back
      </button>
    </div>
  );
}

export default GoBack;