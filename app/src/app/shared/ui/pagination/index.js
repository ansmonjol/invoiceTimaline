import React from 'react'
import { Pagination as BootStrapPagination } from 'react-bootstrap';
import { PAGINATION_ITEMS } from 'src/parameters'

export default class Pagination extends React.Component {

  static propTypes = {
    total: React.PropTypes.any,
    _current: React.PropTypes.any.isRequired,
    onClick: React.PropTypes.any.isRequired,
    maxButtons: React.PropTypes.any,
  }

  render() {
    const maxButtons = this.props.maxButtons || 5;
    const total = this.props.total;

    if (!!total && total <= Math.ceil(total / PAGINATION_ITEMS)) return null;

    return (
      <BootStrapPagination
        prev={total > maxButtons}
        next={total > maxButtons}
        first={total > maxButtons + 5}
        last={total > maxButtons + 5}
        ellipsis={total > maxButtons + 5}
        boundaryLinks
        items={total}
        maxButtons={maxButtons}
        activePage={this.props._current}
        onSelect={this.props.onClick}
      />
    )
  }
}
