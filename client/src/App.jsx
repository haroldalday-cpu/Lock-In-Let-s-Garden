import { useEffect, useState } from 'react';

function App() {
  const [status, setStatus] = useState('loading...');

  useEffect(() => {
    fetch('/api/health')
      .then((res) => res.json())
      .then((data) => setStatus(data.status))
      .catch(() => setStatus('error: could not reach server'));
  }, []);

  return (
    <main>
      <h1>Lock-In, Let's Garden</h1>
      <p>Server status: {status}</p>
    </main>
  );
}

export default App;
