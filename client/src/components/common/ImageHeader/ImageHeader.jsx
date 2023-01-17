import { Box, useTheme } from '@mui/material';
import uiImageHeader from './uiImageHeader';

const ImageHeader = ({ imgPath }) => {
  const theme = useTheme();
  return <Box sx={{ ...uiImageHeader.container(imgPath, theme) }} />;
};

export default ImageHeader;
