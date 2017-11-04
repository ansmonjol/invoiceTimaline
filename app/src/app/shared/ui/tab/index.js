import React from 'react'
import classNames from 'classnames'

const Tab = ({ items, active }) => {
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
    </ul>
  )
}

Tab.propTypes = {
  items: React.PropTypes.any,
  active: React.PropTypes.any
}

export default Tab;
