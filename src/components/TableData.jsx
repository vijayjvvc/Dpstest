import React from 'react'
import TableRow from './TableRow'

function TableData({ users, oldestUsers }) {


    return (
        <tbody>
            {users && users.map((user, index) => (<TableRow key={index} user={user} highlight={oldestUsers[user.address.city] && oldestUsers[user.address.city].id === user.id}
            />))}
        </tbody>
    )
}

export default TableData
