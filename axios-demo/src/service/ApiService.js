import axios from 'axios';

const EMP_API_BASE_URL = 'http://localhost:3000/employees';

class ApiService {

  fetchEmployees() {
    return axios.get(EMP_API_BASE_URL);
  }

  fetchEmployeeById(id) {
    return axios.get(EMP_API_BASE_URL + '/' + id);
  }

  deleteEmployee(id) {
    return axios.delete(EMP_API_BASE_URL + '/' + id);
  }

  addEmployee(employee) {
    return axios.post("" + EMP_API_BASE_URL, employee);
  }

  editEmployee(employee) {
    return axios.put(EMP_API_BASE_URL + '/' + employee.id, employee);
  }

}

export default new ApiService();