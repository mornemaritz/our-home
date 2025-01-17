import 'w3-css/4/w3pro.css';
import './w3-theme-teal.css';
import Products from './Products'

function App() {

  return (
    <>
      <header className="w3-container w3-center w3-theme w3-padding" id="myHeader">
        <h4>OUR HOME</h4>
      </header>
      <Products /> 
      <footer className="w3-container w3-theme">
        <p>OUR HOME © 2025 - All rights reserved</p>
      </footer>
    </>
  )
}

export default App
