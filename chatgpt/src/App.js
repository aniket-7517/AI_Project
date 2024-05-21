import { Route, Routes } from 'react-router-dom';
import './App.css';
import Design from './Design';
import Home from './Home';
import Navbar from './Navbar';
import Image from './Image';
import VoiceToText from './Voice';
import Text from './Text';
import Grammer from './Grammer';
import Translate from './Translate';
import PDFtoText from './PDFtoText';

function App() {
  return (
    <div className="App">

      <Navbar />
      <Routes>
        <Route path='/' element={<Design />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/image' element={<Image />}></Route>
        <Route path='/voice' element={<VoiceToText />}></Route>
        <Route path='/text' element={<Text />}></Route>
        <Route path='/grammer' element={<Grammer />}></Route>
        <Route path='/translate' element={<Translate />}></Route>
        <Route path='/pdf' element={<PDFtoText />}></Route>
      </Routes>
      {/* <Design/> */}
    </div>
  );
}

export default App;
