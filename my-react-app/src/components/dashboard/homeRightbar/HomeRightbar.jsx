import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ComposedChart, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import './HomeRightbar.css';

import customFetch from '../../../utils/customFetch';
import Loader from '../../loading/Loader';











const FullBarShape = (props) => {
    const { x, y, width, height, fill } = props;

    // Set the full chart height for the border to appear fully even if the value is 0
    const chartHeight = 95; // Adjust to match the height of your BarChart
  
    return (
      <g>
        {/* Main bar with actual value */}
        <rect x={x} y={y} width={width} height={height} fill={fill} />
        {/* Full-height border */}
        <rect
          x={x}
          y={y} // Start from the top of the chart
          width={width}
          height={chartHeight} // Set to the full height of the chart
          fill="none"
          stroke="#000" // Set your desired border color
          strokeWidth={.3} // Border thickness
        />
      </g>
    );
    };







const HomeRightbar = () => {
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
    const [currentMonthIndex, setCurrentMonthIndex] = useState(-1);
    const [orders,setOrders] = useState(null)
    const [total,setTotal] = useState(null)
    const [users,setUsers] = useState(null)
    const[OrdersLastSixMonths,setOrdersLastSixMonths] = useState(null)
    const [countUsersLastSixMonths,setCountUsersLastSixMonths] = useState(0)
    const [monthlyEarnings,setMonthlyEarnings] = useState(null)
    const [TotalAmountOfSixMonths,setTotalAmountOfSixMonths] = useState(null)
    const [loading,setLoading] = useState(true)
    const [loading2,setLoading2] = useState(true)
    const [usersOne , setUsersOne] = useState(null);


    const fetchOrders= async () => {
        try {

            const response = await customFetch('orders');
        setOrders(response.data.orderss)
        setTotal(response.data.sumTotalAmountOfSixMonths)


        setOrdersLastSixMonths(response.data.OrdersLastSixMonths)
        setMonthlyEarnings(response.data.monthlyEarnings)

        setTotalAmountOfSixMonths(response.data.totalAmountOfSixMonths)




        setLoading(false)
            return response
            } catch (error) {
                console.error(error);
                setLoading(false)
            return error
            }

    }
    const fetchUsers= async () => {
        try {
            const response = await customFetch('users')
            setUsers(response.data.userss)
            // setCountUsersLastSixMonths(response.data.userCount )
            setCountUsersLastSixMonths(response.data.UsersLastSixMonths)
            setLoading2(false)
        return response
        } catch (error) {
            console.error(error);
            setLoading2(false)
            return error
        }

    }
    useEffect(() => {
        if(!orders){
            fetchOrders();
        }
    }, [orders]);
    useEffect(() => {
        if(!users){
            fetchUsers();
        }

    }, [users]);


    useEffect(() => {
        const now = new Date();
        let currentMonth = now.getMonth() + 1; // 1 for Jan, 12 for Dec
        setCurrentMonthIndex(currentMonth);
    }, []); // Empty dependency array ensures this runs only once after the component mounts

    // Function to determine bar color
    const getBarColor = (month) => {
        console.log(`Determining color for month: ${month}`);
        if (!month) return "#bab4b4"; // Default color

        if (month === currentMonthIndex) {
            console.log(`Month: ${month}, Current Month Index: ${currentMonthIndex}, Color: #413ea0`);
            return "#413ea0";
        } else {
            console.log(`Month: ${month}, Current Month Index: ${currentMonthIndex}, Color: #bab4b4`);
            return "#bab4b4";
        }
    };


    const usersData = countUsersLastSixMonths ? countUsersLastSixMonths.map((item) => ({
        ...item,
        mois: item.month,
        nombre: item.count,
        fill: getBarColor(item.month),
    })) : [];

        useEffect(() => {
            if (usersData && currentMonthIndex !== -1) {
                // Find the data for the current month
                const currentMonthData = usersData.find(item => item.month === currentMonthIndex);
                setUsersOne(currentMonthData ? currentMonthData.count : 0);
            }
        }, [usersData, currentMonthIndex]);

        //___________________________________________________________________________

    const userInscription = OrdersLastSixMonths ? OrdersLastSixMonths.map((item) => ({
        ...item,
        mois: item.month,
        nombre: item.count,
        fill: getBarColor(item.month),
    })) : [];

    const [userIns , setUserIns] = useState(null);

    useEffect(() => {
        if (userInscription && currentMonthIndex !== -1) {
            // Find the data for the current month
            const currentMonthData = userInscription.find(item => item.month === currentMonthIndex);
            setUserIns(currentMonthData ? currentMonthData.count : 0);
        }
    }, [userInscription, currentMonthIndex]);

    //_______________________________________________________________________________________

    const amountMonths = TotalAmountOfSixMonths ? TotalAmountOfSixMonths.map((item) => ({
        ...item,
        mois: item.month,
        montant: item.totalAmount,
        fill: getBarColor(item.month),
    })) : [];


    const [userAmount , setUserAmount] = useState(null);

    useEffect(() => {
        if (amountMonths && currentMonthIndex !== -1) {
            // Find the data for the current month
            const currentMonthData = amountMonths.find(item => item.month === currentMonthIndex);
            setUserAmount(currentMonthData ? currentMonthData.totalAmount : 0);
        }
    }, [amountMonths, currentMonthIndex]);


    //_____________________________________________________________


    console.log('first' , countUsersLastSixMonths);
    console.log('last' , OrdersLastSixMonths)
    // if(loading){
    //     return <div style={{ height: '100vh', width:"100%",display:'flex' , alignItems:'center' , justifyContent:'center',background:'white' }}><Loader/></div>
    // }
    // if(loading2){
    //     return <div style={{ height: '100vh', width:"100%",display:'flex' , alignItems:'center' , justifyContent:'center',background:'white' }}><Loader/></div>
    // }
    const count=orders || 0
    console.log('there' , count);
    const countUsers=users || 0
    console.log( 'hello ' , countUsers);
    const numUsersLastSixMonths=countUsersLastSixMonths
    const MonthlyEarnings=monthlyEarnings
    console.log('hyy' , countUsersLastSixMonths)
    console.log('this' , OrdersLastSixMonths)
    console.log('monthly : ' , monthlyEarnings)
    console.log(OrdersLastSixMonths)
    console.log('amountSix' , TotalAmountOfSixMonths)

    const stYear = monthlyEarnings ? monthlyEarnings.map((item)=>({
        mois: item.month,
        montant_total: item.totalAmounts,
        MT: item.totalAmounts,
    })) : [];

    console.log(stYear )

    const combinedData2 = countUsersLastSixMonths ? countUsersLastSixMonths.map((item,index) => ({
        les_participants_aux_formations: item.count,
        month: item.month,
        utilisateurs: countUsersLastSixMonths[index]?.count  || 0,
    })) : [];
    const combinedData = OrdersLastSixMonths ? OrdersLastSixMonths.map((item,index) => ({
        les_participants_aux_formations: item.count,
        month: item.month,
        utilisateurs: countUsersLastSixMonths[index]?.count || 0,

    })) : [];
    console.log(combinedData);





    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
          // Extract month and amount from the payload
          const { mois, montant } = payload[0].payload; // Adjust these fields based on your data structure

            return (
                <div className="custom-tooltip">
                <p className="label">{`Mois: ${mois}`}</p>
                <p className="intro">{`Montant: ${montant}DA`}</p>
                </div>
            );
            }
            return null;
        };

        const CustomTooltipFirst = ({ active, payload }) => {
            if (active && payload && payload.length) {
              // Extract month and amount from the payload
              const { mois, nombre } = payload[0].payload; // Adjust these fields based on your data structure

                return (
                    <div className="custom-tooltip">
                    <p className="label">{`Mois: ${mois}`}</p>
                    <p className="intro">{`Nombre: ${nombre}`}</p>
                    </div>
                );
                }
                return null;
            };
            console.log(TotalAmountOfSixMonths)
    return (<>
    <div className='mainHomeRightbar'>
        <div className='main-title-stat'>
            {loading ?(
                <div className='space-loader-content_statistique'>
                    <Loader />
                </div>
            ):(
                <>

                <h1>statistiques</h1>
            <p id='p-main'>Voici un aperçu des statistiques clés pour évaluer les performances et prendre des décisions éclairées.</p>
            <div className='ItemContainer'>
                <div className='ItemContainer1'>
                    <div className='subItemContainer'>
                        <p className='taskProgress'>Utilisateurs</p>
                        <p className='taskCounter'>{countUsers}</p>
                        <p className='currentMonth1'>pour 6 Mois</p>
                    </div>
                    <div className='barchartContainer'>
                        <BarChart className='BarChart' width={175} height={100} data={usersData}>
                            <Tooltip content={<CustomTooltipFirst />} />
                            <Bar dataKey="nombre" shape={<FullBarShape />} fill={({ index }) => usersData[index].fill} />
                        </BarChart>
                    </div>
                </div>
                <div className='ItemContainer1'>
                <div className='subItemContainer'>
                        <p className='taskProgress'>participants</p>
                        <p className='taskCounter'>{count}</p>
                        <p className='currentMonth1'>pour 6 Mois</p>
                    </div>
                    <div className='barchartContainer'>
                        <BarChart width={175} height={100} data={userInscription}>
                            <Tooltip content={<CustomTooltipFirst />}/>
                            <Bar dataKey="nombre" shape={<FullBarShape />} fill={({ index }) => userInscription[index].fill} />
                        </BarChart>
                    </div>
                </div>
                <div className='ItemContainer1'>
                <div className='subItemContainer1'>
                        <p className='taskProgress'>revenu mensuel</p>
                        <p className='taskCounter'>{total}</p>
                        <p className='currentMonth1'>DA pour 6 Mois</p>
                    </div>
                    <div className='barchartContainer'>
                        <BarChart width={175} height={100} data={amountMonths}>
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="montant" shape={<FullBarShape />} fill={({ index }) => amountMonths[index].fill} />
                        </BarChart>
                    </div>
                </div>
            </div>

            {/*__________*/}

            <div className='ItemContainerSM'>
                <div className='ItemContainer1SM'>
                    <div className='subItemContainerSM'>
                        <p className='taskProgressSM'>Utilisateurs</p>
                        <p className='taskCounterSM'>{usersOne}</p>
                        <p className='currentMonth1SM'>pour 6 Mois</p>
                    </div>
                    <div className='barchartContainerSM'>
                        <BarChart className='BarChartSM' width={120} height={100} data={usersData}>
                            <Tooltip content={<CustomTooltipFirst />} />
                            <Bar dataKey="nombre" shape={<FullBarShape />} fill={({ index }) => usersData[index].fill} />
                        </BarChart>
                    </div>
                </div>
                <div className='ItemContainer1SM'>
                <div className='subItemContainerSM'>
                        <p className='taskProgressSM'>participants</p>
                        <p className='taskCounterSM'>{userIns}</p>
                        <p className='currentMonth1SM'>pour 6 Mois</p>
                    </div>
                    <div className='barchartContainerSM'>
                        <BarChart width={120} height={100} data={userInscription}>
                            <Tooltip content={<CustomTooltipFirst />}/>
                            <Bar dataKey="nombre" shape={<FullBarShape />} fill={({ index }) => userInscription[index].fill} />
                        </BarChart>
                    </div>
                </div>
                <div className='ItemContainer1SM'>
                <div className='subItemContainer1SM'>
                        <p className='taskProgressSM'>revenu mensuel</p>
                        <p className='taskCounterSM'>{TotalAmountOfSixMonths?.length || 0 }</p>
                        <p className='currentMonth1SM'>DA pour 6 Mois</p>
                    </div>
                    <div className='barchartContainerSM'>
                        <BarChart width={120} height={100} data={amountMonths}>
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="montant" shape={<FullBarShape />} fill={({ index }) => amountMonths[index].fill} />
                        </BarChart>
                    </div>
                </div>
            </div>

            {/*_____________________________________________________________*/}

            <div className='middleTaskChart'>
                <p className='taskCreatedvsCompleted'>utilisateurs VS les_participants_aux_formations</p>
                <LineChart className='LineChart' width={1010} height={150} data={combinedData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis dataKey="utilisateurs"/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="utilisateurs" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="les_participants_aux_formations" stroke="#8884d8" />
                </LineChart>
            </div>
            {/* the small one */}
            <div className='middleTaskChartSmall'>
                <p className='taskCreatedvsCompleted'>utilisateurs VS les_participants_aux_formations</p>
                <LineChart className='LineChart' width={800} height={150} data={combinedData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis dataKey="utilisateurs"/>
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="utilisateurs" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="les_participants_aux_formations" stroke="#8884d8" />
                </LineChart>
            </div>

            {/*_____________________________________________________________*/}

            <div className='tasksContainer'>
                <div className='MonthlyEarning'>
                    <p className='taskContainerText'>performance de gain mensuel</p>
                    <ComposedChart
                        width={1010}
                        height={180}
                        data={stYear}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                        >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="mois" scale="band" />
                        <YAxis  dataKey="montant_total"  />
                        <Tooltip />
                        <Legend style={{marginTop:'20px'}}/>
                        <Bar dataKey="montant_total" barSize={20} fill="#413ea0" />
                        <Line type="monotone" dataKey="MT" stroke="#ff7300"  style={{marginTop:"10px"}}/>
                    </ComposedChart>
                </div>
                {/* small one */}

                <div className='MonthlyEarningSmall'>
                    <p className='taskContainerText'>performance de gain mensuel</p>
                    <ComposedChart
                        width={800}
                        height={180}
                        data={stYear}
                        margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                        }}
                        >
                        <CartesianGrid stroke="#f5f5f5" />
                        <XAxis dataKey="mois" scale="band" />
                        <YAxis dataKey="montant_total"/>
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="montant_total" barSize={20} fill="#413ea0" />
                        <Line type="monotone" dataKey="MT" stroke="#ff7300" />
                    </ComposedChart>
                </div>
            </div>
            </>
            )}
        </div>
    </div>
    </>
  )
}

export default HomeRightbar