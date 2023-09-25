import { FC } from "react";
import { Row, Col } from "antd";
import "./styles.css";
import CardWithImage from "components/CardWithImage";

//TODO change the respective images accordingly
const dummyImage =
  "https://images.unsplash.com/photo-1566228015668-4c45dbc4e2f5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=987&q=80";
const data = [
  {
    img: dummyImage,
    title: "Complete practice question",
    description:
      "Several questions per subject and NEC model questions are available.",
  },
  {
    img: dummyImage,
    title: "Get your scores instantly",
    description:
      "Complete your questions and get instant answers just below the options.",
  },
  {
    img: dummyImage,
    title: "Answer and analysis of MCQ's",
    description:
      "Just click once, to verify your answers and self analyze your ability.",
  },
];

const LandingDescriptionBlock: FC = () => {
  return (
    <div className="container">
      <div className="section">
        <Row>
          <Col>
            <h1 className="section-title">License test without the stress</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <p className="section-content">
              Judge your Engineering knowledge without the hassle.
            </p>
          </Col>
        </Row>
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

export default LandingDescriptionBlock;
