import React from 'react'

function TableRow({ user, highlight}) {
    return (
        <tr style={{background: highlight?"rgb(80, 175, 253)":"white",color:"black"}}>
            <td>{user.firstName + " " + user.lastName}</td>
            <td>{user.address.city}</td>
            <td>{user.birthDate}</td>
        </tr>
    )
}

export default TableRow
