/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import classNames from 'classnames';

import './TodoList.scss';

import { Todo } from '../../react-app-env';

type Props = {
  todos: Todo[];
  selectedUserId: number;
  onSelect: (userId: number) => void;
};

type State = {
  sortBy: string,
  query: string,
};

export class TodoList extends React.PureComponent<Props, State> {
  state: State = {
    sortBy: 'all',
    query: '',
  };

  handleChanges = (
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;

    this.setState({
      [name]: value,
    } as State);
  };

  render() {
    const { todos, selectedUserId, onSelect } = this.props;
    const { sortBy, query } = this.state;

    const filtered = todos.filter((todo) => {
      if (query) {
        return (
          todo.title !== null && todo.title.toLowerCase().includes(query.toLowerCase())
        );
      }

      return todo;
    }).filter((todo) => {
      if (sortBy === 'active') {
        return !todo.completed;
      }

      if (sortBy === 'completed') {
        return todo.completed;
      }

      return todo;
    });

    return (
      <div className="TodoList">
        <h2>Todos:</h2>

        <div className="TodoList__list-container">
          <input
            type="text"
            name="query"
            value={query}
            onChange={this.handleChanges}
            placeholder="Search"
          />

          <select
            name="sortBy"
            value={sortBy}
            onChange={this.handleChanges}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>

          <ul className="TodoList__list">
            {filtered.map((todo) => (
              <li
                key={todo.id}
                className={classNames(
                  'TodoList__item',
                  {
                    'TodoList__item--checked': todo.completed,
                    'TodoList__item--unchecked': !todo.completed,
                  },
                )}
              >
                <label htmlFor="todoStatus">
                  <input type="checkbox" checked={todo.completed} readOnly />
                  <p>{todo.title}</p>
                </label>

                <button
                  className={classNames('TodoList__user-button button',
                    { 'TodoList__user-button--selected': todo.userId === selectedUserId })}
                  type="button"
                  onClick={() => onSelect(todo.userId)}
                >
                  {`User # ${todo.userId}`}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
