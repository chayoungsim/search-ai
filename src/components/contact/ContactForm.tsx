import { useState } from "react"
import type { ChangeEvent, FormEvent } from "react"

const BUDGET_OPTIONS = [
  "미정 / 협의 필요",
  "500만원 미만",
  "500만원 ~ 1,000만원",
  "1,000만원 ~ 3,000만원",
  "3,000만원 ~ 5,000만원",
  "5,000만원 이상",
]

const ACCEPTED_FILE_TYPES =
  ".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.jpg,.jpeg,.png"

const formatFileSize = (bytes: number) => {
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

const ContactForm = () => {
  const [files, setFiles] = useState<File[]>([])
  const [submitted, setSubmitted] = useState(false)

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selected = event.target.files ? Array.from(event.target.files) : []
    setFiles((prev) => [...prev, ...selected])
    event.target.value = ""
  }

  const handleFileRemove = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setFiles([])
    setSubmitted(false)
  }

  if (submitted) {
    return (
      <section className="section contact-form-section">
        <div className="container">
          <div className="form-success">
            <span className="form-success-icon" aria-hidden="true">
              ✓
            </span>
            <h2>상담 신청이 접수되었습니다</h2>
            <p>
              남겨주신 내용을 확인한 뒤, 영업일 기준 1~2일 이내에 담당자가
              연락드리겠습니다.
            </p>
            <button
              type="button"
              className="cta-button cta-button-secondary"
              onClick={handleReset}
            >
              새 문의 작성하기
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section contact-form-section">
      <div className="container">
        <form className="contact-form" onSubmit={handleSubmit} noValidate={false}>
          <div className="form-grid">
            <div className="form-field">
              <label className="form-label" htmlFor="name">
                고객명(담당자)
                <span className="form-required" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="form-input"
                placeholder="홍길동"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="phone">
                연락처
                <span className="form-required" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                className="form-input"
                placeholder="010-1234-5678"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="email">
                이메일
                <span className="form-required" aria-hidden="true">
                  *
                </span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="form-input"
                placeholder="name@company.com"
                required
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="company">
                회사명/단체명
                <span className="form-optional"></span>
              </label>
              <input
                id="company"
                name="company"
                type="text"
                className="form-input"
                placeholder="(주)회사명"
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="website">
                현재 웹사이트 URL
                <span className="form-optional"></span>
              </label>
              <input
                id="website"
                name="website"
                type="url"
                className="form-input"
                placeholder="https://example.com"
              />
            </div>

            <div className="form-field">
              <label className="form-label" htmlFor="budget">
                예산
                <span className="form-optional"></span>
              </label>
              <select id="budget" name="budget" className="form-select" defaultValue="">
                <option value="" disabled>
                  예산 범위를 선택해 주세요
                </option>
                {BUDGET_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field form-field--full">
              <label className="form-label" htmlFor="message">
                문의 내용
                <span className="form-optional">선택</span>
              </label>
              <textarea
                id="message"
                name="message"
                className="form-textarea"
                placeholder="현재 겪고 계신 문제나 궁금하신 점을 자유롭게 남겨주세요."
                rows={6}
              />
            </div>

            <div className="form-field form-field--full">
              <label className="form-label" htmlFor="attachment">
                파일첨부
                <span className="form-optional">선택</span>
              </label>

              <label className="form-file" htmlFor="attachment">
                <span className="form-file-icon" aria-hidden="true">
                  📎
                </span>
                <span className="form-file-text">
                  클릭해서 파일을 선택하거나 이곳으로 끌어다 놓으세요
                </span>
                <span className="form-file-hint">
                  PDF, DOC, PPT, XLS, JPG, PNG (여러 개 선택 가능)
                </span>
                <input
                  id="attachment"
                  name="attachment"
                  type="file"
                  className="form-file-input"
                  accept={ACCEPTED_FILE_TYPES}
                  multiple
                  onChange={handleFileChange}
                />
              </label>

              {files.length > 0 && (
                <ul className="form-file-list">
                  {files.map((file, index) => (
                    <li className="form-file-item" key={`${file.name}-${index}`}>
                      <span className="form-file-name">{file.name}</span>
                      <span className="form-file-size">
                        {formatFileSize(file.size)}
                      </span>
                      <button
                        type="button"
                        className="form-file-remove"
                        onClick={() => handleFileRemove(index)}
                        aria-label={`${file.name} 삭제`}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="form-submit">
            <button type="submit" className="cta-button">
              상담 신청하기
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default ContactForm
