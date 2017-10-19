import React from 'react';
import { Glyphicon, OverlayTrigger, Popover } from 'react-bootstrap';

export default class FFballPopoverHeader extends React.Component {
  constructor() {
    super();
    this.state = {}
  }

  render() {
    const { header, popoverDescription } = this.props;
    const popoverHoverFocus = (
      <Popover id='popover-trigger-hover-focus' title={header}>
        {popoverDescription}
      </Popover>
    );

    const overLayGlyph = (
      <OverlayTrigger trigger={['hover', 'focus']} placement='bottom' overlay={popoverHoverFocus}>
        <Glyphicon glyph='glyphicon glyphicon-info-sign' style={{color:'royalBlue', fontSize:'50%'}} />
      </OverlayTrigger>
    );

    return (
      <h1>{header} {overLayGlyph}</h1>
    );
  }
}
