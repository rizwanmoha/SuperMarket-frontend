import React , {useEffect , useState} from 'react'
import axios from 'axios';
import OrderCard from '../orders/OrderCard';
import HeaderTitle from '@/components/HeaderTitle';
const Orders = () => {

  const [orders , setOrders] = useState([]);

  useEffect(()=>{
      const fetchOrders = async() =>{
          try{
            const response = await axios.get("http://localhost:5000/api/orders/user" , {
              headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            });
            console.log(response.data);
            setOrders(response.data);
          }
          catch(error){
              console.log("Error while fetching the orders");
          }
      }
      fetchOrders();

  } , [])




  return (
    <>
        <HeaderTitle title="Your Orders" subtitle="Order id" />
        
          <div className="container mx-auto px-4 py-8">
              <h1 className="text-3xl font-semibold mb-8">Track My Orders</h1>
              {orders.length === 0 ? (
                  <p className="text-lg">No orders to track</p>
              ) : (
                  <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                      {orders.map(order => (
                          <OrderCard key={order.id} order={order} />
                      ))}
                  </div>
              )}
          </div>
      </>
  )
}

export default Orders