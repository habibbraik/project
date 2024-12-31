import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import customFetch from "../../../utils/customFetch";
import Loader from "../../loading/Loader";
import SecondNavbar from '../../navbar/SecondNavbar';
import First from './sections/first-section/first';
import Second from './sections/second-section/Second';
import Third from './sections/third-sectoin/Third';
const SingleCourse = () => {
  const { id } = useParams(); // Get the course ID from the URL
  const [courseData, setCourseData] = useState(null);
  const [loading,setLoading] = useState(true);
  const [data, setData] = useState(null);
  async function fetchData() {
    try {
        const response = await customFetch('/courses');
        setData(response.data.courses);
    } catch (error) {
        console.error(error);
        setData([]);
    }
}
useEffect(() => {
  if(!data){
      fetchData();
  }
}, [data]);
useEffect(() => {
  if (data) {
      const course = data.find((item) => item._id === id);
      setCourseData(course);
      setLoading(false)
  }
}, [data, id]);


if(loading){
  return <div style={{ height: '100vh', display:'flex' , alignItems:'center' , justifyContent:'center',background:'white' }}><Loader/></div>
}

  // Example array of courses with description and schedule
  // const courses = [
  //   {
  //     id: 1,
  //     fees:1000,
  //     title: 'HTML and CSS Lesson',
  //     category: 'Informatique',
  //     level: 'Etudiant',
  //     price: '1200DA',
  //     description: 'Learn the basics of HTML and CSS to build responsive websites.',
  //     schedule: [
  //       { day: 'Sunday', startTime: '08:00', endTime: '09:30' },
  //       { day: 'Monday', startTime: '08:00', endTime: '09:30' },
  //       { day: 'Tuesday', startTime: '08:00', endTime: '09:30' },
  //       { day: 'Wednesday', startTime: '08:00', endTime: '09:30' },
  //       { day: 'Thursday', startTime: '08:00', endTime: '09:30' },
  //       { day: 'Friday', startTime: '08:00', endTime: '09:30' },
  //       { day: 'Saturday', startTime: '08:00', endTime: '09:30' },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     fees:1000,
  //     title: 'HTML and CSS Lesson',
  //     category: 'Math',
  //     level: 'Etudiant',
  //     price: '1200DA',
  //     description: 'A comprehensive course to understand HTML and CSS for web development.',
  //     schedule: [
  //       { day: 'Sunday', startTime: '09:00', endTime: '10:30' },
  //       { day: 'Monday', startTime: '09:00', endTime: '10:30' },
  //       { day: 'Tuesday', startTime: '09:00', endTime: '10:30' },
  //       { day: 'Wednesday', startTime: '09:00', endTime: '10:30' },
  //       { day: 'Thursday', startTime: '09:00', endTime: '10:30' },
  //       { day: 'Friday', startTime: '09:00', endTime: '10:30' },
  //       { day: 'Saturday', startTime: '09:00', endTime: '10:30' },
  //     ],
  //   },
  //   // Add more courses here
  // ];

  // useEffect(() => {
  //   // Find the course based on the ID from the URL
  //   const foundCourse = courses.find(course => course.id === parseInt(id));
  //   setCourse(foundCourse);
  // }, [id]);

  // if (!course) {
  //   return <div>Loading...</div>;
  // }


  return (
    <>
      <SecondNavbar/>
      <First course={courseData} courseData={courseData} />
      <Second description={courseData.description} />
      <Third schedule={courseData.schedule} />
    </>
  );
};

export default SingleCourse;

