import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Dashboard() {
  const [profile, setProfile] = useState({ name: '', email: '', high: '', low: '', medium:'' });

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      const auth = `Bearer ${ token }`;

      try {
        const response = await axios.get('https://api.homologation.cliqdrive.com.br/auth/profile/', {
          headers: {
            'Authorization': auth,
            'Accept': 'application/json;version=v1_web',
            'Content-Type': 'application/json'
          }
        });

        setProfile({
          name: response.data.name,
          email: response.data.email,
          high: response.data.avatar.high,
          low: response.data.avatar.low,
          medium:response.data.avatar.medium
        });
      } catch (error) {
        console.error('There was a problem fetching the profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = "/";
  };

  const imageUrl = window.innerWidth < 600 ? profile.low : window.innerWidth < 900 ? profile.medium : profile.high;

  return (
    <>
      <nav className="bg-white w-full fixed top-0 flex justify-between p-4">
        <div></div>
        <button onClick={handleLogout} className="text-white bg-primary h-customButtonHeight w-customButtonWidth pt-1 pb-1 rounded-full">
          Logout
        </button>
      </nav>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-16">
        <div className="bg-white p-6 w-full md:w-1/2 lg:w-1/3 shadow-2xl rounded-xl">
          <div className='items-center justify-center flex'>
          <img className={"w-20 h-20 rounded-md mb-7"} src={imageUrl} alt="Profile" />
          </div>
          <Formik
            initialValues={{ name: profile.name, email: profile.email }}
            onSubmit={() => {}}
          >
            <Form className="space-y-6">
              <div>
                <label htmlFor="name" className="mb-1 text-base">Your <strong>Nome</strong></label>
                <Field id="name" name="name" type="text" required value={profile.name} className="appearance-none rounded relative block w-full mt-2 px-3 py-3 border border-gray-300 placeholder-gray-500 text-dark bg-backInput focus:outline-none focus:z-10 sm:text-sm" placeholder="Nome" />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 text-base">Your <strong>E-mail</strong></label>
                <Field id="email" name="email" type="email" required value={profile.email} className="appearance-none rounded relative block w-full mt-2 px-3 py-3 border border-gray-300 placeholder-gray-500 text-dark bg-backInput focus:outline-none focus:z-10 sm:text-sm" placeholder="@gmail.com" />
              </div>
              <div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
