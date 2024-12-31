import { useState,useEffect } from 'react';

import { FaTimes } from 'react-icons/fa';
import { IoMdImages } from 'react-icons/io';
import { MdVideoCameraBack } from 'react-icons/md';
// import Modal from 'react-modal';
import { Form, useNavigation } from 'react-router-dom';

// import customFetch from '../../../utils/customFetch';
import Textarea from '../../../TextArea';
import './add.css';
import { toast } from 'react-toastify';
import customFetch from '../../../utils/customFetch';
import SidbarDashboard from '../sidebar/SidbarDashboard';
import Modal from 'react-modal';
// Modal.setAppElement('#root');

const Add = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [publishLocation, setPublishLocation] = useState('');
    const [profilePicSrc, setProfilePicSrc] = useState(null);
    const [imageURL, setImageURL] = useState(null); // State to store uploaded image URL
    const [videoURL, setVideoURL] = useState(null); // State to store uploaded video URL
    const [videoContainerStyle, setVideoContainerStyle] = useState({});
    const [photoContainerStyle, setPhotoContainerStyle] = useState({});
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        if (file && file.size > 500000) {
            toast.error('Image size too large');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const { data } = await customFetch.post('/videos/uploadImage', formData);
            toast.success("Image uploaded successfully");
            setImageURL(data.image)
            setPhotoContainerStyle({ border: '2px solid #814CCF' });
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Something went wrong');
        }
    };

    const handleUploadVideo = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            toast.error('No video file selected');
            return;
        }

        const formData = new FormData();
        formData.append('video', file);

        try {
            const { data } = await customFetch.post('/videos/uploadVideo', formData);
            toast.success("Video uploaded successfully");
            console.log(data)
            console.log(data.video)
            setVideoURL(data.video);
            setVideoContainerStyle({ border: '2px solid #814CCF' });
        } catch (error) {
            toast.error(`Video upload failed: ${error?.response?.data?.msg || 'Unknown error'}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsModalOpen(true);
    };

    const handleModalSubmit = async (e) => {
        e.preventDefault();

        if (!publishLocation) {
            toast.error('Please select a publish location');
            return;
        }
        if (!imageURL && !videoURL ) {
            toast.error('Please upload  image or video, ');
            return;
        }
        // const formData = new FormData(e.currentTarget);
        const formData = new FormData(document.querySelector('form'))
        formData.set('image', imageURL);
        formData.set('video', videoURL);
        formData.set('category', publishLocation);
        const data=Object.fromEntries(formData)

        try {

            const response = await customFetch.post('/videos/createPhotoWithVideo', data);
            console.log(response.data)
            toast.success('Content submitted successfully');
            setIsModalOpen(false);
            return response
        } catch (error) {
            toast.error(error?.response?.data?.msg || 'Something went wrong');

        }
    };

    useEffect(() => {
        const inputFile = document.getElementById('add-1');

        if (inputFile) {
        inputFile.onchange = function () {
            if (inputFile.files && inputFile.files[0]) {
            setProfilePicSrc(URL.createObjectURL(inputFile.files[0]));
            }
        }
        }

    }, []);
    useEffect(() => {
        // Remove the background color when the component reloads or re-renders
        setVideoContainerStyle({});
        setPhotoContainerStyle({})
    }, []);
    return (

        <section className='adding-section'>

              <Form className="form-content-inputs"  encType='multipart/form-data' method='post'  >
            <div className='adding-content'>
                <div className='adding-header'>
                    <h1>Ajouter des photos - Vidéos</h1>
                    {/* From Uiverse.io by SelfMadeSystem  */}
                    <p>
                        Vous pouvez ajouter des photos et des vidéos des
                        événements et des activités qui se déroulent dans votre école,
                        avec une description (facultatif)
                    </p>
                </div>
                <div>






                <div className="input-contents">
                            <div className="desc-adding">
                                <Textarea type='text' placeholder='Add Description..' name='description' required={false} />
                            </div>
                            <div className="adding-input-content">
                                <div className="addP" >
                                    <label htmlFor="add-1" style={photoContainerStyle}>
                                        <div className="content-label-add">
                                        {profilePicSrc ? (
                                            <>
                                            <img src={profilePicSrc} style={{ borderRadius: '10px' }} id="image-pic" alt="profile pic 1" />
                                            <FaTimes onClick={() => setProfilePicSrc(null)} className="close-icon-add" />
                                            </>
                                        ) : (
                                            <div className='content-content-vip-middle'>
                                            <span><IoMdImages /></span>
                                            <h3>Ajouter une photo</h3>
                                            </div>
                                        )}
                                        </div>
                                    </label>
                                    <input type="file" name='image' accept='image/*' id='add-1' className="input-add" onChange={handleUploadImage} style={{ display: 'none', visibility: 'hidden' }} />
                                </div>

                                <div className="addPP"  >
                                    <label htmlFor="add-2" style={videoContainerStyle}>
                                        <div className='content-label-add'>
                                            {videoURL ? (
                                                <div className="video-preview-card">
                                                    <video controls width="100%">
                                                        <source src={videoURL} style={{ borderRadius: '10px' }} type="video/mp4" />
                                                        Votre navigateur ne prend pas en charge la balise vidéo.
                                                    </video>
                                                    <FaTimes onClick={()=> setVideoURL(null)} className="close-icon-add" />
                                                </div>
                                            ) : (
                                                <div className='content-content-vip-middle'>
                                                    <span><MdVideoCameraBack /></span>
                                                    <h3>Ajouter une vidéo</h3>
                                                </div>
                                            )}
                                        </div>
                                    </label>
                                    <input type="file" name='video' accept='video/*' id='add-2' className="input-add" onChange={handleUploadVideo} style={{ display: 'none', visibility: 'hidden' }} />
                                </div>




                            </div>
                            <button className="upload-pv-btn" onClick={handleSubmit}  >suivant</button>
                        </div>

                </div>
            </div>
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                contentLabel="Publish Location Modal"
                className="modal-pv"
                overlayClassName="modal-overlay"
            >

                <h2 className='heading-modal-pv'>Choisissez lemplacement de publication</h2>
                <div className='content-of-all-pv-modal'>

                <div className="modal-options-chechbox-pv">
                    <label>
                        <input
                            type="checkbox"
                            name="category"
                            value="Training"
                            checked={publishLocation === 'évenement'}
                            onChange={() => setPublishLocation('évenement')}
                            />
                        <span>évenement</span>
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            name="category"
                            value="formation"
                            checked={publishLocation === 'formation'}
                            onChange={() => setPublishLocation('formation')}
                        />
                        <span>formation</span>
                    </label>
                </div>
                 <div className='content-pv-modal-btn'>
                <button type='submit' disabled={isSubmitting} onClick={handleModalSubmit}      className="modal-submit-btn-pv">Envoyer</button>  {/* onClick={handleModalSubmit} */}
             </div>
                 </div>
             </Modal>
            {/* <SidbarDashboard isModalOpen={isModalOpen}/> */}
            </Form>
        </section>
    );
};

export default Add;


