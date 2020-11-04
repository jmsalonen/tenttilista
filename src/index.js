import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let question1 = {
  title: "Minä vuonna Suomi liittyi Euroopan unioniin?", 
  type: "radio",
  options: [
    "1992", 
    "1995", 
    "1999",
    "2001"
  ], 
  answer: [
    false,
    false,
    false
  ], 
  correct: [
    false,
    true,
    false,
    false
  ]
}

let question2 = {
  title: "Valitse valtiot joiden lipussa on punaista.", 
  type: "checkbox",
  options: [
    "Ruotsi", 
    "Sveitsi", 
    "Irlanti",
    "Kanada",
    "Kiina",
    "Kreikka",
    "Algeria"
  ], 
  answer: [
    false,
    false,
    false,
    false,
    false,
    false,
    false
  ], 
  correct: [
    false,
    true,
    false,
    true,
    true,
    false,
    false
  ]
}

let question3 = {
  title: "Kuuluuko ananas pitsaan?", 
  type: "radio",
  options: [
    "Kyllä", 
    "Ei" 
  ], 
  answer: [
    false,
    false
  ], 
  correct: [
    false,
    true
  ]
}

let tentti1 = {
  title: "Javascriptin Perusteet",
  question: [
    question1,
    question2,
    question3
  ]
}

let tentti2 = {
  title: "Haskellin Perusteet",
  question: [
    question3,
    question2,
    question1
  ]
}

let exampleData = {exam: [
  tentti1,
  tentti2
]}

if (window.localStorage.length < 1)
  window.localStorage.setItem('data', JSON.stringify(exampleData))

let database = JSON.parse(window.localStorage.getItem('data'))

ReactDOM.render(
  <React.StrictMode>
    <App key="main" database={database}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
