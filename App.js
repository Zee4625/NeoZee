import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/toaster';
import Home from './pages/Home';
import Programs from './pages/Programs';
import CustomProgram from './pages/CustomProgram';
import MyPrograms from './pages/MyPrograms';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/custom-program" element={<CustomProgram />} />
          <Route path="/my-programs" element={<MyPrograms />} />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;

