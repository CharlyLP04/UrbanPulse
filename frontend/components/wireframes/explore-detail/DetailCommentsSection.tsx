import { FormEvent } from 'react'
import { CommentItem } from './types'

type DetailCommentsSectionProps = {
  comments: CommentItem[]
  newComment: string
  sortMode: 'recent' | 'votes'
  onSortChange: (mode: 'recent' | 'votes') => void
  onNewCommentChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onLikeComment: (id: string) => void
}

export default function DetailCommentsSection({
  comments,
  newComment,
  sortMode,
  onSortChange,
  onNewCommentChange,
  onSubmit,
  onLikeComment,
}: DetailCommentsSectionProps) {
  return (
    <div className="comments-section">
      <div className="comments-header">
        <div>
          <h2 className="comments-title">Comentarios</h2>
          <span className="comments-count">{comments.length} comentarios</span>
        </div>
        <div className="comments-sort">
          <button
            type="button"
            className={`sort-btn ${sortMode === 'recent' ? 'active' : ''}`}
            onClick={() => onSortChange('recent')}
          >
            Recientes
          </button>
          <button
            type="button"
            className={`sort-btn ${sortMode === 'votes' ? 'active' : ''}`}
            onClick={() => onSortChange('votes')}
          >
            Más votados
          </button>
        </div>
      </div>

      <form className="new-comment-form" onSubmit={onSubmit}>
        <div className="comment-form-wrapper">
          <div className="comment-avatar">U</div>
          <div className="comment-form-content">
            <textarea
              className="comment-textarea"
              placeholder="Comparte tu opinión sobre este reporte..."
              value={newComment}
              onChange={(event) => onNewCommentChange(event.target.value)}
            />
            <div className="comment-form-actions">
              <button type="button" className="btn-cancel" onClick={() => onNewCommentChange('')}>
                Cancelar
              </button>
              <button type="submit" className="btn-submit" disabled={newComment.trim() === ''}>
                Comentar
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-avatar">{comment.avatar}</div>
            <div className="comment-body">
              <div className="comment-header">
                <div>
                  <div className="comment-author">{comment.author}</div>
                  <div className="comment-time">{comment.time}</div>
                </div>
              </div>
              <p className="comment-text">{comment.text}</p>
              <div className="comment-actions">
                <button
                  type="button"
                  className="comment-action-btn"
                  onClick={() => onLikeComment(comment.id)}
                >
                  <span>👍</span>
                  <span>{comment.likes}</span>
                </button>
                <button type="button" className="comment-action-btn">
                  <span>💬</span>
                  <span>Responder</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
