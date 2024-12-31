import { useNavigation } from 'react-router-dom'
// eslint-disable-next-line react/prop-types
const SubmitBtn = ({text}) => {
    const navigate=useNavigation()
  const isSubmitting=navigate.state==='submitting'
  return (
    <button  type='submit' className={`py-2 md:py-3 rounded-lg   bg-[#5B53FF] text-sm md:text-base font-sans text-white  font-semibold w-full  `} disabled={isSubmitting}>{isSubmitting?'submitting':`${text}`}</button>
    
  )
}
export default SubmitBtn


