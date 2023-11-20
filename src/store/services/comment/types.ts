export type Comment = {
  id: number;
  photoId: number;
  text: string;
  author: string;
};

export type AddCommentData = Omit<Comment, 'id'>;
