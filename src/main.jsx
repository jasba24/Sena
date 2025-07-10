import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './components/styles/index.css'
import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDJD4Fn54Cj39RAkt9o6IQEnfln1M-RrfE',
  authDomain: 'test-55f80.firebaseapp.com',
  projectId: 'test-55f80',
  storageBucket: 'test-55f80.appspot.com',
  messagingSenderId: '747039356086',
  appId: '1:747039356086:web:abefd0d9eeeca34018e217'
}

export const firebaseApp = initializeApp(firebaseConfig)

ReactDOM.createRoot(document.getElementById('root')).render(<App /> )
