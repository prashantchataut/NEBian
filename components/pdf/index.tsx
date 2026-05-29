'use client';

import dynamic from 'next/dynamic';

const PdfViewer = dynamic(
  () => import('@/components/pdf/pdf-viewer').then(mod => ({ default: mod.PdfViewer })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[calc(100dvh-3.5rem)]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-[var(--radius-sm)] border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-on-surface-variant">Loading PDF viewer...</p>
        </div>
      </div>
    ),
  }
);

export default PdfViewer;