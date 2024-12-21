import React from 'react';

const Course = ({courses}) => {
    return courses.map(course => 
    <div key={course.id}>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    );
  };
  
  const Header = ({name}) => <h1>{name}</h1>
  
  const Total = ({parts}) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return (
      <div>
        <p><b>Total of {total} exercises</b></p>
      </div>
    )
  }
  
  const Content = ({parts}) => {
    return parts.map(part => 
    <Part key={part.id} name={part.name} exercises={part.exercises} 
    />);
  };
  
  const Part = ({name, exercises}) => <p>{name} {exercises}</p>

  export default Course;