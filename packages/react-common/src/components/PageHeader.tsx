import Box from './Box';
import Heading from './Heading';
import Paragraph from './Paragraph';
import * as React from 'react';

export type PageHeaderProps = {
  heading: string,
  description?: string,
};

const PageHeader:React.SFC<PageHeaderProps> = ({ heading, description }: PageHeaderProps) => (
  <Box
    borderBottomWidth={2}
    borderStyle="solid"
    marginBottom={2.5}
    marginTop={3}
    paddingBottom={0.5}
  >
    <Heading size={2} marginBottom={0}>
      {heading}
    </Heading>
    {description &&
      <Paragraph marginBottom={0} maxWidth={28}>{description}</Paragraph>}
  </Box>
);

export default PageHeader;
