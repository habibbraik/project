import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import customFetch from '../../../../../utils/customFetch'
import './sec3.css'
import SingleCard from './SingleCard'

const Sec3 = () => {
    const [readMoreState, setReadMoreState] = useState({});
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await customFetch('/courses');
                const courses = (response.data.courses);

                // Shuffle the courses array
                const shuffledCourses = courses.sort(() => 0.5 - Math.random());
                // Select the first 3 courses
                const selectedCourses = shuffledCourses.slice(0, 4);

                setData(selectedCourses);
            } catch (error) {
                console.error(error);
                setData([]);
            }
        }

        fetchData();
    }, []);
if(!data){
    return <div>loading...</div>
}
    const toggleReadMore = (id) => {
        setReadMoreState((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };
  return (
    <main className='main-content-third-section-home'>
        <div className='content-third-section-home-page'>
            <div className='main-title-third-section-home'>
                <h1>
                    Une Sélection Aléatoire de Nos Cours d'Excellence
                </h1>
                <Link to={'/cours'}>tous les cours</Link>
            </div>
            <div className='card-third-section-con-home-orders'>
                <SingleCard data={data} readMore={readMoreState} />
            </div>
        </div>
    </main>
  )
}

export default Sec3