import React, { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../../context';
import customFetch from '../../../../utils/customFetch';
import Loader from '../../../loading/Loader';
import SecondNavbar from '../../../navbar/SecondNavbar';
import NoData from '../../../no-data/NoData';
import Courses from './Courses';

const CoursePage = () => {
  const [data, setData] = useState([]); // Initialize with an empty array
  const [dataa, setDataa] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchData() {
    try {
      const response = await customFetch('/courses');
      const coursesData = response.data.courses || []; // Ensure data is not null
      setData(coursesData);
      setDataa(coursesData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setData([]); // Set to empty array on error
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const { selectedLevel, handleLevelChange } = useGlobalContext();

  const handleCategoryChange = (category) => setSelectedCategory(category);

  // Filter courses based on selected category and level
  const filteredCourses = data.filter(course =>
    (selectedCategory === 'All' || course.category === selectedCategory) &&
    (selectedLevel === 'All' || course.level === selectedLevel)
  );

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader />
      </div>
    );
  }

  if (data.length === 0) {
    return <div><NoData /></div>;
  }

  return (
    <>
      <SecondNavbar handleLevelChange={handleLevelChange} />
      <Courses/>
    </>
  );
};

export default CoursePage;
