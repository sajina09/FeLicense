import React from "react";
import { Row, Col } from "antd";
import "./styles.css";

interface Subtopic {
  id: string;
  title: string;
  subtopics?: string[];
}

interface Chapter {
  id: string;
  title: string;
  subtopics: Subtopic[];
}

interface CourseData {
  chapters: Chapter[];
}

const courseData: CourseData = {
  chapters: [
    {
      id: "1",
      title:
        "Chapter 1 : Concept of Basic ELectrical and Electronics Engineering",
      subtopics: [
        {
          id: "1",
          title: "1.1 Basic Concept",
          subtopics: [
            "Second Subtopic",
            "Second Sub Second Sub topic topic Second Subtopic Second Subtopic Second Subtopic",
          ],
        },
        { id: "2", title: "1.2 Second Subtopic" },
        { id: "3", title: "1.3 Third Subtopic" },
        { id: "4", title: "1.4 Fourth Subtopic" },
        { id: "5", title: "1.5 Fifth Subtopic" },
        { id: "6", title: "1.6 Sixth Subtopic" },
      ],
    },
  ],
};

const SubtopicComponent: React.FC = () => {
  return (
    <div>
      {courseData.chapters.map((chapter) => (
        <div key={chapter.id}>
          <h3>{chapter.title}</h3>
          <Row gutter={[16, 16]} wrap>
            {chapter.subtopics.map((subtopic) => (
              <Col key={subtopic.id} span={8}>
                <div className="chapter-name">{subtopic.title}</div>
                {subtopic?.subtopics?.map((subtopic) => (
                  <ul>
                    <li>{subtopic}</li>
                  </ul>
                ))}
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </div>
  );
};

export default SubtopicComponent;
