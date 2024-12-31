import AllUsers from '../../../dashboard/incriptions/AllUsers';
import SidbarDashboard from '../../../dashboard/sidebar/SidbarDashboard';
import './insecriptiondash.css';

const UtiInsc = () => {
  return (
    <div className='main-inscription'>
        <SidbarDashboard/>
        <AllUsers/>
    </div>
  )
}

export default UtiInsc