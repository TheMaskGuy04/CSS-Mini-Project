import React, { useState } from "react";
import "../diffie.css";

export default function Diffie() {
  const [prime, setPrime] = useState("");
  const [base, setBase] = useState("");
  const [privateA, setPrivateA] = useState("");
  const [privateB, setPrivateB] = useState("");
  const [publicKeyA, setPublicKeyA] = useState("");
  const [publicKeyB, setPublicKeyB] = useState("");
  const [sharedKey, setSharedKey] = useState("");

  const calculateKeys = () => {
    const p = parseInt(prime);
    const g = parseInt(base);
    const a = parseInt(privateA);
    const b = parseInt(privateB);

    const publicKeyA = Math.pow(g, a) % p;
    setPublicKeyA(publicKeyA);

    const publicKeyB = Math.pow(g, b) % p;
    setPublicKeyB(publicKeyB);

    const sharedKeyA = Math.pow(publicKeyB, a) % p;
    const sharedKeyB = Math.pow(publicKeyA, b) % p;

    setSharedKey(sharedKeyA === sharedKeyB ? sharedKeyA : "Keys do not match!");
  };

  return (
    <div className="container">
      <h2>Diffie-Hellman Key Exchange</h2>
      <div className="input-group">
        <label htmlFor="prime">Prime Number (p):</label>
        <input
          type="text"
          id="prime"
          value={prime}
          onChange={(e) => setPrime(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="base">Alpha (g):</label>
        <input
          type="text"
          id="base"
          value={base}
          onChange={(e) => setBase(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="privateA">Alice's Private Key (a):</label>
        <input
          type="text"
          id="privateA"
          value={privateA}
          onChange={(e) => setPrivateA(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="privateB">Bob's Private Key (b):</label>
        <input
          type="text"
          id="privateB"
          value={privateB}
          onChange={(e) => setPrivateB(e.target.value)}
        />
      </div>
      <button onClick={calculateKeys}>Calculate Keys</button>
      <div className="publicKeyA">
        <h3>
          Public Key A: <span>{publicKeyA}</span>
        </h3>
      </div>
      <div className="publicKeyB">
        <h3>
          Public Key B: <span>{publicKeyB}</span>
        </h3>
      </div>
      <div className="result">
        <h3>
          Shared Secret Key (s): <span>{sharedKey}</span>
        </h3>
      </div>
    </div>
  );
}
