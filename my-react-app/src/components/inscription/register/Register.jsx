import { useEffect, useState } from 'react';
// import { useTranslation } from "react-i18next";
import { FaTimes } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { Form, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormRow from '../../../FormRow';
import customFetch from '../../../utils/customFetch';
import './register.css';

const Register = () => {

    const [profilePicSrc, setProfilePicSrc] = useState(null);

    const navigate = useNavigate();
    const isSubmitting=navigate.state==='submitting'

    const [profilePicTwoSrc, setProfilePicTwoSrc] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [imageURL1, setImageURL1] = useState(null);

    const [alert, setAlert] = useState({
        show: false,
        text: '',
        type: 'danger',
      });
    const [success, setSuccess] = useState(false);
    const showAlert = ({ text, type = 'danger' }) => {
        setAlert({ show: true, text, type });
      };
      const hideAlert = () => {
        setAlert({ show: false, text: '', type: 'danger' });
      };


    useEffect(() => {
        const inputFile = document.getElementById('card-nat-recto');
        const inputFileTwo = document.getElementById('card-nat-verso');

        if (inputFile) {
        inputFile.onchange = function () {
            if (inputFile.files && inputFile.files[0]) {
            setProfilePicSrc(URL.createObjectURL(inputFile.files[0]));
            }
        }
        }

        if (inputFileTwo) {
        inputFileTwo.onchange = function () {
            if (inputFileTwo.files && inputFileTwo.files[0]) {
            setProfilePicTwoSrc(URL.createObjectURL(inputFileTwo.files[0]));
            }
        }
        }
    }, []);
    const handleUploadImage = async (e) => {
        const file = e.target.files[0];
        // console.log(file)

        const formData = new FormData();
        formData.append('image', file);
        try {
            const { data } = await customFetch.post('/auth/uploadImage', formData);
            console.log(data);
            toast.success("Image Identity Card Front uploaded successfully");
            setImageURL(data.image)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.msg || 'Something went wrong');
        }
    };
     const handleUploadImage1 = async (e) => {
        const file = e.target.files[0];
     

        const formData = new FormData();
        formData.append('image1', file);
        console.log(formData)
        try {
            const { data } = await customFetch.post('/auth/uploadImage1', formData);
            console.log(data);
            toast.success("Image Identity Card Back uploaded successfully");
            setImageURL1(data.image1)
        } catch (error) {
            console.log(error)
            toast.error(error?.response?.data?.msg || 'Something went wrong');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        hideAlert();
        const formData = new FormData(e.currentTarget); // Initialize formData first
        formData.set('image', imageURL); // Add imageURL to formData
        formData.set('image1', imageURL1); // Add imageURL1 to formData

        // Convert formData to a plain object
        const data = Object.fromEntries(formData);

        try {
                // First, make a call to check if the email already exists
                const checkEmailResponse = await customFetch.post('/auth/check-email', { email: data.email });
                if (checkEmailResponse.data.exists) {
                    // If the email already exists, show an error and stop further processing
                    toast.error('Email already exists');
                    return;
                }
                if(data.password!==data.secondPassword){
                    toast.error("password is it not match");
                    return;
                  }
                  if( !data.name || data.name<3 || data.name>50){
                    toast.error("The number of characters in the name must be greater than 3 and less than 50 and must be exist.");
                    return;
                  }
                  if(!data.name ||data.firstName<3 || data.firstName>50){
                    toast.error("The number of characters in the first name must be greater than 3 and less than 50  and must be exist.");
                    return;
                  }
                  if(!data.country ||data.country<3 || data.country>50){
                    toast.error("The number of characters in the country must be greater than 3 and less than 50  and must be exist.");
                    return;
                  }
                  if(!data.city||data.city<3 || data.city>50){
                    toast.error("The number of characters in the city must be greater than 3 and less than 50  and must be exist.");
                    return;
                  }
                  if(!data.levelOfStudy||data.levelOfStudy<3 || data.levelOfStudy>50){
                    toast.error("The number of characters in the level Of Study must be greater than 3 and less than 50  and must be exist.");
                    return;
                  }
                  if(!data.specialty||data.specialty<3 || data.specialty>50){
                    toast.error("The number of characters in the  specialty must be greater than 3 and less than 50  and must be exist.");
                    return;
                  }
                  if(!data.occupation||data.occupation<3 || data.occupation>50){
                    toast.error("The number of characters in the  specialty must be greater than 3 and less than 50  and must be exist.");
                    return;
                  }
                  if(!data.password||data.password<6){
                    toast.error("The number of password must be greater than 6  and must be exist.");
                    return;
                  }
                  const passwordPattern = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{6,}/;

if (!passwordPattern.test(data.password)) {
  toast.error("Password must include at least a number and a letter, and a symbol.");
  return;
}
                  if(!data.secondPassword||data.secondPassword<6){
                    toast.error("The number of second password must be greater than 6  and must be exist.");
                    return;
                  }
                  if(!data.numberPhone||data.numberPhone<10){
                    toast.error("The number of number phone must be less then 10  and must be exist.");
                    return;
                  }
                  if(!data.image){
                    toast.error("The image must be exist.");
                    return;
                  }
                  if(!data.image1){
                    toast.error("The image and must be exist.");
                    return;
                  }



            const response2 = await customFetch.post('/customer', {
                name: data.name,
                email: data.email,
                phone: data.numberPhone,
                address: {
                    country: 'DZ',
                    state: data.country,
                    address: data.city,
                },
                metadata: {
                    notes: 'Important customer',
                },
            });

            // Add customer_id to the data object
            data.customer_id = response2.data.customer.id;


            // Send the registration request with the updated data object
            const response = await customFetch.post('/auth/register', data);
            console.log(data)
            toast.success('Registration successful');
            // navigate('/login');
            if(response.status==201){
            setSuccess(true);
            showAlert({ text: response.data.msg, type: 'success' });
        }
        } catch (error) {
            toast.error(error?.response?.data?.msg);
        }

    };
    // const [profilePicSrc, setProfilePicSrc] = useState(null);
    // const [profilePicTwoSrc, setProfilePicTwoSrc] = useState(null);


    // const handleUploadImage1 = (e) => {
    //     console.log('File input recto triggered'); // Debugging log
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setProfilePicSrc(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // const handleUploadImage2 = (e) => {
    //     console.log('File input verso triggered'); // Debugging log
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setProfilePicTwoSrc(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };
    return (
<>

{alert.show && (
            <div className="page">
            <div style={{padding:'40px',textAlign:'center'}} className={`   alert alert-${alert.type}`}>{alert.text}</div>
            </div>
          )}

{!success && (
        <main className='main-content-register'>
            <div className='content-main-content-register'>
                <div className='login-part-content-register'>
                    <div className='content-login-part-content-register'>
                        <h1>Bonjour les amis!</h1>
                        <p>Si vous n'avez pas de compte, inscrivez-vous ici pour commencer.</p>
                        <Link to={'/sign_in'}>
                            <button>Se connecter</button>
                        </Link>
                    </div>
                </div>
                <div className='signup-content-register'>
                    <div className='content-signup-content-register'>
                        <div className='header-content-register'>
                            <h1>Créer un compte</h1>
                            <p>Entrez vos informations personnelles</p>
                        </div>
                        <div className='form-content-register'>
                            <Form onSubmit={handleSubmit} encType='multipart/form-data' method='post' className='form-form_form-content-register'>
                                <div id='form-two-register-inputs'>
                                    <FormRow type="text" placeholder="nom" name='name' value="" />
                                    <FormRow type="text" placeholder="prénom" name='firstName' value="" />
                                    {/* <FormRow type="text" placeholder="surname" value="" /> */}
                                </div>
                                <div id='form-two-register-inputs'>
                                    <FormRow type="text" placeholder='Ville' name='city' value="" />
                                    <FormRow type="text" placeholder='Pays' name='country' value="" />
                                </div>
                                <FormRow type="text" placeholder="Niveau d'études" name='levelOfStudy' value="" /><br/>
                                <FormRow type="text" placeholder='Spécialité' name='specialty' value="" /><br/>
                                <FormRow type="text" placeholder='Profession' name='occupation' value="" /><br/>
                                <FormRow type="email" placeholder='email' name="email" value="" /><br/>
                                <FormRow type="number" placeholder='Numéro de téléphone' name="numberPhone" value="" /><br/>
                                <FormRow type="password" placeholder='Mot de passe' name="password" value="" /><br/>
                                <FormRow type="password" placeholder='Répétez le mot de passe' name='secondPassword' value="" /><br/>
                                <div className="card-content-register">
                                    <div className="images-card-register-content">
                                        <div className="same-card-register-content">
                                            <label className="label-card-nat-register" htmlFor="card-nat-recto">
                                                <div className="img-added-register">
                                                {profilePicSrc ? (
                                                    <>
                                                    <img src={profilePicSrc} id="profile-pic" alt="profile pic 1" />
                                                    </>
                                                ) : (
                                                    <div className="img-added-register-write">
                                                    <IoMdImages />
                                                    <p id="color-p-register">Carte d'identité<br/> recto</p>
                                                    </div>
                                                )}
                                                </div>
                                            </label>
                                            <FormRow type="file" accept="image/*" name='image' className='image-card' id='card-nat-recto' onChange={handleUploadImage}/>
                                            {profilePicSrc && (
                                                <div onClick={() => setProfilePicSrc(null)} className="close-icon-container">
                                                    <FaTimes className="close-icon-register" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="same-card-register-content">
                                            <label className="label-card-nat-register" htmlFor="card-nat-verso">
                                                <div className="img-added-register">
                                                {profilePicTwoSrc ? (
                                                    <>
                                                    <img src={profilePicTwoSrc} id="profile-pic-two" alt="profile pic 2" />
                                                    </>
                                                ) : (
                                                    <div className="img-added-register-write">
                                                    <IoMdImages />
                                                    <p id="color-p-register">Carte d'identité<br/> verso</p>
                                                    </div>
                                                )}
                                                </div>
                                            </label>
                                            <FormRow type='file' accept="image/jpeg, image/png, image/jpg" name='image1' className="image-card" id="card-nat-verso"  onChange={handleUploadImage1}/>
                                            {profilePicTwoSrc && (
                                                <div onClick={() => setProfilePicTwoSrc(null)} className="close-icon-container">
                                                    <FaTimes className="close-icon-register" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button type='submit'disabled={isSubmitting}>{isSubmitting?'Soumettre':`S'inscrire`}</button>
                            </Form>
                            <Link to={'/'}>
                                    <button>Retourner</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
)
}
        </>

    )
}

export default Register;
