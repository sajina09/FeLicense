import AvailableModelQuestion from "components/Button/AvailableModelQuestions";
import ChooseCourse from "components/ChooseCourse";
import LandingDescriptionBlock from "components/LandingDescriptionBlock";
import Ticket from "components/Ticket";
import React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div style={{ marginBottom: "5rem" }}></div>
      <div
        style={{
          width: "40%",
          height: "40vh",
          marginLeft: "10rem",
          marginTop: "18rem",
        }}
      >
        <Ticket
          title={
            <>
              Based on Nepal Engineering Council
              {/* <img
                style={{ maxWidth: "100%", height: "auto" }}
                alt="flag of Nepal"
                src={dummyImage}
              ></img>{" "} */}
            </>
          }
          description="This is an online platform for all national and international students who are seeking Er. License from Nepal."
        ></Ticket>
      </div>

      <LandingDescriptionBlock />
      <ChooseCourse />

      <div
        style={{
          width: "40%",
          float: "right",
          margin: "10rem",
          // marginBottom: "2rem",
        }}
      >
        <Ticket
          title={
            <h1>
              Get tips and trick <br></br> straight in your <br></br> Inbox.
            </h1>
          }
          button="Contact Us"
          description="Contact for email series to get expert preparation advice and top tips to help you ace your exam"
        ></Ticket>
      </div>
    </div>
  );
};

export default HomePage;
