const Header = (props) => {
  return <h1>{props.course}</h1>
};

const Part = (props) => {
  return (
    <p>
      Content: {props.name}, Number of exercises: {props.exercises}
    </p>
  )
}

const Content = (props) => {
    return (
      <div>
        {props.parts.map(part => (
           <Part key={part.id} name={part.name} exercises={part.exercises} />
        ))}
      </div>
    ) 
  }

const Total = (props) => {
  let total = 0;
  for (let i = 0; i < props.parts.length; i++) {
    total += props.parts[i].exercises;
  }
  return <p>The Total Number of Exercises is {total}</p>;
};

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [
    {id:1, name: part1, exercises: exercises1},
    {id:2, name: part2, exercises: exercises2},
    {id:3, name: part3, exercises: exercises3},
  ];

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total parts={parts}/>
    </div>
  );
};

export default App
