import React from 'react'
import Forms from './Form';
import './Summary.css'

const Report = () => {
    const [showForm, setShowForm] = React.useState(false);
    const [selectedProduct, setSelectedProduct] = React.useState(null);

    const setfunction = ()=>{
        setShowForm(!showForm)
    }

    const heading = [
        {
            "heading": "S.No."
        },
        {
            "heading": "Material name"
        },
        {
            "heading": "Total Qty"
        },
        {
            "heading": "Use Qty"
        },
        {
            "heading": "Reamainig Qty"
        },
    ]
    const data = [
        {
            "_id":"1",
            "Name": "Daksh",
            "Wins": "10",
            "Draw": "0",
            "Losses": "0",
        },
        {
            "_id":"2",
            "Name": "Aman",
            "Wins": "10",
            "Draw": "0",
            "Losses": "0",
        },
        {
            "_id":"3",
            "Name": "ARjuna",
            "Wins": "10",
            "Draw": "0",
            "Losses": "0",
        }

    ]


    return (
        <div className="container">
            <div className="table">
                <div className="table-header">
                    {
                        heading.map((head, index) => {
                            return (
                                <div key={index} className="header__item"><a id="name" className="filter__link sm:text-sm" href="">{head.heading}</a></div>
                            );
                        })
                    }
                </div>
                <div className="table-content">
                    {
                        data.map((row, indes) => {
                            return (
                                <div onClick={()=> setfunction(row._id)} className="table-row" key={indes}>
                                    <div className="table-data">{indes}</div>
                                    <div className="table-data">{row.Name}</div>
                                    <div className="table-data">{row.Wins}</div>
                                    <div className="table-data">{row.Draw}</div>
                                    <div className="table-data">{row.Losses}</div>
                                </div>
                            );
                        })
                    }

                </div>
            </div>
            {setShowForm && <Forms  setShowForm={setShowForm} showForm={showForm} selectedProduct={selectedProduct} />}
        </div>
    )
}

export default Report
