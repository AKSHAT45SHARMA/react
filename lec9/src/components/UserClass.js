import React from "react";

class UserClass extends React.Component {
  constructor(props) {
    super(props); // correctly initializes props
    this.state = {
        userInfo:{
            name : "Dummy",
            location: "default",
            avatar_url:"https://www.bing.com/ck/a?!&&p=https://www.bing.com/th/id/OIP.SZkR6YX_dIcLxgd0h_hVGAHaEK?w=252&h=211&c=8&rs=1&qlt=90&o=6&cb=thwsc5&dpr=1.3&pid=3.1&rm=2&ptn=3&ver=2&hsh=4&fclid=15b25b92-addf-6ceb-2606-4f5aac2d6da5&u=a1L2ltYWdlcy9zZWFyY2g_cT1waG90JmlkPUQ2NzI1REI0NDhFOTJENEZDRDlBQjBDQjUwOTE4N0E3QjgwMzBCRjImRk9STT1JQUNGSVI&ntb=1"
        }
    }
  }

  async componentDidMount(){
    console.log("i am called");
    const data = await fetch("https://api.github.com/users/AKSHAT45SHARMA");
    const json = await data.json();

    this.setState({
        userInfo: json,
    })
  }
  componentDidUpdate(){
    console.log("i am updated..");
  }

  componentWillUnmount(){
    console.log("unmounted component");
  }

  render() {
    // const {count} = this.state; 
    return (
      <div className="user-card">
        {/* <h1>Count : {count}</h1>
        <h2>count:{this.state.count2}</h2>
        <button onClick={()=>{
            // Never Update Variable directly...
              this.setState({
                count:count+1,
                count2:this.state.count2+1
              })
              
        }}> Count Increase</button>
        <button onClick={()=>{
            if(this.state.count>0){
                this.setState({
                count : this.state.count-1,
            })
            }
        }}>
            count Decrease
        </button> */}
        <img src={this.state.userInfo.avatar_url} />
        <h1>Name: {this.state.userInfo.name}</h1>
        <h2>Location: {this.state.userInfo.location}</h2>
        <h2>Email: akshat@gmail.com</h2>
      </div>
    );
  }
}

export default UserClass;
