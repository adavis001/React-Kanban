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
    },
    {
      id: 2,
      title : 'Eat Pizza',
      priority : 'High',
      status: 'In Progress',
      createdBy: 'Alexander Davis',
      assignedTo: 'Ernest Tsang'
    },
    {
      id: 3,
      title : 'Exercise',
      priority : 'Low',
      status: 'Queue',
      createdBy: 'Ernest Tsang',
      assignedTo: 'Alexander Davis'
    }
  ];

  resolve(cardsFromFakeDB);
});

//dumb-ass component.  No brain!
// const Card = (props) => (
//   <div className = "card">
//     <h3>Task: { props.card.title }</h3>
//     <div>Priority Level:  { props.card.priority }</div>
//     <div>Status of Task: { props.card.status }</div>
//     <div>Created By:  { props.card.createdBy }</div>
//     <div>Assigned To:  { props.card.assignedTo }</div>
//     <div>Task Id:  { props.card.id }</div>
//   </div>
// );


class Card extends React.Component {
  constructor(props){
    super(props);

    // set the initial state
    // this.state = {
    //   title: "",
    //   priority: "",
    //   status: "",
    //   createdBy: "",
    //   assignedTo: "",
    //   id: ""
    // };
  this.handleStatusChange = this.handleStatusChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

   handleClick(card) {
    if(card.status === "In Progress"){
      card.status = "Done";
    }
    else if(card.status === "Queue"){
      card.status = "In Progress";
    }
    else if(card.status === "Done"){
      card.status = "Queue";
    }
    console.log("card",card);
    this.setState({});
  }

  updateCard(card){
    console.log(this.props);
    console.log(card);
    // update my parent's cards state
    this.props.updateCard(card);

    const title = this.props.card.title;
    const priority = "";
    const status = "";
    const createdBy = "";
    const assignedTo = "";
    this.setState({
      title,
      priority,
      status,
      createdBy,
      assignedTo,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.updateCard(this.state);
  }

  handleStatusChange(event) {
    this.setState({ status : event.target.value });
  }
  render(){
    return (
  <div className = "card">
    <h3>Task: { this.props.card.title }</h3>
    <div>Priority Level:  { this.props.card.priority }</div>
    <div onClick={() =>this.handleClick(this.props.card)} >Status of Task: { this.props.card.status }</div>
    <div>Created By:  { this.props.card.createdBy }</div>
    <div>Assigned To:  { this.props.card.assignedTo }</div>
    <div>Task Id:  { this.props.card.id }</div>
    <form onSubmit={this.handleSubmit}>
        <div>
          <button type="submit">Update Card</button>
        </div>
    </form>
  </div>
);
  }
}


const QueueSearch = filter =>
  ({ status }) =>
      status === 'Queue';

const ProgressSearch = filter =>
  ({ status }) =>
      status === 'In Progress';

const DoneSearch = filter =>
  ({ status }) =>
      status === 'Done';

const QueueList = ({ cards, filter, updateCard }) => (
  <ul>
    { cards
      .filter(QueueSearch())
      .map( card => <Card card={card} updateCard={updateCard} /> )
    }
  </ul>
);

const ProgressList = ({ cards, filter, updateCard  }) => (
  <ul>
    { cards
      .filter(ProgressSearch())
      .map( card => <Card card={card} updateCard={updateCard} /> )
    }
  </ul>
);

const DoneList = ({ cards, filter, updateCard  }) => (
  <ul>
    { cards
      .filter(DoneSearch())
      .map( card => <Card card={card} updateCard={updateCard} /> )
    }
  </ul>
);

const CardFilterInput = ({ setFilter }) => (
  <input type="text" placeholder="search" onChange={setFilter} />
);


class DoneColumn extends React.Component {
  //   constructor(props){
  //   super(props);
  // };

  render(){
    return (
        <div>
          <div className="done">
            <p>Done</p>
            <DoneList cards={this.props.cards} updateCard={this.props.updateCard}></DoneList>
          </div>
        </div>

    )
  }
}

//<ProgressList cards={this.props.cards}></ProgressList>
class ProgressColumn extends React.Component {
    // constructor(props){
    // super(props);
    // };

  render(){
    return (
        <div>
          <div className="progress">
            <p>In Progress</p>
            <ProgressList cards={this.props.cards} updateCard={this.props.updateCard}></ProgressList>
          </div>
        </div>
    )
  }
}

class QueueColumn extends React.Component {
  // constructor(props){
  //   super(props);

  //   };

  render(){
    return (
        <div>
          <div className="queue">
            <p>Queue</p>
            <QueueList cards={this.props.cards} updateCard={this.props.updateCard}></QueueList>
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

        <div> Priority Level: <br />
         <input type="radio" name="priority" value="High" onChange={this.handlePriorityChange}  />High <br />
         <input type="radio" name="priority" value="Medium" onChange={this.handlePriorityChange}  />Medium <br />
         <input type="radio" name="priority" value="Low" onChange={this.handlePriorityChange}  />Low
        </div>

        <div> Status of Task: <br />
        <input type="radio" name="status" value="Queue" onChange={this.handleStatusChange}  />In Queue <br />
         <input type="radio" name="status" value="In Progress" onChange={this.handleStatusChange}  />In Progress <br />
         <input type="radio" name="status" value="Done" onChange={this.handleStatusChange}  />Done
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
      todo: [],
      inProgress: [],
      done: []
    };

    this.setFilter = this.setFilter.bind(this);
    this.addCard = this.addCard.bind(this);
    this.updateCard = this.updateCard.bind(this);

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

  updateCard(card){
    this.setState({
      cards : this.state.cards.concat(card)
    });
  }
       // <QueueList cards={this.state.cards} filter={this.state.filter}></QueueList>
        //<CardFilterInput setFilter={this.setFilter} />

  render(){
    return (
      <div>
        <h1>Hello Kanban!</h1>
        <NewCardForm addCard={this.addCard}/>
        <QueueColumn cards={this.state.cards} updateCard={this.updateCard} />
        <ProgressColumn cards={this.state.cards} updateCard={this.updateCard} />
        <DoneColumn cards={this.state.cards} updateCard={this.updateCard} />
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