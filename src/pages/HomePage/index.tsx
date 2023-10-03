import ChooseCourse from "components/ChooseCourse";
import Ticket from "components/Ticket";
import React from "react";
import FlagOfNepal from "assets/Flag_of_Nepal.png";
import "./styles.css";
import Feature from "components/Features";

const HomePage: React.FC = () => {
  const openWikipedia = () => {
    window.open("https://en.wikipedia.org/wiki/Nepal", "_blank");
  };

  const dummyImage =
    "https://thumbs.dreamstime.com/z/innovative-architecture-civil-engineering-plan-innovative-architecture-civil-engineering-building-construction-project-170431310.jpg?w=992";

  return (
    <div className="home-page">
      <div style={{ marginBottom: "5rem" }}></div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "80%", //TODO : Fix height in big screen
          backgroundImage: `url(${dummyImage})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          filter: "blur(5px)",
        }}
      ></div>
      <div
        style={{
          width: "40%",
          height: "40vh",
          marginLeft: "10rem",
          marginTop: "32rem",
          position: "relative",
        }}
      >
        <Ticket
          title={
            <>
              Based on &nbsp;
              <span className="flag" onClick={openWikipedia}>
                <img src={FlagOfNepal} alt="Flag" className="flag-image" />
              </span>{" "}
              Engineering Council
            </>
          }
          description="This is an online platform for all national and international students who are seeking Er. License from Nepal."
        ></Ticket>
      </div>

      <Feature />
      {/* <LandingDescriptionBlock /> */}
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
