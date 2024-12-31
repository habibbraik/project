import { useEffect, useState } from 'react';
// import img from '../../../../public/images/454640733_492302303442344_1442952910963882023_n.jpg';
// import imgFond from '../../../../public/images/no_existing_users.png';
import customFetch from '../../../utils/customFetch.js';
// import Loader from '../../loading/Loader.jsx';
import { toast } from 'react-toastify';
import SideSmall from '../sidebar/SideSmall.jsx';
import Header from './Header.jsx';
import './inscriptions.css';

import Modal from './Modal.jsx';


const AllUsers = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedStd, setSelectedStd] = useState(null);
  const [students, setStudents] = useState(null);
  const [loading,setLoading] = useState(true)
  const fetchUsers= async () => {
    try {
        const response = await customFetch('/users');
        setStudents(response.data.users)
    setLoading(false)
      return response
    } catch (error) {
        console.error(error);
        setLoading(false)
       return error
    }

}
useEffect(() => {
fetchUsers();
}, [students]);
  const handleViewClick = (student) => {
    setSelectedStd(student);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedStd(null);
  };

  const handleDeleteClick = async (id, e) => {
    e.preventDefault();
    // const updatedStudents = students.filter(student => student.id !== id);
    // setStudents(updatedStudents);

    try {
      const response = await customFetch.delete(`/users/${id}`);
      fetchUsers()
      toast.success(response.data.msg);
    } catch (error) {
      const errorMsg = error?.response?.data?.msg || 'Failed to delete student';
      toast.error(errorMsg);
    }
  };

  return (
    <section className='studients'>
      <div className='content-studient'>
        <Header/>
        <div className='content-inscriptions-details'>
          {loading ? (
            <div className='space-loader-content'>
              {/* <Loader /> */}
            </div>
          ):
          students && students.length > 0 ? (
            students.map((x) => {
            const { _id, name, username, email } = x;
            return (
              <div className="inscriptios-details" key={_id}>
                <div className='identity'>
                  <div className='identity-img'>
                    <img src={''} alt="" />
                  </div>
                  <h3>{name} {username}</h3>
                </div>
                <div className='email-student'>
                  <h3>{email}</h3>
                </div>
                <div className='studients-buttons'>
                  <button className='view-studient' onClick={() => handleViewClick(x)} >View</button>
                </div>
              </div>
            )
          })):(
            <div className='nodata-available'>
                    <div className='no-data-dup'>
                        <img src={''} alt='no-data'/>
                        <h3>Aucun utilisateurs trouvé</h3>
                    </div>
                </div>
          )}
        </div>
      </div>
      <Modal show={showModal}  student={selectedStd} />  {/*onClose={handleCloseModal}*/}
      <SideSmall/>
    </section>
  )
}

export default AllUsers;
