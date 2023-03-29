import React from 'react'
import { useNavigate } from 'react-router-dom'
function Result() {

   //State to navigate back to quiz page
    const navigate = useNavigate('')
  
    function handleReset(){
        navigate( '/')
    }
    return (
        <div  className="container">
        
                <h1 className="heading-txt">Result</h1>
                <h2   className="heading">Total Score : {localStorage.getItem('Result') } / 100</h2>
                <h2 className="option-container">Total Correct Questions :{localStorage.getItem('CorrectAnswer')} </h2>
                <h2  className="option-container">Total Incorrect Questions :{localStorage.getItem('IncorrectAnswer')}</h2>
          
            <button onClick={handleReset}  className="next-btn">Try Again</button>
        </div>
    )
}
export default Result











