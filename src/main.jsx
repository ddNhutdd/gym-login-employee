import React, {useState} from 'react'
import ReactDOM from 'react-dom/client'
import {
	createBrowserRouter, RouterProvider,
} from "react-router-dom";
import {useNavigate, useLocation, useParams} from 'react-router-dom';
import './main.css';

function Login() {
	const navigate = useNavigate();
	const submitHandler = (e) => {
		e.preventDefault();
		if (emailInput === 'admin@gmail.com' && passwordInput === 'letmein')
		navigate('/employ', {state: {email: emailInput}})
	}

	const [emailInput, setEmailInput] = useState('');
	const emailInputHandler = e => {
		setEmailInput(e.target.value);
	}
	const [passwordInput, setPasswordInput] = useState('');
	const passwordInputHandler = e => {
		setPasswordInput(e.target.value);
	}

	return (<form onSubmit={submitHandler}>
		<h1>Login</h1>
		<div> admin@gmail.com - letmein </div>
		<div>
			<label htmlFor="email">Email: </label>
			<input value={emailInput} onChange={emailInputHandler} id={`email`} type="text"/>
		</div>
		<div>
			<label htmlFor="password">Password: </label>
			<input value={passwordInput} onChange={passwordInputHandler} id={`password`} type="password"/>
		</div>
		<button type="submit">
			Submit
		</button>
	</form>)
}

const employees = [{
	id: 1, name: "Hoa", age: 20
}, {
	id: 2, name: "Khánh", age: 25
}, {
	id: 3, name: "Tú", age: 22
},]

function EmployeeDetail() {
	const params = useParams();
	const employee = employees.find((e) => +e.id === +params.id)
	return (<>
		<div>
			Name: {employee?.name}
		</div>
		<div>
			Age: {employee?.age}
		</div>
	</>)
}

function Employ() {
	const location = useLocation();
	const navigate = useNavigate();
	const {email} = location.state;
	const detailClickHandle = (id) => {
		navigate(`/employee/${id}`)
	}
	const renderTableBody = () => {
		return employees?.map(item => (<tr key={item.id}>
			<td>{item.name}</td>
			<td>{item.age}</td>
			<td>
				<button onClick={detailClickHandle.bind(null, item.id)} type="button">Detail</button>
			</td>
		</tr>))
	}
	return (<div>
		Email: {email}
		<table>
			<thead>
			<tr>
				<th>Name</th>
				<th>Age</th>
				<th>Action</th>
			</tr>
			</thead>
			<tbody>
			{renderTableBody()}
			</tbody>
		</table>
	</div>)
}

const router = createBrowserRouter([{
	path: "/", element: <Login/>,
}, {
	path: "/employ", element: <Employ/>,
}, {
	path: "/employee/:id", element: <EmployeeDetail/>,
},]);

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
	<RouterProvider router={router}/>
</React.StrictMode>,)
