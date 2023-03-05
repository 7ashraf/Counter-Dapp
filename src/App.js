import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import Counter from './artifacts/contracts/Counter.sol/counter.json'

const counterAdress = '0xe7f1725e7734ce288f8367e1bb143e90bb3f0512'
function App() {
  const [count, setCount] = useState();
  useEffect(() => {
    // Update the document title using the browser API
    getCount()
  });
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function getCount() {
    // If MetaMask exists
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        counterAdress,
        Counter.abi,
        provider
      );
      try {
        const count = await contract.getCount();
        console.log("data: ", count.toNumber());
        setCount(count.toNumber())
      } catch (error) {
        console.log("Error: ", error);
      }
    }else{
      console.log('no meta mask found')
    }
  }

  async function decrementCounter(){
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(counterAdress, Counter.abi, signer);
      const transaction = await contract.decrementCounter();
      await transaction.wait();
      getCount()
    }
  }

  async function incrementCount(){
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(counterAdress, Counter.abi, signer);
      const transaction = await contract.incrementCounter();
      await transaction.wait();
      getCount()
    }
  }
  return (
    <div className="App">
      <h1>Count : {count} </h1>
      <button onClick={incrementCount}>+</button>
      <button onClick={decrementCounter}>-</button>
    </div>
  );
}

export default App;
