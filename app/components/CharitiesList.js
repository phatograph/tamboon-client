import React from 'react';
import style from './../../css/style.css';

const CharitiesList = React.createClass({
  render() {
    return (
      <ul className={style.list}>
        {this.props.charities.map((charity, i) => {
          return (
            <li key={i}>
              <input type="radio" name="charity" ref="charity" value={charity.id} id={`c${charity.id}`} />
              <label htmlFor={`c${charity.id}`}>{charity.name}</label>
            </li>
          );
        })}
        <li>
          <input type="radio" name="charity" ref="charity" value="-1" id="c-1" defaultChecked />
          <label htmlFor="c-1">Random</label>
        </li>
      </ul>
    );
  }
});

export default CharitiesList;
