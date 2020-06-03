import React from 'react';
import cx from 'clsx';
import Box, { BoxProps } from '@material-ui/core/Box';
import { Position, useFlexStyles, useGutterProps } from './core';

export type ItemProps = {
  position?: Position;
  'data-flexindex'?: number;
  grow?: boolean | number;
  shrink?: number;
  cssPosition?: 'fixed' | 'absolute' | 'sticky' | 'static' | 'relative';
} & BoxProps;

const Item = ({
  className,
  position,
  cssPosition,
  grow,
  shrink,
  'data-flexindex': (itemIndex : Number),
  ...props
}: ItemProps) => {
  const gutterProps = useGutterProps(itemIndex);
  const flexStyles = useFlexStyles(position);
  return (
    <Box
      className={cx('FlexItem', className)}
      {...flexStyles}
      {...gutterProps}
      flexGrow={typeof grow === 'boolean' ? 1 : grow}
      flexShrink={shrink}
      {...props}
      position={cssPosition}
    />
  );
};

export default Item;