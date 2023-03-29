import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
// import Datefromdaycalculator from './Component/datefromdaycalculator';
import FilteredSlots from "./Component/FilteredSlots";
// import Calender from './Component/Calender';
// import Datefromdaycalculator from './Component/datefromdaycalculator';
import TimeSlotFiltering from "./Component/TimeSlotFiltering";
import data from "./Component/questions.json";
import McqApp from "./Component/McqApp";
import Result from "./Component/Result";

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter>
      <Routes>
        <Route path='/' element={<TimeSlotFiltering/>}/>
        <Route path='/filteredSlots' element={<FilteredSlots/>}/>
        
        </Routes>
      </BrowserRouter> */}
      {/* <Calender/> */}
      {/* <Datefromdaycalculator/> */}
      {/* <TimeSlotFiltering/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<McqApp />}></Route>
          <Route path="/Result" element={<Result />}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
