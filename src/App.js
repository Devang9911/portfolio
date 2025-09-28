import './App.css'
import Main from './components/Main';
import Skills from './components/Skills';
import Divider from './components/Divider';
import Overview from './components/Overview';
import { SpeedInsights } from "@vercel/speed-insights/react"

function App() {
  return (
    <>
      <SpeedInsights/>
      <Main/>
      <Divider/>
      <Overview/>
      <Divider/>
      <Skills/>
    </>
  )
}

export default App;
