import './App.css';
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import app from './firebase/firebase.init';
import { useState } from 'react';

const auth = getAuth(app);

function App() {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState({});

  const handleGoogleSingIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const user = result.user;
        setUser(user);
      })
      .catch(err => {
        console.error("error", err);
      })
  }

  const handleSingOut = () => {
    signOut(auth)
      .then(() => {
        setUser({})
      })
      .catch(() => {
        setUser({})
      })
  }

  console.log("🚀 ~ file: App.js:11 ~ App ~ user:", user)
  return (
    <div className="App">
      {user.uid ? <button onClick={handleSingOut} >Google logout</button>
        : <button onClick={handleGoogleSingIn} >Google login</button>
      }

      {user.uid && <>
        <h1>User Name: {user.displayName}</h1>
        <p>Email: {user.email}</p>
        <img src={user.photoURL} alt='' />
      </>
      }
    </div>
  );
}

export default App;
