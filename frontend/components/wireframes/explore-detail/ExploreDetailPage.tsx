'use client'

import { FormEvent, useMemo, useState } from 'react'
import { useArrowMenuNavigation } from '@/components/wireframes/shared/useArrowMenuNavigation'
import { initialComments } from './data'
import DetailCommentsSection from './DetailCommentsSection'
import DetailNavbar from './DetailNavbar'
import DetailReportSection from './DetailReportSection'
import DetailSidebar from './DetailSidebar'
import { CommentItem } from './types'

export default function ExploreDetailPage() {
  const [voted, setVoted] = useState(false)
  const [votes, setVotes] = useState(342)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<CommentItem[]>(initialComments)
  const [sortMode, setSortMode] = useState<'recent' | 'votes'>('recent')
  const { itemRefs, onKeyDown } = useArrowMenuNavigation<HTMLAnchorElement>()

  const sortedComments = useMemo(() => {
    if (sortMode === 'votes') {
      return [...comments].sort((a, b) => b.likes - a.likes)
    }
    return comments
  }, [comments, sortMode])

  const submitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const trimmed = newComment.trim()
    if (!trimmed) return

    setComments((previous) => [
      {
        id: String(Date.now()),
        author: 'Usuario',
        avatar: 'U',
        time: 'Justo ahora',
        text: trimmed,
        likes: 0,
      },
      ...previous,
    ])
    setNewComment('')
  }

  const likeComment = (id: string) => {
    setComments((previous) =>
      previous.map((comment) =>
        comment.id === id ? { ...comment, likes: comment.likes + 1 } : comment
      )
    )
  }

  const voteReport = () => {
    if (!voted) {
      setVoted(true)
      setVotes((previous) => previous + 1)
    }
  }

  return (
    <div className="detail-page">
      <DetailNavbar
        onKeyDown={onKeyDown}
        setItemRef={(index, element) => {
          itemRefs.current[index] = element
        }}
      />

      <div className="main-content">
        <div className="report-detail">
          <DetailReportSection voted={voted} votes={votes} onVote={voteReport} />
          <DetailCommentsSection
            comments={sortedComments}
            newComment={newComment}
            sortMode={sortMode}
            onSortChange={setSortMode}
            onNewCommentChange={setNewComment}
            onSubmit={submitComment}
            onLikeComment={likeComment}
          />
        </div>

        <DetailSidebar votes={votes} />
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');

        .detail-page {
          --azul-institucional: #0f4c75;
          --azul-medio: #3282b8;
          --verde-estable: #1b9c85;
          --rojo-institucional: #e74646;
          --gris-azulado: #e8eef1;
          --negro-carbon: #1a1a1d;
          --blanco: #ffffff;
          font-family: 'IBM Plex Sans', sans-serif;
          background: var(--gris-azulado);
          color: var(--negro-carbon);
          line-height: 1.6;
          min-height: 100vh;
        }

        .navbar {
          background: var(--azul-institucional);
          padding: 1rem 0;
          box-shadow: 0 4px 12px rgba(15, 76, 117, 0.2);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .nav-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          color: var(--blanco);
          font-size: 1.75rem;
          font-weight: 700;
          font-family: 'Bebas Neue', cursive;
          letter-spacing: 1px;
          text-decoration: none;
        }

        .back-link {
          color: var(--blanco);
          text-decoration: none;
          font-weight: 500;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: color 0.3s ease;
        }

        .back-link:hover {
          color: var(--verde-estable);
        }

        .main-content {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }

        .report-detail {
          background: var(--blanco);
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(26, 26, 29, 0.08);
        }

        .report-header {
          background: linear-gradient(135deg, var(--azul-institucional) 0%, var(--azul-medio) 100%);
          color: var(--blanco);
          padding: 2rem;
        }

        .status-badge {
          display: inline-block;
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 1rem;
        }

        .badge-urgente {
          background: var(--rojo-institucional);
        }

        .report-title {
          font-family: 'Bebas Neue', cursive;
          font-size: 2.5rem;
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }

        .report-meta {
          display: flex;
          gap: 2rem;
          font-size: 0.95rem;
          opacity: 0.95;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .report-image-container {
          width: 100%;
          height: 400px;
          background: var(--gris-azulado);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 8rem;
        }

        .report-content {
          padding: 2rem;
        }

        .report-description {
          font-size: 1.1rem;
          line-height: 1.8;
          margin-bottom: 2rem;
          color: var(--negro-carbon);
        }

        .report-actions {
          display: flex;
          gap: 1rem;
          padding: 1.5rem 2rem;
          background: var(--gris-azulado);
          flex-wrap: wrap;
        }

        .vote-button {
          background: var(--azul-medio);
          color: var(--blanco);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          transition: all 0.3s ease;
          font-size: 1rem;
        }

        .vote-button:hover {
          background: var(--azul-institucional);
          transform: scale(1.05);
        }

        .vote-button.voted {
          background: var(--verde-estable);
        }

        .vote-count {
          font-weight: 700;
          font-size: 1.2rem;
        }

        .action-btn {
          background: var(--blanco);
          color: var(--azul-medio);
          border: 2px solid var(--azul-medio);
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .action-btn:hover {
          background: var(--azul-medio);
          color: var(--blanco);
        }

        .comments-section {
          padding: 2rem;
          border-top: 3px solid var(--gris-azulado);
        }

        .comments-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .comments-title {
          font-family: 'Bebas Neue', cursive;
          font-size: 2rem;
          color: var(--azul-institucional);
          letter-spacing: 1px;
        }

        .comments-count {
          color: var(--azul-medio);
          font-weight: 600;
        }

        .comments-sort {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }

        .sort-btn {
          background: var(--blanco);
          border: 2px solid var(--gris-azulado);
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 0.9rem;
          color: var(--negro-carbon);
        }

        .sort-btn.active {
          background: var(--azul-medio);
          color: var(--blanco);
          border-color: var(--azul-medio);
        }

        .new-comment-form {
          background: var(--gris-azulado);
          padding: 1.5rem;
          border-radius: 12px;
          margin-bottom: 2rem;
        }

        .comment-avatar {
          width: 45px;
          height: 45px;
          background: var(--azul-medio);
          color: var(--blanco);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 1.2rem;
          flex-shrink: 0;
        }

        .comment-form-wrapper {
          display: flex;
          gap: 1rem;
        }

        .comment-form-content {
          flex: 1;
        }

        .comment-textarea {
          width: 100%;
          padding: 1rem;
          border: 2px solid var(--gris-azulado);
          border-radius: 8px;
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 0.95rem;
          resize: vertical;
          min-height: 100px;
          transition: border-color 0.3s ease;
          background: var(--blanco);
        }

        .comment-textarea:focus {
          outline: none;
          border-color: var(--azul-medio);
          box-shadow: 0 0 0 3px rgba(50, 130, 184, 0.1);
        }

        .comment-form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
          margin-top: 1rem;
        }

        .btn-cancel {
          background: var(--blanco);
          color: var(--negro-carbon);
          border: 2px solid var(--gris-azulado);
          padding: 0.6rem 1.2rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-submit {
          background: var(--verde-estable);
          color: var(--blanco);
          border: none;
          padding: 0.6rem 1.5rem;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .btn-submit:disabled {
          background: var(--gris-azulado);
          cursor: not-allowed;
          opacity: 0.6;
        }

        .comments-list {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .comment {
          display: flex;
          gap: 1rem;
          padding: 1.5rem;
          background: var(--blanco);
          border-radius: 12px;
          border: 2px solid var(--gris-azulado);
          transition: all 0.3s ease;
        }

        .comment:hover {
          border-color: var(--azul-medio);
          box-shadow: 0 4px 12px rgba(50, 130, 184, 0.1);
        }

        .comment-body {
          flex: 1;
        }

        .comment-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 0.75rem;
        }

        .comment-author {
          font-weight: 700;
          color: var(--azul-institucional);
          font-size: 1rem;
        }

        .comment-time {
          color: #666;
          font-size: 0.85rem;
        }

        .comment-text {
          color: var(--negro-carbon);
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .comment-actions {
          display: flex;
          gap: 1.5rem;
          align-items: center;
        }

        .comment-action-btn {
          background: none;
          border: none;
          color: #666;
          cursor: pointer;
          font-size: 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.4rem;
          transition: color 0.3s ease;
          font-weight: 500;
        }

        .comment-action-btn:hover {
          color: var(--azul-medio);
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .sidebar-card {
          background: var(--blanco);
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(26, 26, 29, 0.08);
        }

        .sidebar-title {
          font-family: 'Bebas Neue', cursive;
          font-size: 1.5rem;
          color: var(--azul-institucional);
          margin-bottom: 1rem;
          letter-spacing: 1px;
        }

        .info-item {
          display: flex;
          justify-content: space-between;
          padding: 0.75rem 0;
          border-bottom: 1px solid var(--gris-azulado);
        }

        .info-item:last-child {
          border-bottom: none;
        }

        .info-label {
          color: #666;
          font-size: 0.9rem;
        }

        .info-value {
          font-weight: 600;
          color: var(--negro-carbon);
        }

        .status-high {
          color: var(--rojo-institucional);
        }

        .map-placeholder {
          width: 100%;
          height: 200px;
          background: var(--gris-azulado);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 3rem;
        }

        .location-text {
          margin-top: 1rem;
          color: #666;
          font-size: 0.9rem;
        }

        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  )
}
