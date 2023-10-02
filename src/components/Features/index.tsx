import { FC } from "react";
import { Row, Col } from "antd";
import "./styles.css";
import CardWithImage from "components/CardWithImage";
import { useNavigate } from "react-router-dom";

//TODO change the respective images accordingly
const dummyImage =
  "https://thumbs.dreamstime.com/z/civil-engineering-word-cloud-concept-grey-background-88534044.jpg?w=992";

const data = [
  {
    img: dummyImage,
    title: "All model questions",
    description: "Find model questions of your respective field",
    route: "All-model-questions",
  },
  {
    img: dummyImage,
    title: "Take Exam",
    description: "Attempt an exam and see where you stand",
    route: "all-model-questions",
  },
  {
    img: dummyImage,
    title: "All engineering fields",
    description: "Explore your respective engineering field",
    route: "All-fields",
  },
];

const Feature: FC = () => {
  const navigate = useNavigate();
  const handleCardClick = (item: string) => {
    navigate(item);
  };
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

      <Row className="feature-container" gutter={32}>
        {data.map((item, index) => (
          <Col span={8} key={index}>
            <div
              className="hoverable-card"
              onClick={() => {
                console.log("item", item.route);
                handleCardClick(item.route);
              }}
            >
              <CardWithImage
                title={item.title}
                description={item.description}
                imageSrc={item.img}
              />
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Feature;
