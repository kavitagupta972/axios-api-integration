import React, { Component } from "react";

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import ApiService from "./service/ApiService";
import './App.css';

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
        cell: row => {
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
                this.editRow(row);
              }}
            >
              {'Delete'}
            </span>
          </div>
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
        style: { whitespace: 'unset' },
        maxWidth: 150,
      },
    ];
  }
  editRow = row => {
    console.log("inside edit row", row.row);
    ApiService.editEmployee({
      "first_name": "kavita",
      "last_name": "gupta",
      "email": "kavitagupta972@gmail.com",
      "id": row.row.id
    }).then(res => {
      console.log("in edit method ...", res);
      this.reloadData();
    })

  };

  addRow = () => {
    ApiService.addEmployee({
      "first_name": "kavita",
      "last_name": "gupta",
      "email": "kavitagupta972@gmail.com",
      "id": 34
    }).then(res => {
      console.log("in edit method ...", res);
      this.reloadData();
    })
  };

  deleteRow = row => {
    console.log("inside delete row ", row.row.id);
    ApiService.deleteEmployee(row.row.id).then(res => {
      console.log("in delete method .....", res);
      this.reloadData();
    })
  };
  componentDidMount() {
    this.reloadData();
  }
  reloadData = () => {
    ApiService.fetchEmployees('http://localhost:3000/employees')
      .then(res => {
        this.setState({
          data: res.data,
        })
      })
  }
  render() {
    const { data } = this.state;
    return (
      <div style={{ padding: '50px' }}>
        <button className="btn btn-danger" style={{ width: '100px' }} onClick={() => this.addRow()}> Add Employee</button>
        <br />
        <ReactTable
          data={data}
          defaultPageSize={10}
          columns={this.columns}
          pageSize={1}
          className="-striped -highlight"
        />
        <br />

      </div >
    );
  }
}

export default ReactTableComponent;