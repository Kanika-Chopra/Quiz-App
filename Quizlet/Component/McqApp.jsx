import React, { useEffect } from "react";
import { quizdata } from "./Quizdata";
import { useState } from "react";
import MultiProgress from "react-multi-progress";
import { useNavigate } from "react-router-dom";

function McqApp() {
  //State to maintain current question
  const [currentQuestion, setCurrentQuestion] = useState(0);

  //state to maintain correct answers
  const [correctAnswer, setCorrectAnswer] = useState(0);

  //state to validate the selected option
  const [isValidOption, setIsValidOption] = useState("");

  //state to show button
  const [showButton, setShowButton] = useState(false);

  // State to maintain when the options will be shuffled
  const [shuffleOption] = useState(true);

  // State to maintain incorrect answers
  const [incorrectAnswer, setIncorrectAnswer] = useState(100);

  // State to show check result button
  const [resultButton, setResultButton] = useState(1);

  // State for the selected option out of four options
  const [selectedOption, setSelectedOption] = useState("");

  // State to render shuffled array conditionally
  const [showShuffledArray, setshowShuffledArray] = useState([]);

  // Navigate to Result Page
  const navigate = useNavigate();

  // Function to shuffle the array
  function shuffle(options) {
    let currentIndex = options.length,
      randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex !== 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [options[currentIndex], options[randomIndex]] = [
        options[randomIndex],
        options[currentIndex],
      ];
    }
    return options;
  }

  //Function to form combined array of correct and incorrect answers
  const handleOptions = (index) => {
    let options = [quizdata[index].correct_answer];
    if (shuffleOption) {
      for (let opt of quizdata[index].incorrect_answers) {
        options.push(opt);
      }
      options = shuffle(options);
    }
    return options;
  };

  // useEffect Hook to conditionally shuffling of array on change of question
  useEffect(() => {
    const shuffledArr = handleOptions(currentQuestion);
    setshowShuffledArray(shuffledArr);
  }, [currentQuestion]);

  // Function to change questions upto quizdata length
  const changeQuestion = (e) => {
    e.preventDefault();
    setShowButton(false);
    if (currentQuestion < quizdata.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setIsValidOption("");
      setResultButton(resultButton + 1);
      setSelectedOption("");
    }
  };

  //Function to check whether option selected is correct or incorrect
  const handleOptionClicked = (item, index) => {
    setSelectedOption(index);
    if (item === quizdata[currentQuestion].correct_answer) {
      setCorrectAnswer(correctAnswer + 100/quizdata.length);
      setIsValidOption("Correct");
      setShowButton(true);
    } else {
      setIsValidOption("Sorry,please try again");
      setShowButton(true);

      setIncorrectAnswer(incorrectAnswer - 100/quizdata.length);
    }
  };

  //Function to print stars on the basis of difficulty levels
  const handleDifficultyLevel = (difficulty) => {
    if (difficulty === "easy") {
      return "★☆☆☆☆";
    } else if (difficulty === "medium") {
      return "★★★☆☆";
    } else {
      return "★★★★★";
    }
  };

  //Function to store the results into localStorage and navigate to new page
  const checkResult = () => {
    localStorage.setItem("Result", correctAnswer.toFixed(2));
    localStorage.setItem("CorrectAnswer", correctAnswer / 5);
    localStorage.setItem(
      "IncorrectAnswer",
      (quizdata.length - correctAnswer / 5)
    );
    navigate("/Result");
  };

  return (
    <div>
      <h1 className="heading-txt">QUIZLET</h1>
      <div className="container">
        <progress
          value={currentQuestion + 1}
          max={quizdata.length}
          className="quesProgressBar"
        ></progress>

        <h3 className="font_ques">
          Question {currentQuestion + 1} of {quizdata.length}.
        </h3>
        <div className="heading">
          Category: {decodeURIComponent(quizdata[currentQuestion].category)}
        </div>
        <div className="heading">
          {" "}
          {decodeURIComponent(
            handleDifficultyLevel(quizdata[currentQuestion].difficulty)
          )}
        </div>
        <div className="question">
          <span id="question-text">
            {decodeURIComponent(quizdata[currentQuestion].question)}
          </span>
        </div>
        <div className="option-container">
          {isValidOption ? <div>{isValidOption}</div> : ""}
          {showShuffledArray.map((option, index) => {
            return (
              <>
                {isValidOption.length > 0 ? (
                  <button
                    className="option-btn"
                    style={{
                      backgroundColor:
                        index === selectedOption && "rgb(86, 11, 184)",
                      color: index === selectedOption && "white",
                      border: index === selectedOption && "1px solid black",
                    }}
                  >
                    {decodeURIComponent(option)}
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleOptionClicked(option, index);
                    }}
                    className="option-btn"
                  >
                    {decodeURIComponent(option)}
                  </button>
                )}
              </>
            );
          })}
        </div>

        {showButton === true ? (
          <button onClick={changeQuestion} className="next-btn">
            Next
          </button>
        ) : null}

        {resultButton + 1 > quizdata.length ? (
          <button onClick={checkResult} className="next-btn">
            Check Results
          </button>
        ) : null}

        <span className="leftAligned">
          {" "}
          <label>Score : {correctAnswer.toFixed(2)}</label>{" "}
        </span>

        <span className="rightAligned">
          {" "}
          <label>Max Score : {incorrectAnswer.toFixed(2)}</label>
        </span>
        
        <MultiProgress
          className="answerProgressBar"
          transitionTime={1.2}
          elements={[
            {
              value: correctAnswer,
              color: " hotpink",
              isBold: false,
            },
            {
              value: 0,
              color: "rgb(100,0,0)",

              fontSize: 12,
              textColor: "white",
              isBold: true,
            },
            {
              value: incorrectAnswer,
              color: "rgb(86, 11, 184)",

              textColor: "White",
              fontSize: 12,
              isBold: false,
              className: "my-custom-css-class",
            },
          ]}
          height={20}
        />
      </div>
    </div>
  );
}

export default McqApp;
