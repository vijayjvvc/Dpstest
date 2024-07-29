import dpsLogo from './assets/DPS.svg';
import './App.css';
import Options from './components/Options';
import TableData from './components/TableData';
import { useEffect, useState } from 'react'

function App() {
	const [users, setUsers] = useState([]);
	const [mainUsers, setMainUsers] = useState([]);
	const [oldestUsers, setOldestUsers] = useState({});


	useEffect(() => {
		fetch("https://dummyjson.com/users").then((response) => { return response.json() }).then((data) => { setUsers(data.users), setMainUsers(data.users) });
	}, [])

	const myDebounce = (cb, delay) => {
		let timer;
		return function (...args) {
			if (timer) clearTimeout(timer)
			timer = setTimeout(() => {
				cb(...args)
			}, delay)
		}
	}

	// funtion run on when the input value of name changes
	const handleNameChange = myDebounce((event) => {
		var name = event.target.value;
		var filteredUser = [];
		mainUsers.map((user => {
			if (user.firstName.toLowerCase().includes(name.toLowerCase()) || user.lastName.toLowerCase().includes(name.toLowerCase())) {
				filteredUser.push(user);
			}
		}))
		setUsers(filteredUser)
	}, 1000)

	// funtion run on when the city changes
	function handleCityChange(event) {
		const city = event.target.value
		var filtererdData = [];
		if (city === "all") {
			setUsers(mainUsers);
		} else {
			mainUsers.map((user) => {
				if (user.address.city == city) {
					filtererdData.push(user);
				}
			})
			setUsers(filtererdData);
		}
	}

	function getOld() {
		const oldest = {};
		mainUsers.forEach((user) => {
			const city = user.address.city;
			const age = user.age
			if (!oldest[city] || age > oldest[city].age) {
				oldest[city] = user;
			}
		});
		setOldestUsers(oldest)
	}


	return (
		<>
			<div className='logoDiv'>
				<a href="https://www.digitalproductschool.io/" target="_blank">
					<img src={dpsLogo} className="logo" alt="DPS logo" />
				</a>
			</div>
			<div className="home-card">
				<div className="parent">
					<div className="container">
						<div className="inputs">
							<div className='input'>
								<label htmlFor="name">Name</label>
								<input id='name' type="text" placeholder='Search by name' onChange={(event) => { handleNameChange(event) }} />
							</div>
							<div className="input">
								<label htmlFor="city">City</label>
								<select name="city" id="city" onChange={(event) => { handleCityChange(event) }}><option value={"all"}>All</option>{<Options mainUsers={mainUsers} />}</select>
							</div>
							<div>
								<label htmlFor="oldestMan">Highlist oldest per city</label>
								<input id='oldestMan' type="checkbox" onChange={(event) => { if (event.target.checked) { getOld(); } else { setOldestUsers([]) } }} />
							</div>
						</div>
						<div className='table'>
							<table>
								<thead>
									<tr>
										<th>Name</th>
										<th>City</th>
										<th>Date of birth</th>
									</tr>
								</thead>
								<TableData users={users} oldestUsers={oldestUsers}
								/>
							</table>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default App;
