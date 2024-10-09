/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/

const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/}
  return (
    <tr>
	  {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
    <td>{props.traveller.id}</td>
    <td>{props.traveller.name}</td>
    <td>{props.traveller.phone}</td>
    <td>{props.traveller.bookingTime.toLocaleString()}</td>   
    </tr>
  );
}

function Display(props) {
  
	/*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/

  return (
    <table className="bordered-table">
      <thead>
        <tr>
	  {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {props.travellers.map(traveller => (
          <TravellerRow key={traveller.id} traveller={traveller} />
        ))}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    const maxId = Math.max(...this.props.travellers.map(t => t.id), 0);
    this.props.bookTraveller({ 
      id: maxId + 1,
      name: form.travellername.value, 
      phone: form.travellerphone.value,
      bookingTime: new Date()
    });
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
	    {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        {/* <input type="text" name="travellerid" placeholder="ID" />       */}
        <input type="text" name="travellername" placeholder="Name" />
        <input type = "text" name = "travellerphone" placeholder = "Phone" />
        {/* <input type="text" name="travellerbookingtime" placeholder="Booking Time" /> */}
        {/* <input type="text" name="travellerseat" placeholder="Seat" /> */}
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    this.props.deleteTraveller({ 
      id: Number(form.travellerid.value)
    });
    
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
	    {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellerid" placeholder="ID" />  
        <button>Delete</button>
      </form>
    );
  }
}

class Homepage extends React.Component {
	constructor() {
	super();
	}
	render(){
	return (
	<div>
		{/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
    <h2>Welcome to the Ticket Reservation System</h2>
        {/* 调用 FreeSeat 组件并传递座位参数 */}
        <FreeSeat availableSeats={10} totalSeats={4} />
	</div>);
	}
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1};
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  /**
   * Sets the value of the component selector variable based on user's button click.
   * @param {string} value - The value to set for the selector.
   */
  setSelector(value)
  {
  	/*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
	    /*Q4. Write code to add a passenger to the traveller state variable.*/
      this.setState(prevState => ({
        travellers: [...prevState.travellers, passenger]
      }));
      alert('sucessfully added');
  }

  deleteTraveller(passenger) {
	  /*Q5. Write code to delete a passenger from the traveller state variable.*/
    const { travellers } = this.state;
    const updatedTravellers = travellers.filter(t => t.id !== passenger.id);
    if (updatedTravellers.length === travellers.length) {
      alert('Passenger not found!');
    }
    else{
      alert('sucessfully deleted');
    }
    this.setState({ travellers: updatedTravellers });

  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
	<div>
    <button onClick={() => this.setSelector('homepage')}>Home</button>
    <button onClick={() => this.setSelector('addTraveller')}>Add Traveller</button>
    <button onClick={() => this.setSelector('displayTravellers')}>Display Travellers</button>
    <button onClick={() => this.setSelector('deleteTravellers')}>Delete Traveller</button>
	    {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
	</div>
	<div>
		{/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
		{/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
		{/*Q3. Code to call component that Displays Travellers.*/}
		{/*Q4. Code to call the component that adds a traveller.*/}
		{/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
    {this.state.selector === 'homepage' && <Homepage freeSeats={this.freeSeats}/>}
    {this.state.selector === 'addTraveller' && <Add bookTraveller={this.bookTraveller} travellers={this.state.travellers} />}
    {this.state.selector === 'displayTravellers' && <Display travellers={this.state.travellers} />}
    {this.state.selector === 'deleteTravellers' && <Delete deleteTraveller={this.deleteTraveller} travellers={this.state.travellers}/>}

	</div>
      </div>
    );
  }
}
const freeSeats = ({ totalSeats = 10, availableSeats }) => {
  const reservedSeats = totalSeats - availableSeats;

  return (
    <div>
      <h2>Seat Arrangement</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 40px)', gap: '10px' }}>
        {Array.from({ length: availableSeats }).map((_, index) => (
          <div
            key={`available-${index}`}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'green',
              border: '1px solid black',
            }}
          ></div>
        ))}
        {Array.from({ length: reservedSeats }).map((_, index) => (
          <div
            key={`reserved-${index}`}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: 'grey',
              border: '1px solid black',
            }}
          ></div>
        ))}
      </div>
      <p>{`Available Seats: ${availableSeats}`}</p>
    </div>
  );
};

export default freeSeats;
const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
