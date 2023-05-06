import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './pages/Home';
import MyProjects from './pages/MyProjects';
import NewProject from './pages/NewProject';
import AboutUs from './pages/AboutUs';
import Project from './pages/Project';

import Container from './layout/Container';
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';


function App() {
  return (
    <Router>
      <Navbar />

      <Container customClass="min-height">  
        <Routes>
          <Route path= "/" element={<Home/>}/> 
          <Route path= "/MyProjects" element={<MyProjects/>}/> 
          <Route path= "/NewProject" element={<NewProject/>}/>
          <Route path= "/AboutUs" element={<AboutUs/>}/>   
          <Route path= "/project/:id" element={<Project/>}/>
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
