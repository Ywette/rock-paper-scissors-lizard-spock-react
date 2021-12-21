import "./App.scss";
import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import Confetti from "react-confetti/dist/types/Confetti";
import ReactConfetti from "react-confetti";
let Spinner = require('react-spinkit');
import lizard from './assets/lizard.png'
import paper from './assets/paper.png'
import rock from './assets/rock.png'
import scissors from './assets/scissors.png'
import spock from './assets/spock.png'

// type UserDataProps = {
//     name: string,
//     // points: number,
//     // playedGames: string[]
// }

type WinsProps ={
    userWins: number,
    computerWins: number,
}

// const choices = [
//     {name: "rock", image: rock},
//     {name: "paper", image: paper},
//     {name: "scissors", image: scissors},
//     {name: "lizard", image: lizard},
//     {name: "spock", image: spock},
// ]
const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

const App = () => {

    const [userName, setUserData]=useState('');
    const [toggleStart, setToggleStart]=useState(false);
    const [userChoice, setUserChoice]=useState('');
    const [computerChoice, setComputerChoice]=useState('')
    const [result, setResult]=useState('');
    const [roundCount, setRoundCount]=useState(0);
    const [roundsToPlay, setRoundsToPlay]=useState(0);
    const [wins, setWins]=useState<WinsProps>({userWins: 0, computerWins: 0});
    const [gameOver, setGameOver]=useState(false)

    const handleClick = (value: string)=>{
        setUserChoice(value);
        setComputerChoice('');
        setTimeout(generateComputerChoice, 500);
        setRoundCount(roundCount + 1);
    }

    const generateComputerChoice = () => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(randomChoice)
        console.log(randomChoice)
    }

    const getWeaponImage=(value: string)=>{
        switch(value){
            case 'rock':
                return rock;
            case 'paper':
                return paper;
            case 'scissors':
                return scissors;
            case 'lizard':
                return lizard;
            case 'spock':
                return spock;
        }

    }
    const checkResult = () =>{
        switch(userChoice + computerChoice){
            case 'scissorspaper':
            case 'paperrock':
            case 'rocklizard':
            case 'lizardspock':
            case 'spockscissors':
            case 'scissorslizard':
            case 'lizardpaper':
            case 'paperspock':
            case 'spockrock':
            case 'rockscissors':
                setResult('You WIN!')
                setWins({...wins, userWins: wins.userWins + 1})
                break
            case 'paperscissors':
            case 'rockpaper':
            case 'lizardrock':
            case 'spocklizard':
            case 'scissorsspock':
            case 'lizardscissors':
            case 'paperlizard':
            case 'spockpaper':
            case 'rockspock':
            case 'scissorsrock':
                setResult('You LOSE!')
                setWins({...wins, computerWins: wins.computerWins + 1})
                break
            case 'rockrock':
            case 'paperpaper':
            case 'scissorsscissors':
            case 'lizardlizard':
            case 'spockspock':
                setResult('Its a DRAW!')
                break
        }
    }

    useEffect(()=>{
        setResult('');
        setTimeout(checkResult, 500);

    }, [computerChoice, userChoice])

    useEffect(()=>{
        if(wins.userWins === roundsToPlay && wins.userWins !== 0 || wins.computerWins === roundsToPlay && wins.computerWins !== 0){
            setGameOver(true);
        }
    }, [wins.userWins, wins.computerWins])

  return (
              <div className="app">
                  <h1>čikāsimies</h1>
                  <div className="game__settings">
                      <label className="label">Spēlēsim līdz
                          <input className="input input-rounds m-15" type="number"
                                 onChange={(e) => {
                                     setRoundsToPlay(parseInt(e.target.value))
                                 }
                                 }/> uzvarām
                      </label>

                      {!toggleStart &&
                          <>

                              <label className="">
                                  <input className="input input-userName m-15"  type="text" value={userName}
                                         placeholder="Ievadi savu vārdu..."
                                         onChange={(e) => {
                                             setUserData(e.target.value)
                                         }}
                                  />
                              </label>

                              < button className="input button-start m-15"
                                       onClick={() => {
                                          if (roundsToPlay > 1 && userName !== '') {
                                          setToggleStart(true);
                                          } else {
                                              alert('Ievadi savu vārdu un līdz cik uzvarām spēlēsi')
                                          }}
                                }>
                                  Sākt spēli
                              </button>
                          </> }
                        </div>

                  {toggleStart &&
                      <>
                          <div className="game">
                              <div className="game__gamerChoices">
                                  <div className="game__userChoice">
                                      <span> {userName} ierocis:</span>
                                      <br/>
                                      <div className="game__choiceIcon">
                                          <img className="game__computerWeapon" src={getWeaponImage(userChoice)}/>
                                          {/*{getWeaponImage()}*/}
                                      </div>
                                  </div>
                                  <div className="game__computerChoice">
                                      <span> Bota ierocis:</span>
                                      <br/>
                                      <div className="game__choiceIcon">
                                          <img className="game__computerWeapon" src={getWeaponImage(computerChoice)}/>
                                      </div>
                                  </div>

                              </div>

                              <span> result: {result}</span>

                              <div className="game__chooseWeapon">

                                  {!gameOver ?
                                      choices.map((choice, index) => {
                                          return (
                                              <div className="game__chooseWeapon-buttons" onClick={() => {
                                                  handleClick(choice)
                                              }} key={index}>
                                                  <img className="game__weaponImage"src={getWeaponImage(choice)}/>
                                                  {/*{choice}*/}
                                              </div>)
                                      })
                                      : <button onClick={() => {
                                          setGameOver(false);
                                          setWins({userWins: 0, computerWins: 0});
                                          setUserChoice('');
                                          setComputerChoice('');
                                          setRoundCount(0);
                                          setRoundsToPlay(0);
                                          window.location.reload()
                                      }}
                                      >restart game</button>
                                  }
                              </div>

                          </div>
                          <div className="results">
                              <span>Rounds: {roundCount}</span>
                              <div className="result-table">
                                  <span>{userName} : {wins.userWins}</span>
                                  <span>Computer: {wins.computerWins}</span>
                              </div>
                          </div>
                          {wins.userWins === roundsToPlay &&
                              <>
                                  <span>You are the winner!</span>
                                  <ReactConfetti
                                      width={1500}
                                      height={1500}
                                      numberOfPieces={200}
                                  />
                              </>
                          }
                          {wins.computerWins === roundsToPlay && <span>You lost this time :(</span>}
                          {/*{gameOver && <button onClick={()=>window.location.reload()}>restart game</button>}*/}
                      </>}
              </div>
  );

};



export default App;
