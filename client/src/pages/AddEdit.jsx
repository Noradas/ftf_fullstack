import React, {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from "react-router-dom"
import "./AddEdit.css";
import axios from "axios";
import {toast} from "react-toastify";

const initialState = {
	name: "",
	lastname: "",
	wins: "",
	losses: "",
};

const AddEdit = () =>{
	const [state, setState]= useState(initialState);

	const {name, lastname, wins, losses} = state;

	const history = useNavigate();
	const {id} = useParams();

	useEffect(()=>{
		axios.get(`http://localhost:5000/api/get/${id}`).then((resp)=> setState({...resp.data[0]}));
	},[id]);

	const handleSubmit = (e) =>{
		e.preventDefault();
		// const nav = useNavigate()
		if (!name || !lastname || !wins || !losses){
			toast.error("Please Provide value into each input field");
		} else {
		 if(!id){
			axios
				.post("http://localhost:5000/api/post", {
					name,
					lastname,
					wins,
					losses
			})
			.then(()=>{
				setState({name: "", lastname: "", wins: "", losses: ""});
				window.location('http://localhost:5000/')
			}).catch((err)=> toast.error(err.response.data));
			// nav(, { replace: true })
			

			toast.success("Player added successfully");
		 } else {
			axios
				.put(`http://localhost:5000/api/update/${id}`, {
					name,
					lastname,
					wins,
					losses
			})
			.then(()=>{
				setState({name: "", lastname: "", wins: "", losses: ""});
			}).catch((err)=> toast.error(err.response.data));

			toast.success("Player Updated successfully");
		 }
				
			setTimeout(()=>history.push("/"), 500);
		 } 
			
	};
	

	const handleInputChange = (e)=>{
		const {name, value} = e.target;
		setState({...state, [name]: value});
	};

	return (
		<div style={{marginTop: "100px"}}>
			<form style={{
			    margin : "auto",
				padding : "15px",
				maxWidth : "400px",
				alignContent : "center"
			}} onSubmit={handleSubmit}>

				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" placeholder="Your name" value={name || ""} onChange={handleInputChange}/>

				<label htmlFor="lastname">Lastname</label>
				<input type="lastname" id="lastname" name="lastname" placeholder="Your lastname" value={lastname || ""} onChange={handleInputChange}/>

				<label htmlFor="wins">Wins</label>
				<input type="number" id="wins" name="wins" placeholder="Your wins scores" value={wins || ""} onChange={handleInputChange}/>


				<label htmlFor="losses">Losses</label>
				<input type="number" id="losses" name="losses" placeholder="Your losses scores" value={losses || ""} onChange={handleInputChange}/>
				{/* <Link to ="/"> */}
				<input type="submit" value={id ? "Update" : "Save"}/>
				{/* </Link> */}
				<Link to ="/">
					<input type="button" value="Go Back" style={{width: "400px"}}/>
				</Link>
			</form>
		</div>
	);
}

export default AddEdit;