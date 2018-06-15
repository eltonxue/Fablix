import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

import './LabelInputStyles.css'

class LabelInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
  }
  onFocus = () => {
    this.setState({selected: true});
  }

  onBlur = () => {
    this.setState({selected: false});
  }

  render() {

    const color = this.state.selected ? "selected" : "";

    return (
      <div className={["label-input-container", color].join(' ')}>
        <p className={["input-label", color].join(' ')}>{this.props.label}</p>
        <div className={["input-container", color].join(' ')}>
          <FontAwesome className={['label-icon', color].join(' ')} name={this.props.name} />
          <input
            className="input-field"
            onChange={this.props.onChange}
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            {...this.props}
          />
        </div>
      </div>
    );
  }
}

export default LabelInput;
