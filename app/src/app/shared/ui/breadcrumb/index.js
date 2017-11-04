import React from 'react'
import { browserHistory } from 'react-router'
import { If, Then, Else } from 'react-if'

export default class Breadcrumb extends React.Component {
  static propTypes = {
    data: React.PropTypes.any
  }
  render() {
    return (
      <ol className="breadcrumb bread-primary">
        {(this.props.data || []).map((row, index) => {
          return (
            <li key={index}>
              <If condition={row.active !== true}>
                <Then>
                  <a onClick={() => browserHistory.push(row.ref === '/' ? '/' : (`/${row.ref}`))}>{row.displayName}</a>
                </Then>
                <Else>
                  <span>{row.displayName}</span>
                </Else>
              </If>
            </li>
          )
        })}
      </ol>
    )
  }
}
