import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";
import courseParts from "./Data/PartsData";

const App = () => {
  return (
    <div>
      <Header courseName = "Half Stack application development" />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
