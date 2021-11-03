import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Order = () => {

    const [orders, setOrders] = useState([]);

    const {user} = useAuth();
    const history = useHistory();
    useEffect(() => {
        fetch(`http://localhost:5000/orders?email=${user.email}`,{
            headers:{
                'authorizetion': `Barer ${localStorage.getItem('idToken')}`
            }
        })
            .then(res => {
                if(res.status === 200){
                    return res.json();
                }else if(res.status === 401){
                    history.push('/login');
                }
            })
            .then(data => setOrders(data))
    }, [])


    return (
        <div className="App">
            <h1>You have placed: {orders.length} Orders</h1>
        </div>
    );
};

export default Order;