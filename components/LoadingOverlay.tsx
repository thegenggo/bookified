"use client"

import { Loader2 } from "lucide-react"

const LoadingOverlay = () => {
  return (
    <div className="loading-wrapper" role="status" aria-live="assertive">
      <div className="loading-shadow-wrapper bg-white">
        <div className="loading-shadow">
          <Loader2 className="loading-animation w-12 h-12 text-[#663820]" aria-hidden="true" />
          <p className="loading-title">Synthesizing your book…</p>
          <div className="loading-progress">
            <div className="loading-progress-item">
              <span className="loading-progress-status" aria-hidden="true" />
              <span>Uploading files</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoadingOverlay
