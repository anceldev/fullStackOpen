
const Header = ({ course }) => {
  console.log(course.name)
  return (
    <h1>{course.name}</h1>
  )
}

const Content = ({ parts }) => {
  console.log(parts[0])
  return (
    <div>
      {parts.map((part) => {
        return (
          <Part key={part.id} part={part}>{part.name}</Part>
        )
      })

      }
    </div>
  )
}
const Part = ({ part }) => {
  console.log(part)
  return (
    <div>
      <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Total = ({ parts }) => {
  console.log(parts)
  const total = parts.reduce((total, part) => total + part.exercises, 0)
  return (
    <div>
      <b>Total of {total} exercises</b>
    </div>
  )
}

const Course = (props) => {
  const {course} = props
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course