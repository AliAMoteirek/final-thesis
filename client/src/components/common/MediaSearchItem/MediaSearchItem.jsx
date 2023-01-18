import { LoadingButton } from '@mui/lab';
import { Box, Stack, TextField } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import mediaApi from '../../../api/modules/mediaApi';
import uiConfigs from '../../../configs/uiConfigs';
import MediaGrid from '../MediaGrid/MediaGrid';
import MediaSearchMediatypes from './MediaSearchMediatypes';

const mediaTypes = ['movie', 'tv', 'people'];
let timer;
const timeout = 500;

const MediaSearchItem = () => {
  const [query, setQuery] = useState('');
  const [onSearch, setOnSearch] = useState(false);
  const [mediaType, setMediaType] = useState(mediaTypes[0]);
  const [medias, setMedias] = useState([]);
  const [page, setPage] = useState(1);

  const search = useCallback(async () => {
    setOnSearch(true);

    const { response, error } = await mediaApi.search({
      mediaType,
      query,
      page,
    });

    setOnSearch(false);

    if (error) toast.error(error.message);

    if (response) {
      if (page > 1) setMedias((m) => [...m, ...response.results]);
      else setMedias([...response.results]);
    }
  }, [mediaType, page, query]);

  useEffect(() => {
    if (query.trim().length === 0) {
      setMedias([]);
      setPage(1);
    } else search();
  }, [query, search, mediaType, page]);

  useEffect(() => {
    setMedias([]);
    setPage(1);
  }, [mediaType]);

  const onCategoryChange = (selectCategory) => setMediaType(selectCategory);

  const onQueryChange = (e) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };
  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Stack spacing={2}>
        <MediaSearchMediatypes
          mediaType={mediaType}
          mediaTypes={mediaTypes}
          onCategoryChange={onCategoryChange}
        />

        <TextField
          color="success"
          placeholder="Search ..."
          sx={{ width: '100%' }}
          autoFocus
          onChange={onQueryChange}
        />

        <MediaGrid medias={medias} mediaType={mediaType} />

        {medias.length > 0 && (
          <LoadingButton loading={onSearch} onClick={() => setPage(page + 1)}>
            load more
          </LoadingButton>
        )}
      </Stack>
    </Box>
  );
};

export default MediaSearchItem;
