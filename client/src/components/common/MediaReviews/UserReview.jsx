import { LoadingButton } from '@mui/lab';
import { Divider, Stack, TextField, Typography } from '@mui/material';
import TextAvatar from '../TextAvatar/TextAvatar';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const UserReview = ({ user, content, setContent, onRequest, onAddReview }) => {
  return (
    user && (
      <>
        <Divider />
        <Stack direction="row" spacing={2}>
          <TextAvatar text={user.displayName} />
          <Stack spacing={2} flexGrow={1}>
            <Typography variant="h6" fontWeight="700">
              {user.displayName}
            </Typography>
            <TextField
              value={content}
              onChange={(e) => setContent(e.target.value)}
              multiline
              rows={4}
              placeholder="Write your review"
              variant="outlined"
            />
            <LoadingButton
              variant="contained"
              size="large"
              sx={{ width: 'max-content' }}
              startIcon={<SendOutlinedIcon />}
              loadingPosition="start"
              loading={onRequest}
              onClick={onAddReview}
            >
              post
            </LoadingButton>
          </Stack>
        </Stack>
      </>
    )
  );
};

export default UserReview;
