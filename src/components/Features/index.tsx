import { FC } from "react";
import { Row, Col } from "antd";
import "./styles.css";
import CardWithImage from "components/CardWithImage";

//TODO change the respective images accordingly
const dummyImage =
  "https://thumbs.dreamstime.com/z/civil-engineering-word-cloud-concept-grey-background-88534044.jpg?w=992";

const data = [
  {
    img: dummyImage,
    title: "All model questions",
    description: "Find model questions of your respective field",
  },
  {
    img: dummyImage,
    title: "Take Exam",
    description: "Attempt an exam and see where you stand",
  },
  {
    img: dummyImage,
    title: "All engineering fields",
    description: "Find your respective engineering field",
  },
];

const Feature: FC = () => {
  return (
    <div className="container">
      <div className="section">
        <Row>
          <Col>
            <h1 className="section-title">Our Features</h1>
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <p className="section-content">Try these out</p>
          </Col>
        </Row> */}
      </div>

      <Row className="CardWithImage-container" gutter={16}>
        {data.map((item, index) => (
          <Col span={8} key={index}>
            <CardWithImage
              title={item.title}
              description={item.description}
              imageSrc={item.img}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Feature;
