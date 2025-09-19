import User from "./User";
import UserClass from "./UserClass";

const About =()=>{
    return (
        <div>
            <h1>ABOUT</h1>
            <h2>I name is Akshat Sharma</h2>
            {/* <User name={"Akshat from Function"}/> */}
            <UserClass name ={"Akshat from Class"} />
            
        </div>
        
    );
};

export default About;