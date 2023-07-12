import React, { useReducer, useEffect, useState } from 'react';

const commentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      return action.payload;
    case 'ADD_COMMENT':
      return [...state, action.payload];
    case 'UPDATE_COMMENT':
      return state.map((comment) =>
        comment.id === action.payload.id ? action.payload : comment
      );
    case 'DELETE_COMMENT':
      return state.filter((comment) => comment.id !== action.payload);
    default:
      return state;
  }
};

const CommentSection = () => {
  const [comments, dispatch] = useReducer(commentReducer, []);
  const [name, setName] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch('http://localhost:3001/comments');
      const data = await response.json();
      dispatch({ type: 'SET_COMMENTS', payload: data });
    } catch (error) {
      console.error('Erreur lors de la récupération des commentaires', error);
    }
  };

  const addComment = async () => {
    try {
      const response = await fetch('http://localhost:3001/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, content }),
      });
      const data = await response.json();
      dispatch({ type: 'ADD_COMMENT', payload: data });
      setName('');
      setContent('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout du commentaire', error);
    }
  };

  const updateComment = async (comment) => {
    try {
      const response = await fetch(
        `http://localhost:3001/comments/${comment.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(comment),
        }
      );
      if (response.ok) {
        dispatch({ type: 'UPDATE_COMMENT', payload: comment });
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commentaire', error);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/comments/${commentId}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        dispatch({ type: 'DELETE_COMMENT', payload: commentId });
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire', error);
    }
  };

  return (
    <div>
      <h1>Commentaires</h1>
      <form onSubmit={addComment}>
        <div>
          <label htmlFor="name">Nom :</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Contenu :</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Ajouter</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <h3>{comment.name}</h3>
            <p>{comment.content}</p>
            <button onClick={() => updateComment(comment)}>
              Modifier
            </button>
            <button onClick={() => deleteComment(comment.id)}>
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CommentSection;
