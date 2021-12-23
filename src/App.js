import { useEffect, useState } from 'react'
import logo from './logo.svg';
import './App.css';
const axios = require('axios');

function App() {
  const [testData, setTestData] = useState(null);

  useEffect(() => {
    axios.get("/test",
    ).then(function (response) {
      setTestData(JSON.stringify(response.data));
    }).catch(function (error) {
      console.error(error);
    })
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <b>Sample data ↓</b> <br />
        {testData}
      </header>
    </div>
  );
}

export default App;
