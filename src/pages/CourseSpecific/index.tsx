import React, { useState } from "react";
import { Tabs } from "antd";
import Ticket from "components/Ticket";
import "./styles.css";
import ChooseCourse from "components/ChooseCourse";
import SubtopicComponent from "components/Syllabus";

interface Course {
  id: string;
  title: string;
}

const courses = [
  {
    id: "1",
    title: "Chapter 1",
    url: "https://example.com/course1",
  },
  {
    id: "2",
    title: "Chapter 2",
    url: "https://example.com/course2",
  },
  // Add more course objects as needed
];

const CourseSpecific: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };

  return (
    <div className="course-specific-container">
      <div className="course-specific-name" style={{ width: "400px" }}>
        <Ticket
          title="Information Technology"
          description="A detailed, reliable view of your IT knowledge in a quick convenient format."
        />
      </div>
      <Tabs
        tabPosition="top"
        defaultActiveKey="0"
        className="chapter-tab"
        onChange={(key) => {
          const course = courses.find((course) => course.id === key);
          if (course) {
            setSelectedCourse(course);
          } else {
            setSelectedCourse(null);
          }
        }}
      >
        {courses.map((course) => (
          <Tabs.TabPane tab={course.title} key={course.id}>
            {selectedCourse && (
              <div>
                <SubtopicComponent
                //   courseId={selectedCourse.id}
                />
              </div>
            )}
          </Tabs.TabPane>
        ))}
      </Tabs>

      <ChooseCourse />
    </div>
  );
};

export default CourseSpecific;
