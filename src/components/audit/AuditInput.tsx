import type { FormEvent } from "react"
import { Search } from "lucide-react"

interface AuditInputProps {
  onSubmit: (rawUrl: string) => void
  error: string | null
}

const AuditInput = ({ onSubmit, error }: AuditInputProps) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const field = event.currentTarget.elements.namedItem("url") as HTMLInputElement | null
    onSubmit(field?.value ?? "")
  }

  return (
    <div className="audit-input">
      <p className="section-label">AI Search Checker</p>

      <h1 className="audit-input-title">SEO · AEO · GEO 자동진단</h1>

      <p className="audit-input-lead">
        웹사이트 주소만 입력하면 검색·AI 답변·생성형 AI 노출 최적화 상태를 한 번에
        점검해 점수와 개선 항목으로 보여드립니다.
      </p>

      <form className="audit-input-form" onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="url"
          className="audit-input-field"
          placeholder="https://example.com"
          autoComplete="url"
          inputMode="url"
          aria-label="진단할 웹사이트 URL"
          aria-invalid={error ? true : undefined}
        />

        <button type="submit" className="cta-button">
          진단
          <Search size={16} aria-hidden="true" />
        </button>
      </form>

      {error && (
        <p className="audit-input-error" role="alert" aria-live="polite">
          {error}
        </p>
      )}

      <p className="audit-input-note">
        입력하신 URL과 점검 결과는 서버에 저장되지 않습니다.
      </p>
    </div>
  )
}

export default AuditInput
