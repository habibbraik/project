import React, { useEffect, useState } from 'react';
import customFetch from '../../../../utils/customFetch';
import SecondNavbar from '../../../navbar/SecondNavbar';
import './video.css';


const Video = () => {
    const [activeCategory, setActiveCategory] = useState('All'); // Default category
    const [filteredVideos, setFilteredVideos] = useState([]); // Videos to display
    const [isClose, setIsClose] = useState(true);
    const [selectedImg, setSelectedImg] = useState("");
    const [dataa, setDataa] = useState(null);
    const [data, setData] = useState(null);
    const [isLoading , setIsLoading] = useState(true);
    const [isLoading1 , setIsLoading1] = useState(true);
    const [user,setUser] = useState(null)
    const fetchUser= async () => {
        try {

            const response = await customFetch('/users/showMe');
        setUser(response.data.user)
        setIsLoading1(false)
          return response
        } catch (error) {
            console.error(error);
            setIsLoading1(false)
           return error
        }

      }

      useEffect(() => {
      if(!user){
      fetchUser();
      }
    })
    async function fetchData() {
        try {
            const response = await customFetch('/videos/uploadVideo');
            const filteredImages = response?.data?.images?.filter(imagee => imagee.video !== "null")
            setData(filteredImages);
            setDataa(filteredImages);
            setIsLoading1(false);
        } catch (error) {
            console.error(error);
            setData([]);
            setIsLoading1(false);
        }
    }

useEffect(() => {
  if(!data){
  fetchData();
  }

  }, [data]);
    // Video data with categories
    // const videos = [
    //     { src: video1, category: 'formation' },
    //     { src: video2, category: 'formation' },
    //     { src: video3, category: 'salle' },
    //     { src: video4, category: 'salle' },
    //     { src: video1, category: 'formation' },
    //     { src: video2, category: 'salle' },
    // ];

    useEffect(() => {
        // Filter videos based on the active category
        if (activeCategory === 'All') {
            setFilteredVideos(data);
        } else {
            setFilteredVideos(data?.filter(video => video.category === activeCategory));
        }
    }, [activeCategory, data]);

    return (
        <>
            <SecondNavbar />
            <main className='main-content-courses-all-page'>
                <div className='content-main-courses-all-page'>
                    <div className='header-content-main-courses-all-page'>
                        <h1>Video</h1>
                    </div>
                    <div className='category-content-main-courses-all-page'>
                        <div className='all-content-categories-courses'>
                            <li
                                onClick={() => setActiveCategory('All')}
                                className={activeCategory === 'All' ? 'active' : ''}
                            >
                                All
                            </li>
                            <li
                                onClick={() => setActiveCategory('formation')}
                                className={activeCategory === 'formation' ? 'active' : ''}
                            >
                                Formation
                            </li>
                            <li
                                onClick={() => setActiveCategory('évenement')}
                                className={activeCategory === 'évenement' ? 'active' : ''}
                            >
                                Événement
                            </li>
                        </div>
                    </div>
                    <div className='gallerie-all-content-galerie'>
                        <div className='content-gallerie-all-content-galerie-video'>
                            {filteredVideos?.map((video, index) => (
                                <video key={index} controls>
                                    <source src={video.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
};

export default Video;
