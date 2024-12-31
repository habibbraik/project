import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { GrUpdate } from "react-icons/gr";
import { IoSearch } from 'react-icons/io5';
import { MdBlockFlipped } from "react-icons/md";
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import img from "../../../../public/images/no-data.png";
import customFetch from '../../../utils/customFetch';
import Loader from "../../loading/Loader.jsx";
import SideSmall from '../sidebar/SideSmall.jsx';
import './delup.css';



const DelUp = () => {

    const [data , setData] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);


        async function fetchData() {
        try {
            const { data } = await customFetch('/courses');
            setData(data.courses);
            setResults(data.courses);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setData([]);
            setResults([]);
            setLoading(false);
        }
        }

        useEffect(() => {
            fetchData();
        }, []);


        const endedFormation =async (id) =>{
            const ended = true;
            await customFetch.patch(`/courses/${id}`,{ended});
            toast.success('Course ended successfully');
            fetchData()
        }
        const deleteFormation =async (id) =>{
            await customFetch.delete(`/courses/${id}`);
            toast.success('Course removed successfully');
            fetchData()
        }
    const handleSearch = (value) => {
        setLoading(true);
        if (value.trim() === "") {
            setResults(data); // Reset to full data when search input is cleared
            setLoading(false);
        } else {
            const filteredResults = data.filter((course) => {
                return (
                    course &&
                    course.name &&
                    course.name.toLowerCase().includes(value.toLowerCase())
                );
            });
            setResults(filteredResults);
            setLoading(false);
        }
    };
return (
    <section className='studients_DU'>
        <div className='content-studient_DU'>
            <div className="iscriptions-header_DU">
            <h1>mettre à jour ou supprimer</h1>
            <div className='dash-search-divide_DU'>
                <div className='first-part-dash-ud'>
                    <p>
                        Utilisez cette page pour rechercher, mettre à jour ou supprimer les cours ajoutés,
                        et assurez-vous que tout reste à jour et pertinent
                    </p>
                </div>
                <div className='cote-searsh-dash'>
                    <form className='search-form-dash' onSubmit={(e)=>e.preventDefault()}>
                        <button type='submit'>
                            <span className="lop-search-dash"><IoSearch/></span>
                        </button>
                        <input
                            type='text'
                            name='search-input'
                            placeholder="recherche"
                            onChange={(e) => handleSearch(e.target.value)}
                            className='search-in-form-dash'
                        />
                    </form>
                </div>
            </div>
            </div>
            <div className='content-inscriptions-details'>
            {loading ? (
                <div className='space-loader-content'>
                    <Loader />
                </div>
            ) :
            results && results.length > 0 ? (
                results.map((x) => {
                const { _id, level, name, category} = x;
                return (
                    <div className="inscriptios-details-se" key={_id}>
                    <div className='identity'>
                        <h3>{name}</h3>
                    </div>
                    <div className='cat-inden'>
                        <p>
                            {category} <span id='level_parameter'>({level})</span>
                        </p>
                    </div>
                    <div className='students-buttons'>
                        <Link to={`/ajouteformation/${_id}`}><button className='view-student'><GrUpdate/></button></Link>
                        <button onClick={()=>deleteFormation(_id)} className='delete-student'><FaTrashCan/></button>
                        <button onClick={()=>endedFormation(_id)} className='delete-student'><MdBlockFlipped /></button>

                    </div>
                    </div>
                )
                })
            ) : (
                <div className='nodata-available'>
                    <div className='no-data-dup'>
                        <img src={img} alt='no-data'/>
                        <h3>aucun formation fondé</h3>
                    </div>
                </div>
            )}
            </div>
        </div>
        <SideSmall/>
    </section>
)
}

export default DelUp;
