import './App.css'
import Hero from './components/Hero/Hero.jsx'
import Overview from './components/Overview/Overview.jsx'
import Skills from './components/Skills/Skills.jsx'
import Education from './components/Education/Education.jsx'
import Divider from './components/Divider/Divider.jsx'

export default function App(){
  return (
    <>
      <Hero />
      <Overview />
      <Divider />
      <Skills />
      <Divider />
      <Education />      
      <Divider />
    </>
  )
}
