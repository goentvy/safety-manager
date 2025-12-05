import { useEffect, useState } from 'react';
import './App.css'

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/hello')
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch((err) => console.error('API 호출 실패:', err));
  }, []);

  return (
    <>
      <h1>백엔드 메시지:</h1>
      <p>{message}</p>
    </>
  )
}

export default App
