import { useState } from 'react';
import NormalLoading from './NormalLoading'
import { useNavigate } from 'react-router-dom';

function LogoutButton() {
  const navigate = useNavigate();
  const [loading, setloading] = useState(false)

  function handleLogout() {
    // Clear specific token or everything
    localStorage.removeItem('authToken');
    navigate('/signin');
  }

  return (
    <>
    <button
      onClick={()=>{
        setloading(true)
        setTimeout(() => {
           setloading(false)
           handleLogout()
        }, 2000);
        }}
      className="cursor-pointer transform active:scale-95  px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 font-bold transition"
    >
      Logout
    </button>
    {loading && <NormalLoading/>}
    </>
  );
}

export default LogoutButton;
