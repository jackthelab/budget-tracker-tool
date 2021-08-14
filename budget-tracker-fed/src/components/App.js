import { useQuery, gql } from '@apollo/client';
import '../styles/App.css';
import { LoginPage } from './LoginPage';

function App() {

  const INFO_QUERY = gql`
    {
      info
    }
  `

  const { data } = useQuery(INFO_QUERY);

  return (
    <div className="App">
      <h1>Your Budget Tracking Tool</h1>
      <button onClick={() => console.log(data.info)}>Get Info</button>
      <LoginPage />
    </div>
  );
}

export default App;
