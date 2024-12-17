const Header = (props) => {
  return <h1>{props.course.name}</h1>
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
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  );
};

export default App
