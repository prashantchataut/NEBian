'use client';

import { useState, useCallback } from 'react';
import { ArrowLeft, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Highlighter, Underline, MessageSquarePlus, Eraser, List, Heart, Download, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SUBJECT_LABELS, GRADE_LABELS, RESOURCE_TYPE_LABELS, SUBJECT_COLORS, RESOURCE_TYPE_COLORS, ANNOTATION_COLORS, type PdfAnnotation } from '@/types';

const mockResource = {
  id: '1',
  title: 'Physics Grade 11 Textbook',
  description: 'Complete NEB physics textbook for Grade 11 students covering mechanics, thermodynamics, optics, and modern physics.',
  subject: 'Physics' as const,
  grade: 'Grade11' as const,
  type: 'Textbook' as const,
  downloadCount: 1245,
  pageCount: 320,
};

type Tool = 'highlight' | 'underline' | 'sticky-note' | 'eraser' | null;

export default function ResourceDetailPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(320);
  const [zoom, setZoom] = useState(100);
  const [activeTool, setActiveTool] = useState<Tool>(null);
  const [annotationColor, setAnnotationColor] = useState<string>(ANNOTATION_COLORS[0].value);
  const [showAnnotationSidebar, setShowAnnotationSidebar] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [annotations, setAnnotations] = useState<PdfAnnotation[]>([]);

  const zoomIn = useCallback(() => setZoom(z => Math.min(z + 25, 300)), []);
  const zoomOut = useCallback(() => setZoom(z => Math.max(z - 25, 50)), []);
  const prevPage = useCallback(() => setCurrentPage(p => Math.max(p - 1, 1)), []);
  const nextPage = useCallback(() => setCurrentPage(p => Math.min(p + 1, totalPages)), []);

  const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
    { id: 'highlight', icon: <Highlighter className="h-4 w-4" />, label: 'Highlight' },
    { id: 'underline', icon: <Underline className="h-4 w-4" />, label: 'Underline' },
    { id: 'sticky-note', icon: <MessageSquarePlus className="h-4 w-4" />, label: 'Sticky Note' },
    { id: 'eraser', icon: <Eraser className="h-4 w-4" />, label: 'Eraser' },
  ];

  return (
    <div className="flex flex-col h-[calc(100dvh-3.5rem)] lg:h-[calc(100dvh-3.5rem)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-outline-variant bg-surface">
        <div className="flex items-center gap-3">
          <a href="/resources" className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors">
            <ArrowLeft className="h-5 w-5 text-on-surface" />
          </a>
          <div className="min-w-0">
            <h1 className="text-sm font-medium text-on-surface truncate">{mockResource.title}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge size="sm" variant="tonal" style={{ backgroundColor: SUBJECT_COLORS[mockResource.subject], color: '#fff' }}>
                {SUBJECT_LABELS[mockResource.subject]}
              </Badge>
              <Badge size="sm" variant="outlined">{GRADE_LABELS[mockResource.grade]}</Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={() => setIsBookmarked(!isBookmarked)} className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors" aria-label="Bookmark">
            <Heart className={`h-4 w-4 ${isBookmarked ? 'fill-error text-error' : 'text-on-surface-variant'}`} />
          </button>
          <button className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors" aria-label="Download">
            <Download className="h-4 w-4 text-on-surface-variant" />
          </button>
          <button onClick={() => setShowAnnotationSidebar(!showAnnotationSidebar)} className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors" aria-label="Annotations list">
            <List className="h-4 w-4 text-on-surface-variant" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-1.5 border-b border-outline-variant bg-surface-container-low overflow-x-auto">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-[var(--radius-full)] text-xs font-medium transition-colors ${
              activeTool === tool.id
                ? 'bg-secondary-container text-on-secondary-container'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
            title={tool.label}
          >
            {tool.icon}
            <span className="hidden sm:inline">{tool.label}</span>
          </button>
        ))}

        {(activeTool === 'highlight' || activeTool === 'underline' || activeTool === 'sticky-note') && (
          <div className="flex items-center gap-1 ml-2 pl-2 border-l border-outline-variant">
            {ANNOTATION_COLORS.map(color => (
              <button
                key={color.value}
                onClick={() => setAnnotationColor(color.value)}
                className={`h-6 w-6 rounded-[var(--radius-full)] border-2 transition-colors ${
                  annotationColor === color.value ? 'border-on-surface' : 'border-transparent'
                }`}
                style={{ backgroundColor: color.value }}
                title={color.name}
              />
            ))}
          </div>
        )}

        <div className="flex-1" />

        <div className="flex items-center gap-1">
          <button onClick={zoomOut} className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors" aria-label="Zoom out">
            <ZoomOut className="h-4 w-4 text-on-surface-variant" />
          </button>
          <span className="text-xs text-on-surface-variant min-w-[3rem] text-center">{zoom}%</span>
          <button onClick={zoomIn} className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors" aria-label="Zoom in">
            <ZoomIn className="h-4 w-4 text-on-surface-variant" />
          </button>

          <div className="w-px h-6 bg-outline-variant mx-1" />

          <button onClick={prevPage} disabled={currentPage <= 1} className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors disabled:opacity-40" aria-label="Previous page">
            <ChevronLeft className="h-4 w-4 text-on-surface-variant" />
          </button>
          <span className="text-xs text-on-surface-variant min-w-[4rem] text-center">{currentPage} / {totalPages}</span>
          <button onClick={nextPage} disabled={currentPage >= totalPages} className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors disabled:opacity-40" aria-label="Next page">
            <ChevronRight className="h-4 w-4 text-on-surface-variant" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-auto bg-surface-container flex items-start justify-center p-4 lg:p-8">
          <div
            className="bg-surface-container-lowest border border-outline-variant rounded-[var(--radius-md)] shadow-sm flex items-center justify-center"
            style={{
              width: `${zoom * 6}px`,
              minHeight: `${zoom * 8}px`,
              maxWidth: '100%',
            }}
          >
            <div className="text-center p-8">
              <p className="text-lg font-medium text-on-surface">Page {currentPage}</p>
              <p className="text-sm text-on-surface-variant mt-1">PDF viewer will render here</p>
              <p className="text-xs text-on-surface-variant mt-2">react-pdf integration loads actual content</p>
            </div>
          </div>
        </div>

        {showAnnotationSidebar && (
          <div className="w-72 border-l border-outline-variant bg-surface-container-low overflow-y-auto hidden lg:block">
            <div className="p-4">
              <h3 className="text-sm font-medium text-on-surface mb-3">Annotations</h3>
              {annotations.length === 0 ? (
                <p className="text-xs text-on-surface-variant text-center py-8">No annotations yet. Use the toolbar to add highlights, underlines, or sticky notes.</p>
              ) : (
                <div className="space-y-2">
                  {annotations.map(ann => (
                    <div key={ann.id} className="p-2 rounded-[var(--radius-sm)] bg-surface-container border border-outline-variant">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-on-surface">Page {ann.pageNumber}</span>
                        <span className="text-[10px] text-on-surface-variant capitalize">{ann.type}</span>
                      </div>
                      {ann.text && <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{ann.text}</p>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}