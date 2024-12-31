  import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoMdImages } from "react-icons/io";
import { Form, useNavigation } from "react-router-dom";
import { toast } from "react-toastify";
// import customFetch from "../../../utils/customFetch";
import FormRow from "../../../FormRow";
import Textarea from "../../../TextArea";
import customFetch from "../../../utils/customFetch";
import "./frc.css";
  const Addfor = () => {
    const navigation=useNavigation();
    const [profilePicSrc, setProfilePicSrc] = useState(null);
    const isSubmitting = navigation.state === "submitting";
    const [selectedOption, setSelectedOption] = useState("");

    const handleSelect = (event) => {
      const selected = event.target.value;
      setSelectedOption(selected);
      console.log("Selected option:", selected);
    };

    const options = [
      { value: "élève", label: "élève" },
      { value: "étudiant", label: "étudiant" },
      { value: "professionnel", label: "professionnel" },
      { value: "doctorat", label: "doctorat" },
    ];
    const [schedule, setSchedule] = useState([
      { day: "Samedi", startTime: "00:00", endTime: "00:00" },
      { day: "Dimanche", startTime: "00:00", endTime: "00:00" },
      { day: "Lundi", startTime: "00:00", endTime: "00:00" },
      { day: "Mardi", startTime: "00:00", endTime: "00:00" },
      { day: "Mercredi", startTime: "00:00", endTime: "00:00" },
      { day: "Jeudi", startTime: "00:00", endTime: "00:00" },
      { day: "Vendredi", startTime: "00:00", endTime: "00:00" },
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

    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      formData.set('schedule',JSON.stringify(schedule));
      try {
        const {data}=await customFetch.post('/courses/uploadImage',formData)
        // const BASE_URL = 'http://localhost:5000';
      // const imageUrl = `${BASE_URL}${data.image}`;
        formData.set('image',data.image)
        const response = await customFetch.post("/courses", formData);
        toast.success("Course added successfully");
        console.log(data)
        return response// Rename the response variable to avoid conflict

      } catch (error) {
        toast.error(error?.response?.data?.msg);
      }
    };

    return (
      <section className="adding-for-section">
        <div className="content-formation-section-add">
          <div className="header-formation-section-add">
            <h1>Ajouter une Formation</h1>
            <p id="sout-for"><span>Information importante : </span>Si vous souhaitez ajouter un cours spécifique à une catégorie qui n'existe pas, vous pouvez écrire le nom de cette catégorie dans le champ (Catégorie) et elle sera créée automatiquement.</p>
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
                    <FormRow name="name" type="text" placeholder="nom de la formation..."/>
                  </div>
                  <div className="input-add-formation-add">
                    <label htmlFor="">Niveau</label>
                    {/* <br />
                    <FormRow name="level" type="text" /> */}
                    <select
                      name="level"
                      placeholder="level"
                      value={selectedOption}
                      onChange={handleSelect}
                      className={selectedOption === '' ? 'placeholder' : ''}
                    >
                      <option value="" disabled style={{ fontSize: '12px', fontWeight: 'bold'}}>

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
                    <FormRow name="category" type="text" placeholder='catégory...'/>
                  </div>
                  <div className="input-add-formation-add">
                    <label htmlFor="">Prix</label>
                    <br />
                    <FormRow name="price" type="text" placeholder='prix...'/>
                  </div>
                </div>
                <div className="description-add-formation">
                  <label htmlFor="">Description</label>
                  <br />
                  <Textarea className="text-textarea-adding" name="description" placeholder="Description..." />
                </div>
                <div className="input-add-formation-add">
                    <label htmlFor="">Frais</label>
                    <br />
                    <FormRow name="costs" type="text" placeholder='frais...'/>
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
                        required
                        value={slot.startTime}
                        onChange={(e) =>
                          handleScheduleChange(index, "startTime", e.target.value)
                        }
                      />
                      <br />
                      <input
                        type="time"
                        required
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
                  <button disabled={isSubmitting} type="submit">publier</button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </section>
    );
  };

  export default Addfor;
