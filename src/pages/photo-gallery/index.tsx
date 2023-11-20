import { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { useInView } from 'react-hook-inview';
import toast from 'react-hot-toast';

import { Loader } from '@/components';
import { useGetPhotosQuery } from '@/store/services/photo';
import { AppRoutes } from '@/constants/router.ts';

const PhotoGalleryPage: FC = () => {
  const [query, setQuery] = useState<string | undefined>();
  const navigate = useNavigate();
  const [lastImgRef, isVisible] = useInView();
  const { data, isLoading, isError, error } = useGetPhotosQuery(query);

  useEffect(() => {
    if (isVisible && data?.photos.length) {
      setQuery(data?.next_page);
    }
  }, [isVisible]);

  useEffect(() => {
    if (isError && error && 'data' in error) {
      toast.error(error.data as string);
    }
  }, [isError]);

  return (
    <div className="h-full w-full relative flex justify-center p-8 overflow-y-auto">
      <ResponsiveMasonry columnsCountBreakPoints={{ 0: 1, 600: 2, 800: 3 }} className="w-full max-w-[1000px]">
        <Masonry gutter="20px" className="w-full">
          {!!data &&
            data.photos.map((photo, index) => (
              <img
                key={photo.id}
                ref={index === data.photos.length - 1 ? lastImgRef : undefined}
                src={photo.src.medium}
                alt={photo.alt}
                className="cursor-pointer transition-all hover:scale-105"
                onClick={() => navigate(AppRoutes.PHOTO_GALLERY_DETAILS.replace(':photoId', photo.id.toString()))}
              />
            ))}
        </Masonry>
      </ResponsiveMasonry>
      {isLoading && <Loader />}
    </div>
  );
};

export default PhotoGalleryPage;
