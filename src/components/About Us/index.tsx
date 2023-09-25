import { FC } from "react";
import "./styles.css"; // Import your CSS for styling

const maskImage =
  "https://thumbs.dreamstime.com/z/faceless-hooded-anonymous-computer-hacker-programming-code-monitor-49753774.jpg?w=992";

const AboutUs: FC = () => {
  return (
    <div className="about-us-container">
      <div
        className="mask-image"
        style={{
          backgroundImage: `url(${maskImage})`,
        }}
      ></div>
      <h1>About Beer: Become an Engineer</h1>
      <p className="description">
        We are a group of engineering students who embarked on a mission to make
        the journey to engineering licensure exams easier for students like you.
        Our platform is not-for-profit and driven by the sole motive of
        providing assistance to those striving to become engineers.
      </p>
      <p className="note">
        <strong>Note:</strong> While we've used the power of technology,
        including AI tools like ChatGPT and BARD, to gather answers, please keep
        in mind that not all answers may be 100% accurate. We're constantly
        improving to provide you with the best possible support.
      </p>

      <p className="best-wishes">
        Best wishes to all the aspiring engineers out there! Your dedication and
        hard work will surely lead you to success.
      </p>
    </div>
  );
};

export default AboutUs;
