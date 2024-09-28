import './App.css'
import NavBar from "@/components/NavBar/navbar";
import Market from "@/components/main/Market";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <NavBar />
      </div>
      <div className="text-center m-9 text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
        <h2 className="text-8xl">Find Your AI Solution</h2>
      </div>
      <div className="flex-grow">
        <Market />
      </div>
      <hr className="my-9"></hr>
      <footer className="text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/640px-MetaMask_Fox.svg.png" alt="MetaMask Icon" className="w-8 h-8 mr-2" />
          <p className="text-sm">Connect with MetaMask to explore our AI marketplace.</p>
        </div>
        <div>
          <p className="text-sm">© 2024 AI Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </div>
  )
}

export default App
