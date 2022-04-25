import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useStore } from "./components/store"

export function SignUp() {
    const navigate = useNavigate()
    const { updateUser } = useStore()
    const [password, setPassword] = useState('')
    const [passwordMessage, setPasswordMessage] = useState('')

    function addUser(username: string, email: string, password: string) {
        if(passwordMessage===''){
            fetch('http://localhost:3001/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        }).then(resp => resp.json())
            .then(data => {
                if (data.error) {
                    alert(data.error)
                } else {
                    localStorage.token = data.token
                    updateUser(data.user)
                    navigate('/pick-favorites')
                }
            })
        }else alert('Please set you password right!')
        
    }

    function handleOnChange(e:any) {
        setPassword(e.target.value)
    }

    function handleValidation() {

        const uppercaseRegExp = /(?=.*?[A-Z])/;
        const lowercaseRegExp = /(?=.*?[a-z])/;
        const digitsRegExp = /(?=.*?[0-9])/;
        const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
        const minLengthRegExp = /.{8,}/;
        const uppercasePassword = uppercaseRegExp.test(password);
        const lowercasePassword = lowercaseRegExp.test(password);
        const digitsPassword = digitsRegExp.test(password);
        const specialCharPassword = specialCharRegExp.test(password);
        const minLengthPassword = minLengthRegExp.test(password);

        let errMsg = '';
        if (!uppercasePassword) {
            errMsg = 'At least one Uppercase';
        } else if (!lowercasePassword) {
            errMsg = 'At least one Lowercase';
        } else if (!digitsPassword) {
            errMsg = 'At least one digit';
        } else if (!specialCharPassword) {
            errMsg = 'At least one Special Characters';
        } else if (!minLengthPassword) {
            errMsg = 'At least minumum 8 characters';
        } else {
            errMsg = '';
        }
        setPasswordMessage(errMsg)
    }


    return (
        <div className="sign-up">
            <h1 className="logo">Hoxtify</h1>
            <h2>Your daily music dose</h2>
            <form onSubmit={(e) => {
                e.preventDefault()
                //@ts-ignore
                addUser(e.target.username.value, e.target.email.value, e.target.password.value)
            }}>
                <div className="container">
                    <h1>SIGN UP!</h1>

                    <label>
                        <span>Username</span>
                        <input required name="username" type="text" placeholder="Create a username" />
                    </label>

                    <label>
                        <span>Email</span>
                        <input required name="email" type="email" placeholder="Enter your email adress" />
                    </label>

                    <label>
                        <span>Password</span>
                        <input onChange={(e) => handleOnChange(e)} onKeyUp={()=>handleValidation()} required name="password" type="password" placeholder="Create a password" />
                        <p style={{color:"red", textAlign:"start"}}>{passwordMessage}</p>
                    </label>

                    <button type="submit" value="Submit">
                        Sign Up
                    </button>

                    <p onClick={() => navigate('/sign-in')}>Already have an account? Sign in</p>
                </div>
            </form>
        </div>
    )
}