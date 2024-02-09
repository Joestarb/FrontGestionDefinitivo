
import rectangle from "../../assets/LoginAssets/rectangle.png"
import laptop from "../../assets/LoginAssets/Laptop.png"
import { LoginForm } from "./Components/LoginForm";
function Login() {
  return (
    <div className="h-screen bg-[#EBEFFF]  ">
      <div className="grid grid-cols-2">
        <LoginForm />

        <div>

    
          <div className=" absolute right-[1%] top-0" >
            <img src={laptop} alt="rectangle" />
          </div>
        </div>

      </div>




    </div>
  );
}

export default Login;
