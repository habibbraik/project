import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { Form, useNavigation, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../../../utils/customFetch";
import FormRow from "../../../FormRow";
import TextArea from "../../../TextArea";
import "./frc.css";

    const Addfor2 = ({course}) => {
      const navigation=useNavigation();

      const [profilePicSrc, setProfilePicSrc] = useState(null);
      const isSubmitting = navigation.state === "submitting";
      const [selectedOption, setSelectedOption] = useState(course.level | "");

      const handleSelect = (event) => {
        const selected = event.target.value;
        setSelectedOption(selected);
        console.log("Selected option:", selected);
      };

      const options = [
        { value: "élève", label: "élève" },
        { value: "étudient", label: "étudient" },
        { value: "professionnel", label: "professionnel" },
        { value: "doctorat", label: "doctorat" },
      ];

      const [schedule, setSchedule] = useState(course.schedule || [
        { day: "Samedi", startTime: "", endTime: "" },
        { day: "Dimanche", startTime: "", endTime: "" },
        { day: "Lundi", startTime: "", endTime: "" },
        { day: "Mardi", startTime: "", endTime: "" },
        { day: "Mercredi", startTime: "", endTime: "" },
        { day: "Jeudi", startTime: "", endTime: "" },
        { day: "Vendredi", startTime: "", endTime: "" },
      ]);

      useEffect(() => {
        const inputFile = document.getElementById('up-image');

        if (inputFile) {
        inputFile.onchange = function () {
            if (inputFile.files && inputFile.files[0]) {
            setProfilePicSrc(URL.createObjectURL(inputFile.files[0]));
            }
        }
        }
      }, []);

      const handleScheduleChange = (index, field, value) => {
        const newSchedule = [...schedule];
        newSchedule[index][field] = value;
        setSchedule(newSchedule);
      };
      const { id } = useParams();
      const handleSubmit = async (e) => {

        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set("schedule", JSON.stringify(schedule));
        const file = formData.get("image");

      

        try {
          let imageUrl = course.image;

          // If there's an image, upload it first
          if (file && file.size > 0) {
            const { data } = await customFetch.post("/courses/uploadImage", formData);
            imageUrl = data.image; // Assuming this is how the image URL is returned
            // Add the image URL to form data
          }
          formData.set("image", imageUrl);
          // Submit the form data to create or update the course

          const response = await customFetch.patch(`/courses/${id}`,formData)
          toast.success('course updated successfully')
          return response;

        } catch (error) {
          toast.error(error?.response?.data?.msg || "Error adding course");
        }
      };

      return (
        <section className="adding-for-section">
          <div className="content-formation-section-add">
            <div className="header-formation-section-add">
              <h1>mettre à jour la Formation</h1>
              <p id="sout-for">Éditez les informations du cours, mettez à jour les descriptions et ajustez les horaires</p>
            </div>
            <div>
              <Form
                method="post"
                onSubmit={handleSubmit}
                className="form-formation-add"
                encType='multipart/form-data'
              >
                <div className="first-inputs-add-formation">
                  <div className="input-add-four-first">
                    <div className="input-add-formation-add">
                      <label htmlFor="">Nom de formation</label>
                      <br />
                      <FormRow name="name" defaultValue={course.name} type="text" placeholder="nom de la formation..."/>
                    </div>
                    <div className="input-add-formation-add">
                      <label htmlFor="">Niveau</label>
                      {/* <br />
                      <FormRow name="level" type="text" /> */}
                      <select
                        name="level"
                        value={selectedOption}
                        onChange={handleSelect}
                        className={selectedOption === '' ? 'placeholder' : ''}
                      >
                        <option value={course.level} disabled style={{ fontSize: '12px', fontWeight: 'bold'}}>
                        {course.level}
                        </option>
                        {options.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="input-add-formation-add">
                      <label htmlFor="">Catégorie</label>
                      <br />
                      <FormRow name="category" type="text" defaultValue={course.category} placeholder='catégory...'/>
                    </div>
                    <div className="input-add-formation-add">
                      <label htmlFor="">Prix</label>
                      <br />
                      <FormRow defaultValue={course.price} name="price" type="text" placeholder='prix...'/>
                    </div>
                  </div>
                  <div className="description-add-formation">
                    <label htmlFor="">Description</label>
                    <br />
                    <TextArea defaultValue={course.description} className="text-textarea-adding" name="description" placeholder="Description..." />
                  </div>
                </div>
                <div className="add-planning-section-for">
                  <h2>plan de formation</h2>
                  <div className="date-time-align">
                  <div className='date-planning-add-section'>
                    <h3>jours</h3>
                    {schedule.map((slot, index) => (

                    <p key={index}>{slot.day}</p>

                  ))}
                  </div>

                  <div className="time-planning-add-section">
                    <h3>temps</h3>
                    {schedule.map((slot, index) => (
                      <p key={index}>
                        <input
                          type="time"

                          value={slot.startTime}

                          onChange={(e) =>
                            handleScheduleChange(index, "startTime", e.target.value)
                          }
                        />
                        <br />
                        <input
                          type="time"
                          value={slot.endTime}
                          onChange={(e) =>
                            handleScheduleChange(index, "endTime", e.target.value)
                          }
                          />
                      </p>
                    ))}
                  </div>
                  </div>
                </div>
                <div className="last-add-formation-section">
                  <div className='uploading-image-add'>
                                <label htmlFor="up-image">
                                  {profilePicSrc?(
                                    <>
                                      <img src={profilePicSrc}/>
                                      <FaTimes onClick={() => setProfilePicSrc(null)} className="close-icon-add_f" />
                                    </>
                                  ):(
                                    <div className='content-up-image'>
                                        <span><IoMdImages/></span>
                                        <h3>Ajouter une photo</h3>
                                    </div>
                                  )}
                                </label>
                                <input type="file" name='image' id='up-image' accept='image/*'  style={{display:"none" , visibility:'hidden'}}/>
                            </div>
                  <div className="submting-add-formation">
                    <p>
                      Veuillez vérifier toutes les informations fournies.
                      Assurez-vous que toutes les données sont  exactes
                      et complètes pour éviter toute correction ultérieure.
                    </p>
                    <button disabled={isSubmitting} type="submit">éditer</button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </section>
      );
    };

    export default Addfor2;
//   import { useEffect, useState } from "react";
// import { FaTimes } from "react-icons/fa";
// import { IoMdImages } from "react-icons/io";
// import { Form, useNavigation } from "react-router-dom";
// import { toast } from "react-toastify";
// import customFetch from "../../../utils/customFetch";
// import FormRow from "../../FormRow";
// import Textarea from "../../Textarea";
// import "./frc.css";
//   const Addfor2 = ({course}) => {
//     const navigation=useNavigation();
//     const [profilePicSrc, setProfilePicSrc] = useState(null);
//     const isSubmitting = navigation.state === "submitting";
//     const [selectedOption, setSelectedOption] = useState("");

//     const handleSelect = (event) => {
//       const selected = event.target.value;
//       setSelectedOption(selected);
//       console.log("Selected option:", selected);
//     };

//     const options = [
//       { value: "élève", label: "élève" },
//       { value: "étudient", label: "étudient" },
//       { value: "professionnel", label: "professionnel" },
//       { value: "doctorat", label: "doctorat" },
//     ];
//     const [schedule, setSchedule] = useState(course.schedule ||[
//       { day: "Samedi", startTime: "", endTime: "" },
//       { day: "Dimanche", startTime: "", endTime: "" },
//       { day: "Lundi", startTime: "", endTime: "" },
//       { day: "Mardi", startTime: "", endTime: "" },
//       { day: "Mercredi", startTime: "", endTime: "" },
//       { day: "Jeudi", startTime: "", endTime: "" },
//       { day: "Vendredi", startTime: "", endTime: "" },
//     ]);
//     console.log(course.schedule)

//     useEffect(() => {
//       const inputFile = document.getElementById('up-image');

//       if (inputFile) {
//       inputFile.onchange = function () {
//           if (inputFile.files && inputFile.files[0]) {
//           setProfilePicSrc(URL.createObjectURL(inputFile.files[0]));
//           }
//       }
//       }
//     }, []);

//     const handleScheduleChange = (index, field, value) => {
//       const newSchedule = [...schedule];
//       newSchedule[index][field] = value;
//       setSchedule(newSchedule);
//     };

//     const handleSubmit = async (e) => {
//       e.preventDefault();
//       const formData = new FormData(e.currentTarget);
//       formData.set('schedule',JSON.stringify(schedule));
//       const file=formData.get('image')
//       if( file && file.size>500000 ){
//           toast.error('Image size too large')
//           return null
//         }
//       try {
//         // const {data}=await customFetch.post('/courses/uploadImage',formData)
//         // const BASE_URL = 'http://localhost:5000';
//       // const imageUrl = `${BASE_URL}${data.image}`;
//         // formData.set('image',data.image)
//         const response = await customFetch.post("/courses", formData);
//         toast.success("Course added successfully");
//         console.log(data)
//         return response// Rename the response variable to avoid conflict

//       } catch (error) {
//         toast.error(error?.response?.data?.msg);
//       }
//     };

//     return (
//       <section className="adding-for-section">
//         <div className="content-formation-section-add">
//           <div className="header-formation-section-add">
//             <h1>Ajouter une Formation</h1>
//             <p id="sout-for"><span>Information importante : </span>Si vous souhaitez ajouter un cours spécifique à une catégorie qui n'existe pas, vous pouvez écrire le nom de cette catégorie dans le champ (Catégorie) et elle sera créée automatiquement.</p>
//           </div>
//           <div>
//             <Form
//               method="post"
//               onSubmit={handleSubmit}
//               className="form-formation-add"
//               encType='multipart/form-data'
//             >
//               <div className="first-inputs-add-formation">
//                 <div className="input-add-four-first">
//                   <div className="input-add-formation-add">
//                     <label htmlFor="">Nom de formation</label>
//                     <br />
//                     <FormRow name="name" type="text" placeholder="nom de la formation..."/>
//                   </div>
//                   <div className="input-add-formation-add">
//                     <label htmlFor="">Niveau</label>
//                     {/* <br />
//                     <FormRow name="level" type="text" /> */}
//                     <select
//                       name="level"
//                       value={selectedOption}
//                       onChange={handleSelect}
//                       className={selectedOption === '' ? 'placeholder' : ''}
//                     >
//                       <option value="" disabled style={{ fontSize: '12px', fontWeight: 'bold'}}>

//                       </option>
//                       {options.map((option) => (
//                         <option key={option.value} value={option.value}>
//                           {option.label}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div className="input-add-formation-add">
//                     <label htmlFor="">Catégorie</label>
//                     <br />
//                     <FormRow name="category" type="text" placeholder='catégory...'/>
//                   </div>
//                   <div className="input-add-formation-add">
//                     <label htmlFor="">Prix</label>
//                     <br />
//                     <FormRow name="price" type="text" placeholder='prix...'/>
//                   </div>
//                 </div>
//                 <div className="description-add-formation">
//                   <label htmlFor="">Description</label>
//                   <br />
//                   <Textarea className="text-textarea-adding" name="description" placeholder="Description..." />
//                 </div>
//               </div>
//               <div className="add-planning-section-for">
//                 <h2>plan de formation</h2>
//                 <div className="date-time-align">
//                 <div className='date-planning-add-section'>
//                   <h3>jours</h3>
//                   {schedule.map((slot, index) => (

//                   <p key={index}>{slot.day}</p>

//                 ))}
//                 </div>

//                 <div className="time-planning-add-section">
//                   <h3>temps</h3>
//                   {schedule.map((slot, index) => (
//                     <p key={index}>
//                       <input
//                         type="time"
//                         value={slot.startTime}
//                         onChange={(e) =>
//                           handleScheduleChange(index, "startTime", e.target.value)
//                         }
//                       />
//                       <br />
//                       <input
//                         type="time"
//                         value={slot.endTime}
//                         onChange={(e) =>
//                           handleScheduleChange(index, "endTime", e.target.value)
//                         }
//                         />
//                     </p>
//                   ))}
//                 </div>
//                 </div>
//               </div>
//               <div className="last-add-formation-section">
//                 <div className='uploading-image-add'>
//                               <label htmlFor="up-image">
//                                 {profilePicSrc?(
//                                   <>
//                                     <img src={profilePicSrc}/>
//                                     <FaTimes onClick={() => setProfilePicSrc(null)} className="close-icon-add_f" />
//                                   </>
//                                 ):(
//                                   <div className='content-up-image'>
//                                       <span><IoMdImages/></span>
//                                       <h3>Ajouter une photo</h3>
//                                   </div>
//                                 )}
//                               </label>
//                               <input type="file" name='image' id='up-image' accept='image/*'  style={{display:"none" , visibility:'hidden'}}/>
//                           </div>
//                 <div className="submting-add-formation">
//                   <p>
//                     Veuillez vérifier toutes les informations fournies.
//                     Assurez-vous que toutes les données sont  exactes
//                     et complètes pour éviter toute correction ultérieure.
//                   </p>
//                   <button disabled={isSubmitting} type="submit">publier</button>
//                 </div>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </section>
//     );
//   };

//   export default Addfor2;
