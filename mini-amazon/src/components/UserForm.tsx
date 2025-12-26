
import './UserFrom.css'

export default function UserForm() {
  return (
     <form className="mini-amazon-user-form" >
      <div>Email</div>
      <input type="text" placeholder="example@example.com" />
      <div>Password</div>
      <input type="password" placeholder="Password" />
      <button type="submit">Sign In</button>
    </form>
  );
}


export function SignInCard() {
  return (
    <div className="card">
      <h2>Sign in to Mini Amazon</h2>
      <UserForm />
      <div className="subfoot flexrow">
        <div> <span>Don’t have an account?</span> <a>Sign up</a> </div>
        <div> <a> Forgot password?</a> </div>
      </div>
    </div>
  );  
} 