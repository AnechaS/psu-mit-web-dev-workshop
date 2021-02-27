import React, { Component } from 'react';
import axios from 'axios';
import TodoItem from '../components/TodoItem';

export default class HomePage extends Component {
  state = {
    items: [],
    text: '',
  };

  async componentDidMount() {
    const { data } = await axios.get('/classes/Items', {
      params: {
        order: 'isDo,-createdAt',
      },
    });

    this.setState({ items: data.results });
  }

  handleTextChange = (event) => {
    this.setState({ text: event.target.value.trim() });
  };

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { text } = this.state;
      const { data } = await axios.post('/classes/Items', {
        text,
        isDo: false,
      });

      const item = {
        ...data,
        text,
        isDo: false,
      };

      this.setState((prevState) => ({
        items: [item, ...prevState.items],
        text: '',
      }));
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  onCheck = async (index) => {
    try {
      const item = this.state.items[index];

      /* const { data } = */ await axios.put(
        `/classes/Items/${item.objectId}`,
        {
          isDo: true,
        }
      );

      this.setState((prevState) => {
        let items = prevState.items.slice();
        items[index].isDo = true;
        // sort items
        items = items.sort((x, y) => {
          return (
            (x.isDo === y.isDo ? 0 : x.isDo ? 1 : -1) ||
            new Date(y.createdAt) - new Date(x.createdAt)
          );
        });
        return { items };
      });
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  onEdit = async (index, value) => {
    try {
      const item = this.state.items[index];

      /* const { data } = */ await axios.put(
        `/classes/Items/${item.objectId}`,
        {
          text: value,
        }
      );

      this.setState((prevState) => {
        let items = prevState.items.slice();
        items[index].text = value;
        return { items };
      });
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  onDelete = async (index) => {
    try {
      const item = this.state.items[index];

      /* const { data } = */ await axios.delete(
        `/classes/Items/${item.objectId}`
      );

      this.setState((prevState) => {
        const items = prevState.items.slice();
        items.splice(index, 1);
        return { items };
      });
    } catch (error) {
      // handle error
      console.error(error);
    }
  };

  render() {
    return (
      <div className="container-fluid">
        <h3 className="mb-3">Home</h3>

        <div style={{ maxWidth: 700 }}>
          <form onSubmit={this.handleSubmit}>
            <div className="form-row">
              <div className="col-10">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Item"
                  value={this.state.text}
                  onChange={this.handleTextChange}
                />
              </div>
              <div className="col-2">
                <button type="submit" className="btn btn-primary btn-block">
                  Add
                </button>
              </div>
            </div>
          </form>

          <div className="mt-3">
            {this.state.items.map((o, index) => (
              <TodoItem
                key={o.objectId}
                data={o}
                onCheck={() => this.onCheck(index)}
                onEdit={(value) => this.onEdit(index, value)}
                onDelete={() => this.onDelete(index)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}
