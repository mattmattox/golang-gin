class App extends React.Component {
  render() {
    if (this.loggedIn) {
      return (<LoggedIn />);
    } else {
      return (<Home />);
    }
  }
}

class Home extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="col-xs-8 col-xs-offset-2 jumbotron text-center">
          <h1>OpsData</h1>
          <p>More than just a list of servers</p>
          <p>Sign in to get access </p>
          <a onClick={this.authenticate} className="btn btn-primary btn-lg btn-login btn-block">Sign In</a>
        </div>
      </div>
    )
  }
}

class LoggedIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jokes: []
    }
  }

  render() {
    return (
      <div className="container">
        <div className="col-lg-12">
          <br />
          <span className="pull-right"><a onClick={this.logout}>Log out</a></span>
          <h2>OpsData</h2>
          <p>Time to manage some servers</p>
          <div className="row">
            {this.state.server.map(function(server, i){
              return (<Server key={i} server={server} />);
            })}
          </div>
        </div>
      </div>
    )
  }
}

class Server extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heartbeat: ""
    }
    this.heartbeat = this.heartbeat.bind(this);
  }

  like() {
    // ... we'll add this block later
  }

  render() {
    return (
      <div className="col-xs-4">
        <div className="panel panel-default">
          <div className="panel-heading">#{this.props.joke.id} <span className="pull-right">{this.state.heartbeat}</span></div>
          <div className="panel-body">
            {this.props.server.hostname}
          </div>
          <div className="panel-footer">
            {this.props.joke.heartbeat} Heartbeat &nbsp;
            <a onClick={this.heartbeat} className="btn btn-default">
              <span className="glyphicon glyphicon-thumbs-up"></span>
            </a>
          </div>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
