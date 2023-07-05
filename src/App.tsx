import { MouseEventHandler, ReactNode, useEffect, useMemo, useState } from 'react';
import playIcon from './assets/play.svg'
import './App.css'

let interval;

function App() {
  const [text, setText] = useState<string[]>([]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [currentWord, setCurrentWord] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(300);

  useEffect(() => {
    if (playing)
      interval = setInterval(() => {
        if (currentWord < text.length)
          setCurrentWord((prev) => prev + 1);
        else {
          clearInterval(interval);
          setPlaying(false);
        }
      }, 60000 / speed);
    else {
      clearInterval(interval);
    }

    return () => {
      clearInterval(interval);
    }
  }, [playing])

  const displayWord = useMemo<ReactNode>(() => {
    let wordArray: Array<string | ReactNode> = [];
    if (text.length && currentWord < text.length)
      wordArray = text[currentWord].split('');
    const mid = Math.floor((wordArray.length - 1) / 2);
    wordArray[mid] = <span key={wordArray[mid]} style={{ color: 'red' }}>{wordArray[mid]}</span>;
    return wordArray;
  }, [currentWord, text]);

  const playButtonHandler: MouseEventHandler = () => {
    if (text.length > 0)
      setPlaying(!playing);
  }

  return (
    <section className='section'>
      <div>
        <div>
          <button className='play-button' onClick={playButtonHandler}><img src={playIcon} /></button>
          <button onClick={() => setCurrentWord(0)}>Reset</button>
        </div>
        <p>{displayWord}</p>
      </div>
      <textarea value={text.join(' ')} onChange={(e) => setText(e.currentTarget.value.split(' '))} />
    </section>
  )
}

export default App
