// StartConversation.jsx
import React, { useState } from "react";
import { BsSend } from "react-icons/bs";
import { Link, useNavigate } from 'react-router-dom';
import { SlArrowLeft } from "react-icons/sl";
import axios from "axios";
import { useAuthContext } from './AuthContext.jsx';

const StartConversationForm = () => {
  const [formData, setFormData] = useState({ username: "", message: "" });
  const [error, setError] = useState(null);
  const { setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/start-conversation', formData);
      console.log('Response:', response.data);
      
      if (response.status === 201) { // Check for successful response
        const { usertoken, ...userData } = response.data;
        console.log('Form submitted successfully');
        localStorage.setItem('token', usertoken); // Store the token
        setUser({ ...userData, token: usertoken }); // Set user context with token
        navigate('/message'); // Navigate to the /message page
      } else {
        console.log('Form submission failed - status is not 201');
        setError("Submission failed: Server response was not successful.");
      }
    } catch (err) {
      console.error('Error starting conversation:', err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <div className="card-home-body bg-orange-500 h-36 p-5 content-top">
        <div className="icon-to-home text-white">
          <Link to='/'>
            <SlArrowLeft />
          </Link>
        </div>
        <h1 className="text-center align-center text-4xl font-semibold text-white">
          Hi there 👋
        </h1>
      </div>
      <div className="start-conversation">
        <form onSubmit={handleSubmit} className="p-3">
          <div className="form-control mb-5">
            <label className="mb-2"> Name </label>
            <input
              type="text"
              name="username"
              placeholder="Name"
              className="input input-bordered w-full input-md"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-control">
            <label className="mb-2"> Question </label>
            <textarea
              name="message"
              className="textarea textarea-bordered w-full"
              placeholder="Question"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn bg-orange-500 hover:bg-orange-400 btn-block text-lg text-white">
            <BsSend /> Start Chat
          </button>
          {error && <p className="error-message text-red-500 mt-2">{error}</p>}
        </form>
      </div>
    </>
  );
};

export default StartConversationForm;








// import React, { useState } from "react";
// import { BsSend } from "react-icons/bs";
// import { Link, Navigate } from 'react-router-dom';
// import { SlArrowLeft } from "react-icons/sl";
// import axios from "axios";
// import { useAuthContext } from './AuthContext.jsx';

// const StartConversationForm = () => {
//   const [submitted, setSubmitted] = useState(false);
//   const [formData, setFormData] = useState({ username: "", message: "" });
//   const [error, setError] = useState(null);
//   const { setUser } = useAuthContext();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('/api/start-conversation', formData);
//       if (response.data.success) {
//         setSubmitted(true);
//         setUser(response.data.user);
//       }
//     } catch (err) {
//       console.error('Error starting conversation:', err);
//       setError(err.response.data.message || "Something went wrong");
//     }
//   };

//   // if (submitted) {
//   //   return <Navigate to="/messages" />;
//   // }

//   return (
//     <>
//       <div className="card-home-body bg-orange-500 h-36 p-5 content-top">
//         <div className="icon-to-home text-white">
//           <Link to='/'>
//             <SlArrowLeft />
//           </Link>
//         </div>
//         <h1 className="text-center align-center text-4xl font-semibold text-white">
//           Hi there 👋
//         </h1>
//       </div>
//       <div className="start-conversation">
//         <form onSubmit={handleSubmit} className="p-3">
//           <div className="form-control mb-5">
//             <label className="mb-2"> Name </label>
//             <input
//               type="text"
//               name="username"
//               placeholder="Name"
//               className="input input-bordered w-full input-md"
//               value={formData.username}
//               onChange={handleChange}
//               required
//             />
//           </div>
//           <div className="form-control">
//             <label className="mb-2"> Question </label>
//             <textarea
//               name="message"
//               className="textarea textarea-bordered w-full"
//               placeholder="Question"
//               value={formData.message}
//               onChange={handleChange}
//               required
//             ></textarea>
//           </div>
//           <button type="submit" className="btn bg-orange-500 hover:bg-orange-400 btn-block text-lg text-white">
//             <BsSend /> Start Chat
//           </button>
//           {error && <p className="error-message text-red-500 mt-2">{error}</p>}
//         </form>
//       </div>
//     </>
//   );
// };

// export default StartConversationForm;