import React, { useEffect, useState } from 'react';
import { ImPriceTags } from "react-icons/im";
import { PiStudentBold } from "react-icons/pi";
import { TbCategoryFilled, TbTax } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import customFetch from '../../../../../utils/customFetch';
import Loader from '../../../../loading/Loader';
import './first.css';
const First = ({ course, courseData }) => {
    const [user,setUser] = useState(null)
    const [orders,setOrders] = useState(null)
    const [loading,setLoading] = useState(true)
    const [loading1,setLoading1] = useState(true)
    const fetchUser= async () => {
        try {

            const response = await customFetch('/users/showMe');
        setUser(response.data.user)
        setLoading(false)
          return response
        } catch (error) {
            console.error(error);
            setLoading(false)
           return error
        }

  }
  const fetchOrderUser= async () => {

    try {
     const response = await customFetch.get('/users/showCurrentOrders');
     console.log(response.data.orders)
    setOrders(response.data.orders)
    setLoading1(false)
      return response
    } catch (error) {
        console.error(error);
        setOrders([])
        setLoading1(false)
       return error
    }

}

  useEffect(() => {
    if(!orders){
    fetchOrderUser();
    }

}, [orders]); // N

    useEffect(() => {
        if(!user){
        fetchUser();
        }

    }, [user]);
    if(loading){
        return <div style={{ height: '100vh', display:'flex' , alignItems:'center' , justifyContent:'center',background:'white' }}><Loader/></div>
      }

      if(loading1){
        return <div style={{ height: '100vh', display:'flex' , alignItems:'center' , justifyContent:'center',background:'white' }}><Loader/></div>
      }
      const { name, category, price, level, image, description,costs, schedule,_id,ended } = courseData;
      const exists = orders?.some(order => order.formation_id === _id);
      const handelSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data: { checkout } } = await customFetch.post('/checkout', { amount: price,customer_id:user.customer_id,metadata:_id,description:name});
            // metadata: { orderId:_id}
            window.location.href = checkout.checkout_url; // Redirect to the external URL


        } catch (error) {
            toast.error(error?.response?.data?.msg);
            return error;
        }
    };
  return (
    <main className='main-page-single-course'>
        <div className='content-page-single-course'>
            <h1>{course.name}</h1>
            <div className='card-present-information-single-cart'>
                <div className='card-content-single-cart'>
                    <div className='content-content-card'>
                        <div id='small-icon-place'>
                            <TbCategoryFilled />
                        </div>
                        <p>Catégorie</p>
                        <h3>{course.category}</h3>
                    </div>
                </div>
                <div className='card-content-single-cart advanced-cart'>
                    <div className='content-content-card'>
                        <div id='small-icon-place'>
                            <PiStudentBold/>
                        </div>
                        <p>Niveau</p>
                        <h3>{course.level}</h3>
                    </div>
                </div>
                <div className='card-content-single-cart advanced-cart'>
                    <div className='content-content-card'>
                        <div id='small-icon-place'>
                            <TbTax/>
                        </div>
                        <p>Frais</p>
                        <h3>{course.costs}DA</h3>
                    </div>
                </div>
                <div className='card-content-single-cart'>
                    <div className='content-content-card'>
                        <div id='small-icon-place'>
                            <ImPriceTags/>
                        </div>
                        <p>Prix</p>
                        <h3>{course.price}DA</h3>
                    </div>

                </div>

            </div>
            {user?(
            ended?(<button disabled={true}>terminé </button>):(
            exists?(  <button disabled={true}>payé </button>):(
            <button type='submit' onClick={handelSubmit}>Rejoindre</button>
                )
            )
            ):( <Link to={'/registers'} >
            <button >register</button>
                </Link>)}
        </div>
    </main>
  );
}

export default First;
