import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Footer from "./components/Footer";
import ThemeContext from "./utils/ThemeContext";

function App() {
  
  return (
  <ThemeContext >
  <div className="min-h-screen">
   <Navbar/>    
   <Home/>
   <Footer/>
   </div>
  </ThemeContext>  
  );
}

export default App;
