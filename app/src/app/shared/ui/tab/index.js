import React from 'react'
import classNames from 'classnames'

const Tab = ({ items, active, onSearch }) => {
  return (
    <ul className="nav nav-tabs tab-container-small">
      {(items || []).map((item, index) => {
        return (
          <li key={index} className={(item.key === active) ? 'active' : 'pointer'}>
            <a
              className={classNames({ box: item.key === active })}
              onClick={item.onClick}
            >
              {item.text}
            </a>
          </li>
        )
      })}
      {!!onSearch &&
        <input
          type="text"
          className="floatRight search-input"
          placeholder="Search #ref"
          onChange={onSearch}
        />
      }
    </ul>
  )
}

Tab.propTypes = {
  items: React.PropTypes.any.isRequired,
  active: React.PropTypes.any.isRequired,
  onSearch: React.PropTypes.func,
}

export default Tab;
