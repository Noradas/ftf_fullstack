import React, {useState, useEffect} from 'react';
import{Link} from "react-router-dom";
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";

const Home = ()=> {
	const [data, setData] = useState([]);
	const loadData = async () => {
		const response = await axios.get("http://localhost:5000/api/get");
		setData(response.data);
	};

	useEffect(()=>{
		loadData();
	},[]);

	const deletePlayer = (id) =>{
		if(window.confirm ("Are you sure that you wanted to delete that player ?")){
			
		axios.delete(`http://localhost:5000/api/remove/${id}`);

		toast.success("Contact Deleted Successfully");
		setTimeout(()=> loadData(), 500);
		}
	};

	return (
		<div style={{marginTop: "150px"}}>
			<Link to ="/addPlayer">
				<button className="btn btn-player">Add Player</button>
			</Link>
			
			<table className="styled-table">
				<thead>
					<tr>
						<th style={{textAlign: "center"}}>No.</th>
						<th style={{textAlign: "center"}}>Name</th>
						<th style={{textAlign: "center"}}>Lastname</th>
						<th style={{textAlign: "center"}}>Wins</th>
						<th style={{textAlign: "center"}}>Losses</th>
						<th style={{textAlign: "center"}}>Actions</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, index)=> {
						return (
							<tr key={item.id}>
								<th scope="row">{index+1}</th>
								<td>{item.name}</td>
								<td>{item.lastname}</td>
								<td>{item.wins}</td>
								<td>{item.losses}</td>

								<td>
									<Link to = {`/update/${item.id}`}>
										<button className= "btn btn-edit">Edit</button>
									</Link>
									<button className= "btn btn-delete" onClick ={()=> deletePlayer(item.id)}>Delete</button>

									<Link to = {`/view/${item.id}`}>
										<button className= "btn btn-view">View</button>
									</Link>
								</td>
							</tr>
						)
					})}
				</tbody>

			</table>
		
		
		</div>
	);
};

export default Home;