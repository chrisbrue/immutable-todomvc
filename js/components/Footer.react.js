/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');
var PureRenderMixin = require('react/addons').addons.PureRenderMixin;
var ReactPropTypes = React.PropTypes;
var TodoActions = require('../actions/TodoActions');

var Footer = React.createClass({
  mixins: [PureRenderMixin],
  propTypes: {
    allTodos: ReactPropTypes.object.isRequired
  },

  /**
   * @return {object}
   */
  render: function() {
    var allTodos = this.props.allTodos;
    var total = allTodos.size;
    var hasHistory = this.props.hasHistory;

    if (total === 0 && !hasHistory) {
      return null;
    }

    var completed = 0;
    allTodos.forEach(function(todo) {
      if(todo.complete) {
        completed++;
      }
    });

    var itemsLeft = total - completed;
    var itemsLeftPhrase = itemsLeft === 1 ? ' item ' : ' items ';
    itemsLeftPhrase += 'left';

    // Undefined and thus not rendered if no completed items are left.
    var clearCompletedButton;
    if (completed) {
      clearCompletedButton =
        <button
          id="clear-completed"
          onClick={this._onClearCompletedClick}>
          Clear completed ({completed})
        </button>;
    }

    // Undefined and thus not rendered if no history is available.
    var undoButton;
    if (hasHistory) {
      undoButton =
        <button
          id="clear-completed"
          onClick={this._onUndoClick}>
          Undo
        </button>
    }

    return (
      <footer id="footer">
        <span id="todo-count">
          <strong>
            {itemsLeft}
          </strong>
          {itemsLeftPhrase}
        </span>
        {undoButton}
        {clearCompletedButton}
      </footer>
    );
  },

  /**
   * Event handler to delete all completed TODOs
   */
  _onClearCompletedClick: function() {
    TodoActions.destroyCompleted();
  },

  /**
   * Event handler to undo an action
   */
  _onUndoClick: function() {
    TodoActions.undo();
  }

});

module.exports = Footer;