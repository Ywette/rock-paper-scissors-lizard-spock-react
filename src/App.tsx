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
        setTimeout(generateComputerChoice, 500);
        setRoundCount(roundCount + 1);
    }

    const generateComputerChoice = () => {
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(randomChoice)
    }

    const getWeaponImage=(value: string)=>{
        switch(value){
            case 'rock':
                return rock;
                break
            case 'paper':
                return paper;
                break
            case 'scissors':
                return scissors;
                break
            case 'lizard':
                return lizard;
                break
            case 'spock':
                return spock;
                break
            default:
                return;
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
                setResult('Punkts Tev!')
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
                setResult('Punkts BOTAM!')
                setWins({...wins, computerWins: wins.computerWins + 1})
                break
            case 'rockrock':
            case 'paperpaper':
            case 'scissorsscissors':
            case 'lizardlizard':
            case 'spockspock':
                setResult('Neizšķirts!')
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
          <h1>Čikāsimies!?</h1>
          <div className="settings">
              <label className="settings__label">Spēlēsim līdz
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

                      <button className="input button-start m-15"
                              onClick={() => {
                                   if (roundsToPlay >= 1 && userName !== '') {
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
                          <div className="game__gamers">
                              <span> {userName.toUpperCase()} ierocis:</span>
                              <span> BOTA ierocis:</span>
                          </div>
                          <div className="game__gamers">
                              <div className="game__choiceIcon m-15">
                                  <img className="game__weaponImg" src={getWeaponImage(userChoice)}/>
                              </div>
                              <div className="game__roundResults">
                                  <span>{wins.userWins}</span>

                                  {!gameOver ? <span>{result}</span> :
                                      <div className="game__finalResult">
                                          {wins.userWins === roundsToPlay ? <span>Tu vinnēji spēli</span> : <span>Tu zaudēji spēli</span>}
                                          <span>{roundCount} raundos</span>
                                          <button className="input button-start m-15" onClick={() => {
                                              window.location.reload()
                                          }}
                                          >restart game</button>
                                      </div>
                                  }

                                  <span>{wins.computerWins}</span>
                              </div>
                              <div className="game__choiceIcon m-15">
                                  <img className="game__weaponImg" src={getWeaponImage(computerChoice)}/>
                              </div>
                          </div>
                      </div>

                      <div className="game__chooseWeapon">

                          {!gameOver &&
                              choices.map((choice, index) => {
                                  return (
                                      <div className="game__chooseWeapon-buttons" onClick={() => {
                                          handleClick(choice)
                                      }} key={index}>
                                          <img className="game__weaponImage"src={getWeaponImage(choice)}/>
                                          {/*{choice}*/}
                                      </div>)
                              })
                          }
                      </div>
                  </div>
                  {wins.userWins === roundsToPlay &&

                          <ReactConfetti
                              width={1500}
                              height={700}
                              numberOfPieces={300}
                          />
                  }
              </>}
      </div>
  );
};

export default App;
