import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Generator from './pages/Generator'
import Passport from './pages/Passport'

export default function App() {
  return (
    <Routes>
      <Route path="/"          element={<Landing />} />
      <Route path="/generate"  element={<Generator />} />
      <Route path="/passport"  element={<Passport />} />
    </Routes>
  )
}