1. what is microServices and momolithic?? explian in detail

2. what are the 2 ways of webapp/UI application fetch the data from backend??

3. What is CORS? what is unhandled rejection (TypeError): Failed to fetch
   fetchData
   src/components/Body.js:16:23
   13 | }, []);
   14 |
   15 | const fetchData =async () => {

   > 16 | const data = await fetch(
   > | ^
   > 17 | "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7568727&lng
   > 18 | );
   > 19 | const json = await data.json();

4. what is optinal chaining? usage cases..

5. what is the concept of shimmer UI??

6. eplain the syntax
  <div className="shimmer-container">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index} className="shimmer-card">cards</div>
      ))}
    </div>
  );
};

7) const [btnName,setBtnName] = useState("login");
    <button className="login" onClick={()=>{
            setBtnName("logout");
          }}
          >{btnName}</button>
 here btnName is initialise as a constant but onclick we try to update teh btnName which is wrong according to the JS principle as const canbe updated..Explain this in detail...

 8) <div className="search">
          <input type="text" className="search-box" value = {searchdata}/>
          <button onClick={() => {
            console.log(searchdata);
          }}>search</button>
        </div>
        <button

 You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`.
    we write this code .it doesnot take text as input in inputbox

9) 
