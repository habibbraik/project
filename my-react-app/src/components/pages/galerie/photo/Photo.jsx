import React, { useEffect, useState } from 'react';
import img from '../../../../../public/images/a.jpg';
import img1 from '../../../../../public/images/b.jpg';
import img2 from '../../../../../public/images/c.jpg';
import img3 from '../../../../../public/images/stdu1.jpg';
import customFetch from '../../../../utils/customFetch';
import SecondNavbar from '../../../navbar/SecondNavbar';
import './photo.css';

const Photo = () => {
    const [isClicked, setIsClicked] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeCategory, setActiveCategory] = useState('All'); // Default category
    const [filteredImages, setFilteredImages] = useState([]); // Images to display
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
            const filteredImages = response.data?.images?.filter(imagee => imagee.image !== "null")
            console.log(response.data?.images)
            setData(filteredImages);
            setDataa(filteredImages);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setData([]);
            setIsLoading(false);
        }
}
useEffect(() => {
  if(!data){
  fetchData();
  }

  }, [data]);
    // Image data with categories
    const images = [
        { src: img, category: 'Formation' },
        { src: img1, category: 'Formation' },
        { src: img2, category: 'Salle' },
        { src: img3, category: 'Salle' },
        { src: img, category: 'Formation' },
        { src: img1, category: 'Salle' },
        { src: img2, category: 'Formation' },
        { src: img3, category: 'Salle' },
    ];

    useEffect(() => {
        // Filter images based on the active category
        if (activeCategory === 'All') {
            setFilteredImages(data);
        } else {
            setFilteredImages(data?.filter(image => image?.category === activeCategory));
        }
    }, [activeCategory, data]);

    const clickedImage = (imageSrc) => {
        setIsClicked(true);
        setSelectedImage(imageSrc);
    };

    const closeImage = () => {
        setIsClicked(false);
        setSelectedImage(null);
    };

    return (
        <>
            <SecondNavbar />
            <main className='main-content-courses-all-page'>
                <div className='content-main-courses-all-page'>
                    <div className='header-content-main-courses-all-page'>
                        <h1>Photo</h1>
                    </div>
                    <div className='category-content-main-courses-all-page'>
                        <div className='all-content-categories-courses'>
                            <li onClick={() => setActiveCategory('All')} className={activeCategory === 'All' ? 'active' : ''}>
                                All
                            </li>
                            <li onClick={() => setActiveCategory('formation')} className={activeCategory === 'formation' ? 'active' : ''}>
                                Formation
                            </li>
                            <li onClick={() => setActiveCategory('évenement')} className={activeCategory === 'évenement' ? 'active' : ''}>
                                Événement
                            </li>
                        </div>
                    </div>
                    <div className='gallerie-all-content-galerie'>
                        <div className='content-gallerie-all-content-galerie'>
                            {filteredImages?.map((image, index) => (
                                <img key={index} src={image?.image} alt={image?.category} onClick={() => clickedImage(image.image)} />
                            ))}
                        </div>
                    </div>
                    {isClicked && (
                        <div className="overlay-image-gallerie">
                            <button className="close-button" onClick={closeImage}>×</button>
                            <img className="large-image" src={selectedImage} alt="Enlarged view" />
                        </div>
                    )}
                </div>
            </main>
        </>
    );
};

export default Photo;
