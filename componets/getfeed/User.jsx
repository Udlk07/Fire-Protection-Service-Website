import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import "./user.css";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; 

const User = () => {
    const [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get("http://localhost:8000/api/getall");
            setUsers(response.data);
        }
        fetchData();
    }, []);

    const deleteUser = async(userId) => {
        await axios.delete(`http://localhost:8000/api/delete/${userId}`)
        .then((response) => {
            setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
            toast.success(response.data.msg, { position: 'top-right' });
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const generatePDF = () => {
        const doc = new jsPDF();
        
        // Add title
        doc.setTextColor("black");
        doc.setFontSize(20);
        doc.setFont("bold");
        doc.text("Feedback Report 2024", 105, 10, { align: "center" });
        
        // AutoTable options
        const tableOptions = {
            startY: 20, // Start position for the table
            head: [['S.No.', 'User name', 'User Email', 'Rating', 'Team / Service', 'Feedback']],
            body: filteredUsers.map((user, index) => [
                index + 1,
                `${user.fname} ${user.lname}`,
                user.email,
                user.rating,
                user.team,
                user.feedback,
            ]),
            styles: {
                cellPadding: 2,
                fontSize: 8,
                valign: 'middle', // vertical alignment
                halign: 'center', // horizontal alignment
                textColor: [0, 0, 0], // Text color
                fillColor: [255,112,112]// Fill color
            },
        };
        
        // Add table
        doc.autoTable(tableOptions);

        // Save PDF
        doc.save("users.pdf");
    };

    // Function to filter users 
    const filteredUsers = users.filter(user =>
        user.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.rating.toString().includes(searchTerm)
    );

    return (
        <div>
            <div className='userTable'>
                <div className='searchBar'>
                    <input
                        type="text"
                        placeholder="Search...."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="searchButton" onClick={() => setSearchTerm("")}>Search</button>
                </div>
                <Link to={"/"} className='addButton'> Feedback </Link>
                <button className="generatePDFButton" onClick={generatePDF}>Generate Report</button>
                <p className="feedbackCount">Number of feedback: {filteredUsers.length}</p>
                <table id="userTable" border={1} cellPadding={10} cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>User name</th>
                            <th>User Email</th>
                            <th>Rating</th>
                            <th>Team / Service</th>
                            <th>Feedback</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td>{user.fname} {user.lname}</td>
                                    <td>{user.email}</td>
                                    <td>{user.rating}</td>
                                    <td>{user.team}</td>
                                    <td>{user.feedback}</td>
                                    <td className='actionButtons' >
                                        <button onClick={() => deleteUser(user._id)}><i className="fa-solid fa-trash-can"></i></button>
                                        <Link to={'/edit/' + user._id}><i className="fa-solid fa-pen-to-square"></i></Link>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            
        </div>
    );
}

export default User;
