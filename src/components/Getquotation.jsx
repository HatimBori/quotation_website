import * as React from "react";
import axios from "axios";
import CustomTable from "./Table";
import { useNavigate, useParams } from "react-router-dom";

function Getquotation() {
  const [getcarts, setgetCarts] = React.useState([]);
  const { customerId } = useParams();
  const [customerData, setCustomerData] = React.useState(null);

  React.useEffect(() => {
    const fetchCustomerData = async () => {
      console.log(customerId);
      try {
        const response = await axios.get(
          `http://localhost:3004/editcustomer/${customerId}`
        );
        setCustomerData(response.data);
        console.log("retrieved customer data on quotation", response.data);
      } catch (error) {
        console.error("Error fetching customer data:", error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

  console.log(customerData);

  const getaddtoCart = async () => {
    try {
      const response = await axios.get("http://localhost:3004/addtocart");
      setgetCarts(response.data);
      console.log(" quoatation ddata", response.data);
    } catch (error) {
      console.error("Error fetching customer:", error);
    }
  };

  React.useEffect(() => {
    getaddtoCart();
  }, []);
  return <div>

  <CustomTable getcarts={getcarts} customerData={customerData} />
  
  
  
  </div>;
}

export default Getquotation;
