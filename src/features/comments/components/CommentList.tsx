import { useEffect, useReducer } from 'react';
import StarRating from '../../../components/StarRating';
import apiClient, { getApiAssetUrl } from '../../../lib/api-client';
import { formatFrenchDateTime } from '../../../lib/date-format';
import type { Member } from '../../members/member.types';
import type { Comment } from '../comment.types';

type CommentsState = {
  loadingComments: boolean;
  errorComments: string;
  comments: Comment[];
  loadingMembers: boolean;
  errorMembers: string;
  members: Member[];
};

type CommentsAction =
  | { type: 'FETCH_COMMENTS_SUCCESS'; payload: Comment[] }
  | { type: 'FETCH_COMMENTS_ERROR' }
  | { type: 'FETCH_MEMBERS_SUCCESS'; payload: Member[] }
  | { type: 'FETCH_MEMBERS_ERROR' };

function CommentList() {
  const initialState: CommentsState = {
    loadingComments: true,
    errorComments: '',
    comments: [],
    loadingMembers: true,
    errorMembers: '',
    members: [],
  };

  const reducer = (
    state: CommentsState,
    action: CommentsAction
  ): CommentsState => {
    switch (action.type) {
      case 'FETCH_COMMENTS_SUCCESS':
        return {
          ...state,
          loadingComments: false,
          comments: action.payload,
          errorComments: '',
        };
      case 'FETCH_COMMENTS_ERROR':
        return {
          ...state,
          loadingComments: false,
          errorComments: 'Something went wrong with comments!',
        };
      case 'FETCH_MEMBERS_SUCCESS':
        return {
          ...state,
          loadingMembers: false,
          members: action.payload,
          errorMembers: '',
        };
      case 'FETCH_MEMBERS_ERROR':
        return {
          ...state,
          loadingMembers: false,
          errorMembers: 'Something went wrong with members!',
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    apiClient
      .get<Comment[]>('/comments', { withCredentials: true })
      .then((response) => {
        dispatch({ type: 'FETCH_COMMENTS_SUCCESS', payload: response.data });
      })
      .catch(() => {
        dispatch({ type: 'FETCH_COMMENTS_ERROR' });
      });

    apiClient
      .get<Member[]>('/memberinfos', { withCredentials: true })
      .then((response) => {
        dispatch({ type: 'FETCH_MEMBERS_SUCCESS', payload: response.data });
      })
      .catch(() => {
        dispatch({ type: 'FETCH_MEMBERS_ERROR' });
      });
  }, []);

  return (
    <div className="avis">
      {state.loadingComments || state.loadingMembers
        ? 'Loading...'
        : state.comments.map((comment, index) => (
            <div className="card" key={index}>
              <div className="card-body">
                {state.members.map((member) => {
                  if (member._id === comment.memberId) {
                    return (
                      <div key={member._id}>
                        <img
                          src={getApiAssetUrl(member.imagename)}
                          alt="Membre"
                          className="rounded-circle"
                        />
                        <h3>
                          {member.firstname} {member.lastname}
                        </h3>
                      </div>
                    );
                  }
                  return null;
                })}
                <StarRating
                  name={`rating-${comment.id ?? index}`}
                  value={comment.ratingStars}
                  readOnly
                />
                <p className="card-text">{comment.content}</p>
                <p className="text-secondary card-text">
                  {formatFrenchDateTime(comment.creationDate)}
                </p>
              </div>
            </div>
          ))}
    </div>
  );
}

export default CommentList;
