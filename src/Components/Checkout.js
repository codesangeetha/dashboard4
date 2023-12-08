
import React from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../services/fetchfns";
import { deleteData } from "../services/fetchfns";
export default function Checkout() {

    let navigate = useNavigate();


    const [arr, setArr] = React.useState([]);
    const [addressdata, setAddressData] = React.useState(
        {
            name: "",
            country: "",
            email: "",
            city: "",
            state: "",
            pin: "",
            phone: ""
        }
    );

    const [errors, setErrors] = React.useState(
        {
            name: "",
            country: "",
            email: "",
            city: "",
            state: "",
            pin: "",
            phone: "",
        }
    );


    React.useEffect(() => {
        fetchData();
    }, [])

    function fetchData() {
        const basketId = localStorage.getItem('basketid-shoe');
        fetch(`http://localhost:8080/api/cart/get-cart-items?basketId=${basketId}`)
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                setArr(data);
            });
    }


    function crossFn(id) {
        const basketId = localStorage.getItem('basketid-shoe');
        const url = `http://localhost:8080/api/cart/remove-from-cart/${id}/${basketId}`;

        deleteData(url)
            .then(async data => {
                console.log(data);
                fetchData();

            });
    }

    function getResult() {
        const result = arr.map((item) => {
            let sum = item.product.price * item.quantity;

            let letters = "";
            if (item.product.name.length > 24) {
                letters = "...";
            }

            return (
                <div className="display-class">

                    <div className="name-class" >
                        {item.product.name.substring(0, 20)}{letters}
                    </div>
                    <div className="checkoutPrice">
                        ₹ {item.product.price}
                    </div>
                    <div className="qty-class">
                        {item.quantity}
                    </div>
                    <div className="amount-class">
                        ₹{sum}
                    </div>
                    <div>
                        <img className="cross-class" onClick={() => { crossFn(item.product.id) }} src="https://as1.ftcdn.net/v2/jpg/01/45/20/02/1000_F_145200273_450ViYipr5uU3WIwqzwjsRDHYTMcUH9P.jpg" />
                    </div>

                </div>
            );
        });
        return result
    }

    function total() {
        let grandTotal = 0;

        for (let i = 0; i < arr.length; i++) {
            let sum = arr[i].quantity * arr[i].product.price;
            grandTotal = grandTotal + sum;
        }
        return grandTotal;
    }

    function handleChange(event) {
        setAddressData(preVal => {
            return {
                ...preVal,
                [event.target.name]: event.target.value
            };
        });

        setErrors((preVal) => ({
            ...preVal,
            [event.target.name]: "",
        }));
    }

    function validateForm() {
        let valid = true;
        const newErrors = {};

        if (!addressdata.name.trim()) {
            newErrors.name = "Name is required";
            valid = false;
        }

        if (!addressdata.country.trim()) {
            newErrors.country = "Country is required";
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!addressdata.email.trim() || !emailRegex.test(addressdata.email)) {
            newErrors.email = "Valid email is required";
            valid = false;
        }
        if (!addressdata.city.trim()) {
            newErrors.city = "City is required";
            valid = false;
        }

        const pinRegex = /^\d+$/;
        if (!addressdata.pin.trim() || !pinRegex.test(addressdata.pin)) {
            newErrors.pin = "Valid numeric pin is required";
            valid = false;
        }

        if (!addressdata.phone.trim() || !pinRegex.test(addressdata.phone)) {
            newErrors.phone = "Valid numeric phone is required";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }

    function placeorderFn() {
        if (validateForm()) {
            const url = "http://localhost:8080/api/orders/add-order";
            const basketId = localStorage.getItem('basketid-shoe');

            const postObj = {
                "basketId": basketId,
                "name": addressdata.name,
                "city": addressdata.city,
                "country": addressdata.country,
                "pin": addressdata.pin,
                "email": addressdata.email,
                "phone": addressdata.phone
            };

            postData(url, postObj)
                .then(async data => {
                    localStorage.removeItem("basketid-shoe");
                    navigate(`/placeorder`);
                });

            console.log(addressdata);
        }
    }

    return (
        <div>

            <div className="display-class">
                <div className="headname-class" >
                    Name
                </div>
                <div className="headPrice-class">
                    Price
                </div>
                <div >
                    Qty
                </div>
                <div className="headTotal-class">
                    Total
                </div>
            </div>
            <hr></hr>
            <div >
                {getResult()}
            </div>
            <hr></hr>
            <div className="grand-class">
                Grand Total :₹  {total().toFixed(2)}
            </div>


            <div className="marginTop-class">
                Address:
            </div>

            <div className="display-class">

                <div>
                    <div className="marginTop-class" >
                        <input type="text" placeholder="Name" value={addressdata.name} name="name" onChange={handleChange} />
                        {errors.name && <div className="error" >{errors.name}</div>}
                    </div>
                    <div className="marginTop-class">
                        <input type="text" placeholder="Country" value={addressdata.country} name="country" onChange={handleChange} />
                        {errors.country && <div className="error">{errors.country}</div>}

                    </div>
                    <div className="marginTop-class">
                        <input type="text" placeholder="Email" value={addressdata.email} name="email" onChange={handleChange} />
                        {errors.email && <div className="error">{errors.email}</div>}
                    </div>
                </div>

                <div >
                    <div className="marginTop-class">
                        <input type="text" placeholder="City" value={addressdata.city} name="city" onChange={handleChange} />
                        {errors.city && <div className="error">{errors.city}</div>}
                    </div>
                    <div className="marginTop-class">
                        <input type="text" placeholder="Pin" value={addressdata.pin} name="pin" onChange={handleChange} />
                        {errors.pin && <div className="error">{errors.pin}</div>}

                    </div>
                    <div className="marginTop-class">
                        <input type="text" placeholder="Phone" value={addressdata.phone} name="phone" onChange={handleChange} />
                        {errors.phone && <div className="error">{errors.phone}</div>}
                    </div>
                </div>
            </div>

            <div>
                <button onClick={placeorderFn} className="marginTop-class">Place Order</button>
            </div>


        </div>
    )
}