const uiMediaItem = {
  favoriteIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    fontSize: '2rem',
  },
  backDrop: {
    opacity: { xs: 1, md: 0 },
    transition: 'all 0.3s ease',
    width: '100%',
    height: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundImage:
      'linear-gradient(to top, rgba(10,32,41,1), rgba(0,0,0,0)) ',
  },
  playButton: {
    display: { xs: 'none', md: 'flex' },
    opacity: 0,
    transition: 'all 0.3s ease',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '& .MuiButton-startIcon': { marginRight: '-4px' },
  },
};

export default uiMediaItem;
