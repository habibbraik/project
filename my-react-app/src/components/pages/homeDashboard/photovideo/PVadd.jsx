import Add from '../../../dashboard/photov/Add';
import SidbarDashboard from '../../../dashboard/sidebar/SidbarDashboard';
import './addpv.css';

const PVadd = () => {
  return (
    <div className='add-section'>
        <SidbarDashboard/>
        <Add/>
    </div>
  )
}

export default PVadd