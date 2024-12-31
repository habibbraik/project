import { toast } from 'react-toastify';
import { useLoaderData } from 'react-router-dom';
import customFetch from '../../../../utils/customFetch';
import { redirect } from 'react-router-dom';
import Addfor2 from '../../../dashboard/add formation/Addfor2';
import SidbarDashboard from '../../../dashboard/sidebar/SidbarDashboard';
import './newfrc.css';
export const loader=async({params})=>{
  try {
    const response=await customFetch.get(`courses/${params.id}`)
    const{data}=response
    const{course}=data
    console.log(course)
    return {course};
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return redirect('/parametres')
  }
}
const Nformation2 = () => {
  const {course}=useLoaderData()

  return (
    <section className='add-formation-page'>
        <SidbarDashboard/>
        <Addfor2 course={course}/>
    </section>
  )
}

export default Nformation2