import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { BiMailSend } from 'react-icons/bi'
import styles from './Form.module.css'
import { useAddCommentMutation } from '../../redux/commentApi'

export const Form = () => {
  const [author, setAuthor] = useState('')
  const [content, setContent] = useState('')
  const [addComment, { isError, isLoading }] = useAddCommentMutation()

  const onHandleChange = (e) => {
    const { name, value } = e.target
    switch (name) {
      case 'name':
        setAuthor(value)
        break
      case 'text':
        setContent(value)
        break
      default:
        break
    }
  }

  const onHandleSubmit = (e) => {
    e.preventDefault()
    addComment({ author, content })
    setAuthor('')
    setContent('')
  }

  return (
    <div className={styles.formWrapper}>
      {isError && <p>There is an error. Please try again.</p>}
      <form className={styles.form} onSubmit={onHandleSubmit}>
        <label className={styles.label}>
          <span className={styles.labelName}>Full name</span>
          <input
            type='text'
            name='name'
            className={styles.input}
            value={author}
            onChange={onHandleChange}
          />
        </label>

        <label className={styles.label}>
          <span className={styles.labelName}>Your comment</span>
          <textarea
            className={styles.input}
            name='text'
            rows='5'
            value={content}
            onChange={onHandleChange}
          ></textarea>
        </label>

        <button className={styles.formBtn}>
          <BiMailSend className={styles.icon} />
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
