import { Link } from "react-router";
import './UserCard.css';

function UserForm({buttonText, onSubmitHandler, hasPasswordField=true}: {buttonText: string, hasPasswordField?: boolean, onSubmitHandler?: () => void}) {
  return (
    <form className="user-form" onSubmit={onSubmitHandler}>
      <div className="user-form-email">
        {hasPasswordField && <p>Email</p>}
        <input type="email" placeholder="example@example.com" />
      </div>

      {hasPasswordField && 
        <div className="user-form-password">
          <p>Password</p>
          <input type="password" placeholder="Password" />
        </div>
      }
      <button className="user-form-submit" type="submit">{buttonText}</button>
    </form>
  );
}

function UserFormHeader({title, subtitle}: {title: string, subtitle?: string}) {
  return (
    <div className="user-form-header">  
      <h2>{title}</h2>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}

function UserFormFooter({children}: {children: React.ReactNode}) {
  return (
    <div className="user-form-footer flexrow"> 
      {children}
    </div>
  );
}

export function SignInUserCard() {
  return (
    <div className="user-card sign-in-card">
      <UserFormHeader title="Sign in to your account" />
      <UserForm buttonText="Sign In" />
      <UserFormFooter> 
          <div> 
            <span>Don’t have an account?</span> 
            <Link to="/sign-up">Sign up</Link> 
          </div>
          <div> <Link to="/recover-password">Forgot password?</Link> </div>
      </UserFormFooter>
    </div>
  );
}

export function SignUpUserCard() {
  return (
    <div className="user-card sign-up-card">
      <UserFormHeader title="Sign up an account" />
      <UserForm buttonText="Create account" />
      <UserFormFooter>
        <div> 
          <span>Already have an account?</span> 
          <Link to="/sign-in">Sign in</Link> 
          </div>
      </UserFormFooter>
    </div>
  );
}
export function RecoverPasswordUserCard() {
  return (
    <div className="user-card recover-password-card">
      <UserFormHeader title="Recover your password" subtitle="Enter your email to recover your password" />
      <UserForm buttonText="Update Password" hasPasswordField={false} />
      <UserFormFooter>
        <div> <span>Remember your password?</span> <Link to="/sign-in">Sign in</Link>  </div>
      </UserFormFooter>
    </div>
  );
}

export default function UserCard(form: 'sign-in' | 'sign-up' | 'recover-password') {
  if (form === 'sign-in') {
    return <SignInUserCard />;
  } else if (form === 'sign-up') {
    return <SignUpUserCard />;
  } else {
    return <RecoverPasswordUserCard />;
  }
}
