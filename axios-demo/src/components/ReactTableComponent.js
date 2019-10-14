import React from "react";
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from 'reactstrap';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import ApiService from "../service/ApiService";
import './ReactTableComponent.css';

class ReactTableComponent extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      data: [],
      modal: false,
      first_name: "",
      last_name: "",
      email: "",
      id: "",
      isEditMode: false
    };

    this.state = this.initialState;
    this.columns = [
      {
        Header: "Action",
        accessor: "action",
        headerStyle: { whitespace: 'unset' },
        style: { whitespace: 'unset' },
        Cell: ({ row, original }) => {

          return (
            <div>

              <span
                className="basicLink"
                style={{ cursor: 'pointer', marginRight: '10px' }}
                onClick={() => {
                  this.getRecordById(original.id);
                }}
              >
                {'Edit'}
              </span>
              <span
                className="basicLink"
                style={{ cursor: 'pointer', marginRight: '10px' }}
                onClick={() => {
                  this.deleteRow(original);
                }}
              >
                {'Delete'}
              </span>
            </div>
          );
        }
      },
      {
        Header: "ID",
        accessor: "id",
        headerStyle: { whitespace: 'unset' },
        style: { whitespace: 'unset' },
      },
      {
        Header: "First Name",
        accessor: "first_name",
        headerStyle: { whitespace: 'unset' },
        style: { whitespace: 'unset' },
      },
      {
        Header: "Last Name",
        accessor: "last_name",
        headerStyle: { whitespace: 'unset' },
        style: { whitespace: 'unset' },
      },
      {
        Header: "EMAIL",
        accessor: "email",
        headerStyle: { whitespace: 'unset' },
        style: { whitespace: 'unset' }
      },
    ];
  }


  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };



  getRecordById = (id = 0) => {

    ApiService.fetchEmployeeById(id).then(res => {
      // console.log("Result From Data");
      // console.log(res);
      // console.log("Result From Data");
      this.setState(
        res.data
      );
      this.setState({
        isEditMode: true
      });
    });
  }

  editRow = row => {
    // TODO: Edit Call here
    console.log("inside edit row", row);
    ApiService.editEmployee({
      "first_name": this.state.first_name,
      "last_name": this.state.last_name,
      "email": this.state.email,
      "id": this.state.id
    }).then(res => {
      console.log("in edit method ...");
      this.setState({
        isEditMode: false
      });
      this.setState(this.initialState);
      this.reloadData();
    })

  };

  addRow = () => {
    ApiService.addEmployee({
      "first_name": this.state.first_name,
      "last_name": this.state.last_name,
      "email": this.state.email,
      "id": this.state.id
    }).then(res => {
      console.log("in add method ...");
      this.setState(this.initialState);
      this.reloadData();
    })
  };

  deleteRow = row => {
    // TODO: Delete Confirm Box
    ApiService.deleteEmployee(row.id).then(res => {
      this.reloadData();
    })
  };

  reloadData = () => {
    ApiService.fetchEmployees('http://localhost:3000/employees')
      .then(res => {
        console.log("data ... ", res.data);
        this.setState({
          data: res.data,
        })
      })
  };

  componentDidMount() {
    this.reloadData();
  };

  render() {
    const { data } = this.state;
    return (
      <div style={{ padding: '50px' }}>


        <div class="jumbotron">
          <h1 class="display-4">React - Integration with Axios !</h1>
          {/* <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p> */}
          <hr class="my-4" />
          {/* <p>It uses utility classes for typography and spacing to space content out within the larger container.</p> */}
          {/* <p class="lead">
            <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
          </p> */}
        </div>
        <h2 className="App">Employee Details</h2>
        <form class="form-inline" action="/action_page.php" style={{ paddingBottom: 20 }}>
          <label for="email" style={{ margin: 20 }}>First Name:</label>
          <input type="text" class="form-control" id="first_name" value={this.state.first_name} onChange={this.handleChange} />
          <label for="email">Last Name:</label>
          <input type="text" class="form-control" id="last_name" value={this.state.last_name} onChange={this.handleChange} />
          <label for="email">Email:</label>
          <input type="text" class="form-control" id="email" value={this.state.email} onChange={this.handleChange} />
          <label for="email">Id:</label>
          <input type="text" class="form-control" id="id" value={this.state.id} onChange={this.handleChange} disabled={(!this.state.isEditMode) ? "" : "disabled"} />
          <button type="button" class="btn btn-primary" onClick={() => (this.state.isEditMode) ? this.editRow() : this.addRow()}>
            {(this.state.isEditMode) ? "Update" : "Add"}

          </button>
        </form>
        {/* <button className="btn btn-danger" style={{ width: '100px', marginLeft: '1200px' }} >Add Record</button> */}
        <ReactTable
          data={data}
          defaultPageSize={10}
          columns={this.columns}
          className="-striped -highlight"
        />
      </div>
    );
  }
}

export default ReactTableComponent;