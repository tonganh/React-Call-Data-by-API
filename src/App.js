import React, { useEffect, useState } from 'react'
import UserTable from './UserTable'
import AddUserForm from './AddUserForm'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const api = axios.create({
	baseURL: `https://5d69d9fd6b97ef00145b7643.mockapi.io/api`
})

const App = () => {
	const [users, setUsers] = useState([])
	useEffect(() => {
		async function fetchData() {
			const res = await api.get("/users")
			console.log("res", res.data);
			setUsers(res.data)
		}
		fetchData()
	}, [])

	const intialFormState = { id: '', name: '', email: '', phone: '' }
	// Mang trang thai hien tai??
	const [currentUser, setCurrentUser] = useState(intialFormState)
	// Cai nay cho chuc nang edit
	const editRow = (user) => {
		setCurrentUser(user)
	}
	// const [users, setUsers] = useState(data)
	const addUser = (user) => {
		user.id = users.length + 1
		setUsers([...users, user])
	}
	const deleteUser = (id) => {
		setUsers(users.filter((user) => user.id !== id))
		// User duyet lai mang sao cho khong co phan tu id now. Tao ra mang moi. Well 1 cach de xoa phan tu.
	}
	const updateUser = (id, updateUser) => {
		setUsers(users.map((user) => (user.id === id ? updateUser : user)))
	}

	return (
		<div className="container parrent">
			<h1 className="text-center">CRUD App with Hooks</h1>
			<div className="d-flex flex-row">
				<div className="col-md-2">
					<div>
						<h2>
							Add user
						</h2>
						<AddUserForm addUser={addUser} />
					</div>
				</div>
				<div className="col-md-10">
					<h2>View users</h2>
					{/* Phan bang mac dinh */}
					<UserTable users={users} deleteUser={deleteUser} editRow={editRow} updateUser={updateUser} />
					{/* users o day chinh la mang cac phan tu hien tai.
                        deleteUser, editUSer la cac ham se can chay tuong
          */}
				</div>

			</div>

		</div >
	)
}

export default App