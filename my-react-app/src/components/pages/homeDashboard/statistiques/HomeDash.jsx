
import HomeRightbar from '../../../dashboard/homeRightbar/HomeRightbar';
import SidbarDashboard from '../../../dashboard/sidebar/SidbarDashboard';
import './home.css';
const HomeDash = () => {
  return (
    <div className='mainHomeContainer'>
        <SidbarDashboard/>
        <HomeRightbar/>

    </div>
  )
}

export default HomeDash