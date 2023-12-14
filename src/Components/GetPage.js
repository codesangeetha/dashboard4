import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteData } from "../services/fetchfns";

export default function CRUDgetPage() {

    const [arr, setArr] = React.useState([]);

    const [dropVal, setDropval] = React.useState("mobile");

    function handleChange(event) {
        setDropval(event.target.value);
    };


    let navigate = useNavigate();

    React.useEffect(() => {
        fetchData();
    }, [dropVal])

    function fetchData() {
        fetch(`http://localhost:8080/api/products/type/${dropVal}`)
            .then(res => res.json())
            .then(data => {
                console.log('data', data);
                setArr(data);
            });
    }


    function crossFn(id) {

        const url = `http://localhost:8080/api/products/${id}`;

        deleteData(url)
            .then(async data => {
                console.log(data);
                fetchData();

            });
    }

    function editFn(id) {
        navigate(`/editPage/${id}`);

    }

    function getResult() {
        const result = arr.map((item) => {

            let letters = "";
            if (item.name.length > 24) {
                letters = "...";
            }
            return (
                <div className="getDisplay">
                    <div className="mapName" >
                        {item.name.substring(0, 24)}...{letters}
                    </div>
                    <div className="mapPrice">
                        ₹ {item.price}
                    </div>
                    <div className="mapdiv">
                        <img className="mapImg" src={item.imageUrl} />
                    </div>
                    <div className="maptype">
                        {item.productType}
                    </div>
                    <div className="getImage">
                        <img className="crossImg-class" onClick={() => { crossFn(item.id) }} src="https://cdn-icons-png.flaticon.com/512/9312/9312232.png" />
                    </div>
                    <div className="getImage">
                        <img className="pencilImg-class" onClick={() => { editFn(item.id) }} src="https://cdn-icons-png.flaticon.com/512/6324/6324968.png" />
                    </div>

                </div>

            )
        });
        return result
    }

    function buttonFn() {
        navigate(`/postpage`)
    }

    return (
        <div>
            <div>
                <button className="add-class" onClick={buttonFn}>+</button>
                <select id="type" className="type-class" onChange={handleChange} value={dropVal}>
                    <option value="type">Type</option>
                    <option value="mobile">Mobile</option>
                    <option value="shoe">Shoe</option>
                    <option value="dress">Dress</option>
                </select>
            </div>

            <div className="left-class">
                <div className="getDisplay">
                    <div className="getName">
                        Name
                    </div>
                    <div className="getPrice">
                        Price
                    </div>
                    <div className="getImage">
                        Image
                    </div>
                    <div className="getType">
                        type
                    </div>
                    <div className="getImage">
                        
                    </div>
                    <div className="getImage">
                        
                    </div>

                </div>
                <div >
                    {getResult()}
                </div>
            </div>

        </div>
    )
}
