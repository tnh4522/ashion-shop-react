import {useEffect, useState} from 'react';
import API from "../../../service/service.jsx";
import useUserContext from "../../../hooks/useUserContext.jsx";

function AccountInfo() {
    const [user, setUser] = useState({});
    const {userData, logout} = useUserContext();
    useEffect(() => {
        document.title = 'Account Information';
        const config = {
            headers: {
                Authorization: `Bearer ${userData.access}`
            }
        };
        API.get('me/', config).then(response => {
            setUser(response.data);
        })
    }, []);
    return (
        <div style={{padding: '20px', background: '#f9f9f9', borderRadius: '18px'}}>
            <h2>Account Information</h2>
            <table style={{width: '100%', borderCollapse: 'collapse', marginTop: '20px'}}>
                <tbody>
                <tr>
                    <td style={{fontWeight: 'bold', padding: '10px', borderBottom: '1px solid #ddd'}}>
                        Username:
                    </td>
                    <td style={{padding: '10px', borderBottom: '1px solid #ddd'}}>{user.username || 'Not provided'}</td>
                </tr>
                <tr>
                    <td style={{fontWeight: 'bold', padding: '10px', borderBottom: '1px solid #ddd'}}>
                        Email:
                    </td>
                    <td style={{padding: '10px', borderBottom: '1px solid #ddd'}}>{user.email || 'Not provided'}</td>
                </tr>
                <tr>
                    <td style={{fontWeight: 'bold', padding: '10px', borderBottom: '1px solid #ddd'}}>
                        Phone Number:
                    </td>
                    <td style={{
                        padding: '10px',
                        borderBottom: '1px solid #ddd'
                    }}>{user.phone_number || 'Not provided'}</td>
                </tr>
                <tr>
                    <td style={{fontWeight: 'bold', padding: '10px', borderBottom: '1px solid #ddd'}}>
                        Full Name:
                    </td>
                    <td style={{padding: '10px', borderBottom: '1px solid #ddd'}}>
                        {`${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Not provided'}
                    </td>
                </tr>
                <tr>
                    <td style={{fontWeight: 'bold', padding: '10px', borderBottom: '1px solid #ddd'}}>
                        Date of Birth:
                    </td>
                    <td style={{padding: '10px', borderBottom: '1px solid #ddd'}}>
                        {user.date_of_birth ? new Date(user.date_of_birth).toLocaleDateString() : 'Not provided'}
                    </td>
                </tr>
                <tr>
                    <td style={{fontWeight: 'bold', padding: '10px'}}>
                        Gender:
                    </td>
                    <td style={{padding: '10px'}}>
                        {user.gender === null ? 'Not provided' : user.gender === 'MALE' ? 'Male' : 'Female'}
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AccountInfo;
