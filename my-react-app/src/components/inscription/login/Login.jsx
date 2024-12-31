import { Form, Link, redirect, useActionData } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormRow from '../../../FormRow'
import customFetch from '../../../utils/customFetch'
import SubmitBtn from "../../SubmitBtn"
import './login.css'
export const action=async({request})=>{
    const formData=await request.formData()
    const data=Object.fromEntries(formData)
    const errors={msg:''}
    if(data.password.length < 3){
      errors.msg='passowrd too short'
      return errors;
    }
    try {
      const response = await customFetch.post('/auth/login', data);
      const { data: responseData } = response;
      const { user } = responseData;

      toast.success('Login successful');
      if (user.role === 'admin') {
        return redirect('/');
      } else if (user.role === 'user') {
        return redirect('/');
      }
    } catch (error) {
      const errorMsg = error?.response?.data?.msg || 'An unexpected error occurred';
      toast.error(errorMsg);
      return error;
    }

  }

const Login = () => {
    const errors=useActionData()
  return (
    <main className='main-login-content'>
        <div className='content-main-login-content'>
            <div className='signin-login-content'>
                <div className='content-signin-login-content'>
                    <div className='header-content-signin-login-content'>
                        <h1>Se connecter</h1>
                        <p>Entrez les informations de votre compte</p>
                    </div>
                    <div className='form-content-signin-login-content'>
                        <Form action="" method='POST' className='form-form-form-content-signin-login-content'>
                            <FormRow type="email" name='email' placeholder='email'/> <br/>
                            <FormRow type="password" name='password' placeholder='Mot de Pass'/> <br/>
                            {errors?.msg && <p style={{color:'red'}}>{errors.msg}</p>}
                            {/* <button type='submit'>sign in</button> */}
                            <SubmitBtn text="Se connecter" request="login" />
                        </Form>
                        <Link to={'/'}>
                            <button>Retourner</button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='signup-login-content'>
                <div className='content-signup-login-content'>
                    <h1>Salut!</h1>
                    <p>Si vous n'avez pas de compte, vous pouvez en créer un nouveau ici.</p>
                    <Link to={'/sign_up'}>
                        <button>S'inscrire</button>
                    </Link>
                </div>
            </div>
        </div>
    </main>
  )
}

export default Login