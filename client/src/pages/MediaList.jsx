import { useEffect, useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import mediaApi from '../api/modules/mediaApi';
import HeroSlide from '../components/common/HeroSlide/HeroSlide';
import { setAppState } from '../redux/features/appStateSlice';
import { setGlobalLoading } from '../redux/features/globalLoadingSlice';
import { toast } from 'react-toastify';
import MediaListContent from '../components/common/MediaListContent/MediaListContent';

const MediaList = () => {
  const { mediaType } = useParams();

  const [medias, setMedias] = useState([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [currCategory, setCurrCategory] = useState(0);
  const [currPage, setCurrPage] = useState(1);

  const dispatch = useDispatch();

  const mediaCategories = useMemo(() => ['popular', 'top_rated'], []);

  const category = ['popular', 'top rated'];

  useEffect(() => {
    dispatch(setAppState(mediaType));
    window.scrollTo(0, 0);
  }, [dispatch, mediaType]);

  useEffect(() => {
    const getMedias = async () => {
      if (currPage === 1) dispatch(setGlobalLoading(true));

      setMediaLoading(true);

      const { response, error } = await mediaApi.getList({
        mediaType,
        mediaCategory: mediaCategories[currCategory],
        page: currPage,
      });

      setMediaLoading(false);
      dispatch(setGlobalLoading(false));

      if (error) toast.error(error.message);

      if (response) {
        if (currPage !== 1) setMedias((m) => [...m, ...response.results]);
        else setMedias([...response.results]);
      }
    };

    getMedias();
  }, [currCategory, currPage, dispatch, mediaCategories, mediaType]);

  const onCategoryChange = (categoryIndex) => {
    if (currCategory === categoryIndex) return;

    setMedias([]);
    setCurrPage(1);
    setCurrCategory(categoryIndex);
  };

  const onLoadMore = () => setCurrPage(currPage + 1);

  return (
    <>
      <HeroSlide
        mediaType={mediaType}
        mediaCategory={mediaCategories[currCategory]}
      />

      <MediaListContent
        category={category}
        currCategory={currCategory}
        mediaLoading={mediaLoading}
        mediaType={mediaType}
        medias={medias}
        onCategoryChange={onCategoryChange}
        onLoadMore={onLoadMore}
      />
    </>
  );
};

export default MediaList;
