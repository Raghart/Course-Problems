import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>;

const StatisticsLine = ({text, value}) => {
  return(
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive_percentage}) => {
  if (all === 0) {
    return (
      <div>
        <h3>No Feedback given yet :c</h3>
      </div>
    )
  } else {
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="Good Reviews" value={good}/>
          <StatisticsLine text="Neutral Reviews" value={neutral}/>
          <StatisticsLine text="Bad Reviews" value={bad}/>
          <StatisticsLine text="Number of reviews made" value={all}/>
          <StatisticsLine text="Average" value={average}/>
          <StatisticsLine text="% of positive reviews" value={positive_percentage + '%'}/>
        </tbody>
      </table>
    </div>
  );}
};

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive_percentage, setPercentage] = useState(0)

  return (
    <div>
      <h1>Give Feedback!</h1>
      <Button onClick={() => {
        const newGood = good + 1;
        const newAll = all + 1
        setGood(newGood); 
        setAll(newAll);
        setAverage((newGood - bad) / newAll);
        setPercentage((newGood / newAll) * 100);
      }} text="Good Review" />

      <Button onClick={() => {setNeutral(neutral + 1);
        const newAll = all + 1;
        setAll(newAll);
        setPercentage((good / newAll) * 100);
      }} text="Neutral Review" />

      <Button onClick={() => {
        const newBad = bad + 1;
        const newAll = all + 1;
        setBad(newBad);
        setAll(newAll);
        setAverage((good - newBad) / newAll);
        setPercentage((good / newAll) * 100);
      }} text="Bad Review" />

      <Statistics 
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive_percentage={positive_percentage}
      />
    </div>
  )
}

export default App