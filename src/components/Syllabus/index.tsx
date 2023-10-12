import { Tabs } from "antd";
import SubtopicComponent from "components/SubtopicComponent";
import React, { FC, useState } from "react";

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

const Syllabus: FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
  };
  return (
    <Tabs
      tabPosition="top"
      defaultActiveKey="1"
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
  );
};

export default Syllabus;
