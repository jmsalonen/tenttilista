import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const question1 = {
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

const question2 = {
  title: "Valitse valtiot joiden lipussa on punaista.", 
  type: "checkbox",
  options: [
    "Ruotsi", 
    "Sveitsi", 
    "Irlanti",
    "Kanada",
    "Kiina",
    "Kreikka",
    "Pakistan"
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

const question3 = {
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

const exam1 = {
  title: "Javascriptin Perusteet",
  finished: false, 
  question: [
    question1,
    question2,
    question3
  ]
}

const exam2 = {
  title: "Haskellin Perusteet",
  finished: false, 
  question: [
    question3,
    question2,
    question1
  ]
}

const exampleData = {
  privilege: "teacher",
  selected: -1,
  exam: [
    exam1,
    exam2
  ]
}

if (window.localStorage.length < 1)
  window.localStorage.setItem('data', JSON.stringify(exampleData))

const database = JSON.parse(window.localStorage.getItem('data'))

const updateDatabase = (data) => {
  window.localStorage.setItem('data', JSON.stringify(data))
}

ReactDOM.render(
  <React.StrictMode>
    <App database={database} updateDatabase={updateDatabase}/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
