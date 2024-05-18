import { Formik, Field, Form } from 'formik';
import axios from 'axios';
import { FormValues } from './Interface/Login';

function Login() {
  const handleSubmit = async (values: FormValues) => {
    try {
      const response = await axios.post('https://api.homologation.cliqdrive.com.br/auth/login/', values, {
        headers: {
          'Accept': 'application/json; version=v1_web',
          'Content-Type': 'application/json'
        }
      });
      localStorage.setItem('token', response.data.tokens.access);
      window.location.href = "/home";
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-custom h-custom bg-white p-6 rounded-xl shadow-xl">
        <h2 className="mt-6 text-center text-8xl font-bold">
          <span className="text-primary">b</span>
          <span className="text-primary">2</span>
          <span className="text-primary">b</span>
          <span className="text-secondary">i</span>
          <span className="text-secondary">t</span>
        </h2>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={handleSubmit}
        >
          <Form className="mt-8 space-y-6">
            <input type="hidden" name="remember" value="true" />
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email" className="mb-1 text-base font-bold">E-mail</label>
                <Field id="email" name="email" type="email" required className="appearance-none rounded relative block w-full mt-2 px-3 mb-5 p-3 border border-gray-300 placeholder-gray-500 text-dark bg-backInput focus:outline-none focus:z-10 sm:text-sm" placeholder="@gmail.com" />
              </div>
              <div>
                <label htmlFor="password" className="mt-8 mb-1 text-base font-bold">Senha</label>
                <Field id="password" name="password" type="password" required className="appearance-none rounded relative block w-full mb-9 mt-2 px-3 py-3 border border-gray-300 placeholder-gray-500 text-dark bg-backInput focus:outline-none focus:z-10 sm:text-sm" placeholder="******" />
              </div>
            </div>
            <div>
              <button type="submit" className="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2">
                Sign In
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

export default Login;
