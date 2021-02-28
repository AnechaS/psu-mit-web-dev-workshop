import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { PARSE_MASTER_KEY } from '../../utils/constants';

export default class UserPage extends Component {
  state = {
    users: [],
  };

  async componentDidMount() {
    // get users.
    const { data } = await axios({
      url: '/classes/_User',
      method: 'GET',
      headers: {
        'X-Parse-Master-Key': PARSE_MASTER_KEY,
      },
    });
    this.setState({ users: data.results });
  }

  deleteUser = async (index) => {
    const user = this.state.users[index];

    try {
      // request delete user.
      /* const { data } =  */ await axios({
        url: `/classes/_User/${user.objectId}`,
        method: 'DELETE',
        headers: {
          'X-Parse-Master-Key': PARSE_MASTER_KEY,
        },
      });

      // remove the user state.
      this.setState((prevState) => {
        const users = prevState.users.slice();
        users.splice(index, 1);
        return { users };
      });
    } catch (error) {
      // Todo handle error
      console.error(error);
    }
  };

  render() {
    const { users } = this.state;

    return (
      <div className="container-fluid">
        <h3 className="mb-3">Users</h3>

        <div style={{ maxWidth: 700 }}>
          <Link
            to="/users/create"
            className="btn btn-primary mb-2 font-weight-bolder"
          >
            Add
          </Link>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col" width="20%">
                  id
                </th>
                <th scope="col" width="30%">
                  username
                </th>
                <th scope="col" width="30%">
                  email
                </th>
                <th scope="col" width="20%">
                  actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((o, index) => (
                <tr key={o.objectId}>
                  <th scope="row">{o.objectId}</th>
                  <td>{o.username}</td>
                  <td>{o.email}</td>
                  <td>
                    <div
                      className="btn-group btn-group-sm"
                      role="group"
                      aria-label="Basic example"
                    >
                      <Link
                        to={{
                          pathname: `users/${o.objectId}/edit`,
                          state: o,
                        }}
                        className="btn btn-light"
                      >
                        edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => {
                          this.deleteUser(index);
                        }}
                      >
                        del
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
