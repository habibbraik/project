import Studients from '../../../dashboard/incriptions/Studients';
import SidbarDashboard from '../../../dashboard/sidebar/SidbarDashboard';
import './insecriptiondash.css';

const InscriptionDash = () => {
  return (
    <div className='main-inscription'>
        <SidbarDashboard/>
        <Studients/>
    </div>
  )
}

export default InscriptionDash