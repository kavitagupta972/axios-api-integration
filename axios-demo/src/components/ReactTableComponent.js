import React from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import ApiService from "../service/ApiService";
import './ReactTableComponent.css';

class ReactTableComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
    this.columns = [
      {
        Header: "Action",
        accessor: "action",
        headerStyle: { whitespace: 'unset' },
        style: { whitespace: 'unset' },
        Cell: ({ row }) => {

          return (
            <div>
              <span
                className="basicLink"
                style={{ cursor: 'pointer', marginRight: '10px' }}
                onClick={() => {
                  this.editRow(row);
                }}
              >
                {'Edit'}
              </span>
              <span
                className="basicLink"
                style={{ cursor: 'pointer', marginRight: '10px' }}
                onClick={() => {
                  this.deleteRow(row);
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
  editRow = row => {
    console.log("inside edit row", row);
    ApiService.editEmployee({
      "first_name": "kavita",
      "last_name": "gupta",
      "email": "kavitagupta972@gmail.com",
      "id": row.id
    }).then(res => {
      console.log("in edit method ...");
      this.reloadData();
    })

  };

  addRow = () => {
    ApiService.addEmployee({
      "first_name": "kavita",
      "last_name": "gupta",
      "email": "kavitagupta972@gmail.com",
      "id": 39
    }).then(res => {
      console.log("in add method ...");
      this.reloadData();
    })
  };

  deleteRow = row => {
    console.log("inside delete row ", row.id);
    ApiService.deleteEmployee(row.id).then(res => {
      console.log("in delete method .....");
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
        <button className="btn btn-danger" style={{ width: '100px', marginLeft: '1200px' }} onClick={() => this.addRow()}>Add Record</button>
        <br />
        <br />
        <ReactTable
          data={data}
          defaultPageSize={10}
          columns={this.columns}
          className="-striped -highlight"
        />
        <br />

      </div >
    );
  }
}

export default ReactTableComponent;