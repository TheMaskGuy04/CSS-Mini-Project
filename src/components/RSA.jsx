import { useState } from "react";
import "../App.css";

export default function App() {
  const [pAndq, handlePAndQ] = useState({
    p: "",
    q: "",
  });

  const [eVal, setE] = useState("");

  const [solved, setSolved] = useState(false);

  const [publicKey, setPublicKey] = useState({
    publicKeyE: "",
    publicKeyN: "",
  });
  const [privateKey, setprivateKey] = useState({
    privateKeyD: "",
    privateKeyN: "",
  });

  const [phi, setPhi] = useState(0);
  const [n, setN] = useState(0);
  const [d, setD] = useState(0);
  let eVals = [];

  const [showE, setShowE] = useState([]);
  const [selectedE, setSelectedE] = useState(false);

  const [plainText, setPlainText] = useState(0);
  const [encryptedMessage, setEncryptedMessage] = useState(0);

  const showEList = showE.map((item) => {
    <p>{item}, </p>;
  });

  function gcd(a, b) {
    if (b === 0) {
      return a;
    } else if (a === 0) {
      return b;
    } else if (a > b) {
      return gcd(b, a % b);
    } else {
      return gcd(a, b % a);
    }
  }

  function checkPrime(pAndq) {
    const p = parseInt(pAndq.p);
    const q = parseInt(pAndq.q);

    let prime = true;

    for (let i = 2; i < p; i++) {
      if (p % i === 0) {
        // alert("Not Prime");
        prime = false;
        break;
      }
    }

    for (let i = 2; i < q; i++) {
      if (q % i === 0) {
        prime = false;
        break;
      }
    }

    return prime;
  }

  function calculateNandE(pAndq) {
    const p = parseInt(pAndq.p);
    const q = parseInt(pAndq.q);

    setN(p * q);
    setPhi((p - 1) * (q - 1));

    let possibleValOfE = [];

    for (let i = 2; i < phi; i++) {
      let gcdVal = gcd(i, phi);
      if (gcdVal === 1) {
        possibleValOfE.push(i);
      }
    }

    return possibleValOfE;
  }

  function setPubAndPriKey(eVal, d) {
    let newD = d.toString();
    let newN = n.toString();

    // console.log(newD, newN);
    // console.log(typeof(newD), typeof(newN));

    setPublicKey({ publicKeyE: eVal, publicKeyN: n });
    setprivateKey({ privateKeyD: newD, privateKeyN: newN });

    setSolved(true);
  }

  function calculateD(eVal) {
    // console.log(eVal, phi);

    for (let j = 0; j < eVals.length; j++) {
      if (eVals[j] == eVal) {
        for (let i = 1; i < phi; i++) {
          if ((eVal * i) % phi === 1) {
            // console.log("D: ", i);
            setD(i);
            setPubAndPriKey(eVal, i);
            // console.log(publicKey, privateKey);
            break;
          }
        }
        setSelectedE(true);
        return;
      }
    }

    setSelectedE(false);
    alert("Invalid value of e");
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(pAndq);
    if (checkPrime(pAndq)) {
      eVals = calculateNandE(pAndq);
      // alert(eVals);
      setShowE(eVals);
    } else {
      alert("Enter Prime Numbers");
    }

    if (eVal !== "") {
      setSolved(false);
      calculateD(eVal);
    }
  }

  function handleP(e) {
    handlePAndQ({ ...pAndq, p: e.target.value });
  }
  function handleQ(e) {
    handlePAndQ({ ...pAndq, q: e.target.value });
  }
  function handleESubmit(e) {
    setE(e.target.value);
  }

  function handleEncryptSubmit(e) {
    e.preventDefault();

    console.log(plainText, typeof plainText);
    console.log(d, typeof d);
    console.log(n, typeof n);

    const ciphertext =
      BigInt(parseInt(plainText)) ** BigInt(parseInt(d)) % BigInt(n);

    console.log(typeof ciphertext);

    alert("The Encrypted Message is: " + ciphertext);

    setEncryptedMessage(ciphertext);

    console.log(encryptedMessage);
  }

  return (
    <>
      <h1>RSA Simulator</h1>
      <div className="main-container">
        <div className="container">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div>
              <label htmlFor="p">Enter p</label>
              <input
                onChange={(e) => handleP(e)}
                value={pAndq.p}
                id="p"
                type="text"
                required
              />
            </div>

            <div>
              <label htmlFor="q">Enter q</label>
              <input
                onChange={(e) => handleQ(e)}
                value={pAndq.q}
                id="q"
                type="text"
                required
              />
            </div>

            {showE.length !== 0 && (
              <div>
                <p className="Epara">Possible values of e:</p>
                <div>
                  {showE.map((item, i) => {
                    return <span key={i}>{item}, </span>;
                  })}
                </div>
                <label htmlFor="e" className="Elabel">
                  Enter e
                </label>
                <input
                  id="e"
                  onChange={(e) => handleESubmit(e)}
                  value={eVal}
                  type="text"
                  required
                />
              </div>
            )}

            <button type="submit">Submit</button>
          </form>
        </div>

        {solved === false && selectedE === false ? (
          <></>
        ) : (
          <div className="container">
            <hr />
            <div>
              <p>Calculate d such that d*e mod(θ(N)) = 1</p>
              <p>d = {d}</p>
            </div>
            <p className="Epara">
              Public Key: {publicKey.publicKeyE}, {publicKey.publicKeyN}
            </p>
            <p className="Epara">
              Private Key: {privateKey.privateKeyD}, {privateKey.privateKeyN}
            </p>
            <hr />

            <form onSubmit={(e) => handleEncryptSubmit(e)}>
              <label htmlFor="message">Enter Plain text:</label>
              <input
                onChange={(e) => setPlainText(e.target.value)}
                value={plainText}
                id="message"
                type="number"
                required
              />
              <button type="submit">Encrypt</button>
              <p>Encrypted Message: {encryptedMessage.toString()}</p>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
