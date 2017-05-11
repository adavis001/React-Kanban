const reactContainer = document.getElementById("root");

const getCardsFromFakeDB = () => new Promise((resolve, reject) => {
  const cardsFromFakeDB = [
    {
      id: 1,
      title : 'Order Pizza',
      priority : 'Medium',
      status: 'Done',
      createdBy: 'Alexander Davis',
      assignedTo: 'Ernest Tsang'
    },    {
      id: 2,
      title : 'Eat Pizza',
      priority : 'High',
      status: 'In Progress',
      createdBy: 'Alexander Davis',
      assignedTo: 'Ernest Tsang'
    },    {
      id: 3,
      title : 'Exercise',
      priority : 'Low',
      status: 'Que',
      createdBy: 'Ernest Tsang',
      assignedTo: 'Alexander Davis'
    }
  ];

  resolve(cardsFromFakeDB);
});

//took out the id.  Is it needed?
const Card = (props) => (
  <div className = "card">
    <h3>Task: { props.card.title }</h3>
    <div>Priority Level:  { props.card.priority }</div>
    <div>Status of Task: { props.card.status }</div>
    <div>Created By:  { props.card.createdBy }</div>
    <div>Assigned To:  { props.card.assignedTo }</div>
  </div>
);


//can't filter by id.  Figure out why later!
// const CardSearchFilter = filter =>
//   ({ title, priority, status, createdBy, assignedTo, id }) =>
//     filter === "" ||
//       title.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
//       priority.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
//       status.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
//       createdBy.toLowerCase().indexOf(filter.toLowerCase()) >= 0 ||
//       assignedTo.toLowerCase().indexOf(filter.toLowerCase()) >= 0;

const CardList = ({ cards, filter }) => (
  <ul>
    { cards
      //.filter(CardSearchFilter(filter))
      .map( card => <Card card={card} /> )
    }
  </ul>
);

const CardFilterInput = ({ setFilter }) => (
  <input type="text" placeholder="search" onChange={setFilter} />
);

class Cards extends React.Component {

}

class DoneColumn extends React.Component {
  render(){
    return (
        <div>
          <div className="done">
            <p>Done</p>
          </div>
        </div>

    )
  }
}

class ProgressColumn extends React.Component {
  render(){
    return (
        <div>
          <div className="progress">
            <p>In Progress</p>
          </div>
        </div>
    )
  }
}

class QueueColumn extends React.Component {
  constructor(props){
    super(props);

    };

  render(){
    return (
        <div>
          <div className="queue">
            <p>To Do</p>
            <CardList cards={this.props.cards}></CardList>
          </div>
        </div>
    )
  }
}


class NewCardForm extends React.Component {

  constructor(props){
    super(props);

    // set the initial state
    this.state = {
      title: "",
      priority: "",
      status: "",
      createdBy: "",
      assignedTo: "",
      id: ""
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePriorityChange = this.handlePriorityChange.bind(this);
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleCreatedByChange = this.handleCreatedByChange.bind(this);
    this.handleAssignedToChange = this.handleAssignedToChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  addCard(card){
    console.log(card);
    // update my parent's cards state
    this.props.addCard(card);

    const title = "";
    const priority = "";
    const status = "";
    const createdBy = "";
    const assignedTo = "";
    const id = "";
    this.setState({
      title,
      priority,
      status,
      createdBy,
      assignedTo,
      id
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.addCard(this.state);
  }

  handleTitleChange(event) {
    this.setState({ title : event.target.value });
  }

  handlePriorityChange(event) {
    this.setState({ priority : event.target.value });
  }

  handleStatusChange(event) {
    this.setState({ status : event.target.value });
  }

  handleCreatedByChange(event) {
    this.setState({ createdBy : event.target.value });
  }

  handleAssignedToChange(event) {
    this.setState({ assignedTo : event.target.value });
  }

  render(){
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <input type="text" placeholder="title" onChange={this.handleTitleChange} value={this.state.title} />
        </div>

        <div>
          <input type="text" placeholder="created by" onChange={this.handleCreatedByChange} value={this.state.createdBy} />
        </div>

        <div>
          <input type="text" placeholder="assigned to" onChange={this.handleAssignedToChange} value={this.state.assignedTo} />
        </div>

        <div> Priority Level:
          <div><input type="radio" name="priority" value="High" onChange={this.handlePruorityChange} value={this.state.status}  defaultChecked={true} />High</div>
          <div><input type="radio" name="priority" value="Medium" onChange={this.handlePruorityChange} value={this.state.status} />Medium</div>
          <div><input type="radio" name="priority" value="Low" onChange={this.handlePruorityChange} value={this.state.status} />Low</div>
        </div>

        <div> Status of Task:
          <div><input type="radio" name="status" value="Que" onChange={this.handleStatusChange} value={this.state.status} defaultChecked={true}/>Que</div>
          <div><input type="radio" name="status" value="In Progress" onChange={this.handleStatusChange} value={this.state.status} />In Progress</div>
          <div><input type="radio" name="status" value="Done" onChange={this.handleStatusChange} value={this.state.status} />Done</div>
        </div>
        <div>
          <button type="submit">Add Card</button>
        </div>
      </form>
    )
  }
}

class App extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      cards : [],
      filter : ""
    };

    this.setFilter = this.setFilter.bind(this);
    this.addCard = this.addCard.bind(this);

  }

  componentWillMount() {
    this.getBCard().then( cards => {
      this.setState({ cards });
    });
  }

  getBCard(){
    return getCardsFromFakeDB();
  }

  setFilter(e){
    // console.log(e.target.value);
    this.setState({ filter : e.target.value });
  }

  addCard(card){
    this.setState({
      cards : this.state.cards.concat(card)
    });
  }
       // <CardList cards={this.state.cards} filter={this.state.filter}></CardList>
        //<CardFilterInput setFilter={this.setFilter} />

  render(){
    return (
      <div>
        <h1>Hello Kanban!</h1>
        <NewCardForm addCard={this.addCard}/>
        <QueueColumn cards={this.state.cards} />
        <ProgressColumn />
        <DoneColumn />
      </div>
    );
  }
};

ReactDOM.render(
  // component to render
  <App />,

  // where to inject this component
  // dom element, or use getElementById
  reactContainer
);