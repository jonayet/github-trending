import './App.scss';

import { Header } from './components/Header'
import { Content } from './components/ContentSection'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="App">
      <Header />
      <Content />
      <Footer />
    </div>
  );
}

export default App;
