import './App.css'
import Main from './components/Main';
import Skills from './components/Skills';
import Divider from './components/Divider';
import Overview from './components/Overview';
import { SpeedInsights } from "@vercel/speed-insights/react"
import Education from './components/Education';

function App() {
  return (
    <>
      <SpeedInsights/>
      <Main/>
      <Divider/>
      <Overview/>
      <Divider/>
      <Skills/>
      <Divider/>
      <Education/>
      <Divider/>
    </>
  )
}

export default App;
