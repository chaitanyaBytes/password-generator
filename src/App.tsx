import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState("8");
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [upperCaseAllowed, setUppercaseAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);

  const copyPassword = () => {
    window.navigator.clipboard.writeText(password);
    setCopied(true);
  };

  interface CopyAlertProps {
    copied: boolean;
  }
  const CopyAlert = ({ copied }: CopyAlertProps) => {
    if (copied) {
      setTimeout(() => setCopied(false), 5000);
      return (
        <p className="text-2xl text-white text-center py-2 text-black">
          copied to clipboard!!
        </p>
      );
    }
  };
  const passwordGenerator = () => {
    let pass: string = "";
    let str: string = "abcdefghojklmnopqrstuwxyz";
    if (numAllowed) {
      str += "1234567890";
    }
    if (charAllowed) {
      str += "!@#$%^&*(){}:[]<>?.,~";
    }
    if (upperCaseAllowed) {
      str += "ABCDEFGHIJKLMNOPQRSTUVXYZ";
    }

    for (let i = 1; i <= parseInt(length); i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
    setCopied(false);
    console.log(pass);
  };

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, upperCaseAllowed]);



  return (
    <div className="h-screen bg-gray-700 center pt-44">
      <div className="w-full max-w-xl mx-auto rounded-lg shadow-md px-4 pb-8 text-orange-500 bg-gray-900 ">
        <p className="text-4xl text-center py-5 text-white">
          Password Generator
        </p>

        <div className="flex shadow rounded-lg mb-4 overflow-hidden">
          <input
            className="outline-none px-3 py-1 w-full"
            placeholder={password}
            value={password}
            type="text"
            readOnly
          />
          <button
            className="bg-blue-600 w-20 ml-2 active:bg-black hover:bg-blue-400"
            onClick={copyPassword}
          >
            Copy
          </button>
        </div>

        <div className="flex text-md gap-x-2">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              className="cursor-pointer"
              value={length}
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>length: {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="number-input"
              onChange={() => setNumAllowed((prev) => !prev)}
            />
            <label htmlFor="number-input">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="character-input"
              onChange={() => setCharAllowed((prev) => !prev)}
            />
            <label htmlFor="character-input">Character</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={upperCaseAllowed}
              id="upperCase-input"
              onChange={() => setUppercaseAllowed((prev) => !prev)}
            />
            <label htmlFor="upperCase-input">UpperCase</label>
          </div>
        </div>
      </div>
      <CopyAlert copied={copied} />
    </div>
  );
}

export default App;
