import { FC, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button, Textarea } from '@nextui-org/react';
import { CloseIcon } from '@nextui-org/shared-icons';

import { Loader } from '@/components';
import { useGetPhotoByIdQuery } from '@/store/services/photo';
import {
  AddCommentData,
  useAddCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
} from '@/store/services/comment';
import { selectUser } from '@/store/features/user';
import { useTypedSelector } from '@/store/hooks';
import { AppRoutes } from '@/constants/router.ts';

const PhotoDetailsPage: FC = () => {
  const navigate = useNavigate();
  const user = useTypedSelector(selectUser);
  const { photoId } = useParams<{ photoId: string }>();
  const { data: photo, isLoading: isPhotoLoading, isError: isPhotoError } = useGetPhotoByIdQuery(photoId);
  const { data: comments } = useGetCommentsQuery(photoId);
  const [addComment, { isLoading: isAddCommentLoading, isSuccess: isAddCommentSuccess }] = useAddCommentMutation();
  const [deleteComment, { isLoading: isDeleteCommentLoading }] = useDeleteCommentMutation();

  const isLoading = isPhotoLoading || isAddCommentLoading || isDeleteCommentLoading;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<AddCommentData>({ defaultValues: { photoId: Number(photoId), text: '', author: '' } });

  const onSubmit = (data: AddCommentData) => addComment({ ...data, author: user?.email || '' });

  useEffect(() => {
    if (isPhotoError) {
      navigate(AppRoutes.NOT_FOUND);
    }
  }, [isPhotoError]);

  useEffect(() => {
    if (isAddCommentSuccess) {
      reset();
    }
  }, [isAddCommentSuccess]);

  return (
    <div className="flex h-full w-full p-8 justify-center overflow-y-auto box-border">
      {isLoading && <Loader />}

      <div className="flex flex-col w-full max-w-[1000px] gap-5 relative md:flex-row">
        <img src={photo?.src.portrait} alt={photo?.alt} className="md:max-h-full" />
        <div className="flex flex-col w-full h-full gap-5">
          <div className="flex flex-col gap-3 w-full h-full max-x-full md:overflow-y-auto md:pr-3">
            {comments?.map((comment) => (
              <div key={comment.id} className="flex flex-col rounded-md border-1 p-3 g-3 relative">
                <h1 className="text-xl font-bold txt-overflow">{comment.author}</h1>
                <p>{comment.text}</p>
                {user?.email === comment.author && (
                  <CloseIcon
                    className="absolute top-1 right-1 z-20 cursor-pointer text-red-700 hover:text-red-800"
                    onClick={() => deleteComment(comment.id)}
                  />
                )}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex md:flex-col lg:flex-row gap-5 pb-8 md:pb-0">
            <Textarea label="Comment" {...register('text')} variant="bordered" className="max-w-full" maxRows={3} />
            <Button
              color="secondary"
              className="font-bold h-full md:h-10 lg:h-full disabled:bg-secondary-300"
              disabled={!isDirty}
              type="submit">
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PhotoDetailsPage;
