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
    this.state = {
      data: [],
      modal: false
    };


    this.columns = [
      {
        Header: "Action",
        accessor: "action",
        headerStyle: { whitespace: 'unset' },
        style: { whitespace: 'unset' },
        Cell: ({ row, original }) => {

          return (
            <div>

              {/* Modal Example */}
              <div>

                <Button color="danger" onClick={this.toggle}>TOGGLE</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}
                  fade={this.state.fade}
                >
                  <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
                  <ModalBody>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </div>
              {/* Modal Example */}
              <span
                className="basicLink"
                style={{ cursor: 'pointer', marginRight: '10px' }}
                onClick={() => {
                  this.editRow(original);
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

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  editRow = row => {
    // TODO: Edit Call here
    console.log("inside edit row", row);
    ApiService.editEmployee({
      "first_name": "kavita",
      "last_name": "gupta",
      "email": "Hohndoe@gmail.com",
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

    // TODO: Delete Confirm Box
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