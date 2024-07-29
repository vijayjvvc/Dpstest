import React from 'react'

function Options({ mainUsers }) {
    let options = [];
    let cities = new Set();
    if (mainUsers) {
        // getting cities
        if (mainUsers) {
            mainUsers.map((user) => {
                cities.add(user.address.city)
            })
            cities.forEach((city, index) => {
                options.push(<option key={index} value={city}>{city}</option>)
            })
        }
    }

    return (
        <>
            {options}
        </>
    )
}

export default Options