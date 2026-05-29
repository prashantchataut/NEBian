'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';
import Link from 'next/link';
import { ArrowLeft, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Highlighter, Underline, MessageSquarePlus, Eraser, List, Download, Bookmark, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ANNOTATION_COLORS, SUBJECT_LABELS, GRADE_LABELS, SUBJECT_COLORS, type PdfAnnotation } from '@/types';
import { generateId } from '@/lib/utils';
import { getAnnotations, addAnnotation, deleteAnnotation } from '@/lib/pdf-annotations';
import { AnnotationLayer } from './annotation-layer';

if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url
  ).toString();
}

type Tool = 'highlight' | 'underline' | 'sticky-note' | 'eraser' | null;

interface PdfViewerProps {
  fileUrl: string;
  resourceTitle: string;
  subject: string;
  grade: string;
  type: string;
  pageCount?: number;
}

export function PdfViewer({ fileUrl, resourceTitle, subject, grade, pageCount: initialPageCount }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [activeTool, setActiveTool] = useState<Tool>(null);
  const [annotationColor, setAnnotationColor] = useState<string>(ANNOTATION_COLORS[0].value);
  const [showAnnotationSidebar, setShowAnnotationSidebar] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [annotations, setAnnotations] = useState<PdfAnnotation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stickyNoteText, setStickyNoteText] = useState('');
  const [stickyNotePosition, setStickyNotePosition] = useState<{ x: number; y: number; page: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getAnnotations(fileUrl).then(setAnnotations).catch(() => {});
  }, [fileUrl]);

  const onDocumentLoadSuccess = useCallback((document: { numPages: number }) => {
    setNumPages(document.numPages);
    setIsLoading(false);
  }, []);

  const zoomIn = useCallback(() => setZoom(z => Math.min(z + 25, 300)), []);
  const zoomOut = useCallback(() => setZoom(z => Math.max(z - 25, 50)), []);
  const prevPage = useCallback(() => setCurrentPage(p => Math.max(p - 1, 1)), []);
  const nextPage = useCallback(() => setCurrentPage(p => Math.min(p + 1, numPages)), [numPages]);

  const handlePageClick = useCallback((e: React.MouseEvent<HTMLDivElement>, pageNumber: number) => {
    if (!activeTool || activeTool === 'eraser') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    if (activeTool === 'sticky-note') {
      setStickyNotePosition({ x, y, page: pageNumber });
      return;
    }

    const newAnnotation: PdfAnnotation = {
      id: generateId(),
      pdfId: fileUrl,
      type: activeTool,
      pageNumber,
      rect: { x, y, width: 20, height: 3 },
      position: null,
      text: null,
      color: annotationColor,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    addAnnotation(newAnnotation).then(() => {
      setAnnotations(prev => [...prev, newAnnotation]);
    });
  }, [activeTool, annotationColor, fileUrl]);

  const handleSaveStickyNote = useCallback(() => {
    if (!stickyNotePosition || !stickyNoteText.trim()) return;
    const newAnnotation: PdfAnnotation = {
      id: generateId(),
      pdfId: fileUrl,
      type: 'sticky-note',
      pageNumber: stickyNotePosition.page,
      rect: null,
      position: { x: stickyNotePosition.x, y: stickyNotePosition.y },
      text: stickyNoteText,
      color: annotationColor,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    addAnnotation(newAnnotation).then(() => {
      setAnnotations(prev => [...prev, newAnnotation]);
      setStickyNotePosition(null);
      setStickyNoteText('');
    });
  }, [stickyNotePosition, stickyNoteText, annotationColor, fileUrl]);

  const handleDeleteAnnotation = useCallback((id: string) => {
    deleteAnnotation(id).then(() => {
      setAnnotations(prev => prev.filter(a => a.id !== id));
    });
  }, []);

  const pageAnnotations = annotations.filter(a => a.pageNumber === currentPage);

  const tools: { id: Tool; icon: React.ReactNode; label: string }[] = [
    { id: 'highlight', icon: <Highlighter className="h-4 w-4" />, label: 'Highlight' },
    { id: 'underline', icon: <Underline className="h-4 w-4" />, label: 'Underline' },
    { id: 'sticky-note', icon: <MessageSquarePlus className="h-4 w-4" />, label: 'Note' },
    { id: 'eraser', icon: <Eraser className="h-4 w-4" />, label: 'Eraser' },
  ];

  return (
    <div className="flex flex-col h-[calc(100dvh-3.5rem)]">
      <div className="flex items-center justify-between px-4 py-2 border-b border-outline-variant bg-surface shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <Link href="/resources" className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors shrink-0">
            <ArrowLeft className="h-5 w-5 text-on-surface" />
          </Link>
          <div className="min-w-0">
            <h1 className="text-sm font-medium text-on-surface truncate">{resourceTitle}</h1>
            <div className="flex items-center gap-2 mt-0.5">
              <Badge size="sm" variant="tonal" style={{ backgroundColor: SUBJECT_COLORS[subject as keyof typeof SUBJECT_COLORS], color: '#fff' }}>
                {SUBJECT_LABELS[subject as keyof typeof SUBJECT_LABELS] || subject}
              </Badge>
              <Badge size="sm" variant="outlined">{GRADE_LABELS[grade as keyof typeof GRADE_LABELS] || grade}</Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <button onClick={() => setIsBookmarked(!isBookmarked)} className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors" aria-label="Bookmark">
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-primary text-primary' : 'text-on-surface-variant'}`} />
          </button>
          <button className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors" aria-label="Download">
            <Download className="h-4 w-4 text-on-surface-variant" />
          </button>
          <button onClick={() => setShowAnnotationSidebar(!showAnnotationSidebar)} className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors" aria-label="Annotations">
            <List className="h-4 w-4 text-on-surface-variant" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 px-4 py-1.5 border-b border-outline-variant bg-surface-container-low overflow-x-auto shrink-0">
        {tools.map(tool => (
          <button
            key={tool.id}
            onClick={() => setActiveTool(activeTool === tool.id ? null : tool.id)}
            className={`inline-flex items-center gap-1.5 h-8 px-3 rounded-[var(--radius-full)] text-xs font-medium transition-colors ${
              activeTool === tool.id ? 'bg-secondary-container text-on-secondary-container' : 'text-on-surface-variant hover:bg-surface-container-high'
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
          <span className="text-xs text-on-surface-variant min-w-[4rem] text-center">{currentPage} / {numPages || initialPageCount || '?'}</span>
          <button onClick={nextPage} disabled={currentPage >= numPages} className="inline-flex items-center justify-center h-8 w-8 rounded-[var(--radius-full)] hover:bg-surface-container-high transition-colors disabled:opacity-40" aria-label="Next page">
            <ChevronRight className="h-4 w-4 text-on-surface-variant" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <div ref={containerRef} className="flex-1 overflow-auto bg-surface-container flex items-start justify-center p-4 lg:p-8">
          {isLoading && (
            <div className="flex items-center justify-center h-64">
              <div className="h-8 w-8 rounded-[var(--radius-sm)] border-2 border-primary border-t-transparent animate-spin" />
            </div>
          )}
          <Document
            file={fileUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center h-64">
                <div className="h-8 w-8 rounded-[var(--radius-sm)] border-2 border-primary border-t-transparent animate-spin" />
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <p className="text-base font-medium text-on-surface">Failed to load PDF</p>
                <p className="text-sm text-on-surface-variant mt-1">The file may be corrupted or unavailable.</p>
              </div>
            }
          >
            <div
              className="relative"
              style={{ width: `${zoom * 6}px` }}
              onClick={activeTool && activeTool !== 'eraser' ? (e) => handlePageClick(e, currentPage) : undefined}
            >
              <Page
                pageNumber={currentPage}
                scale={zoom / 100}
                className="mx-auto"
                loading={
                  <div className="flex items-center justify-center" style={{ width: `${zoom * 6}px`, height: `${zoom * 8}px` }}>
                    <div className="h-8 w-8 rounded-[var(--radius-sm)] border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                }
              />
              <AnnotationLayer
                annotations={pageAnnotations}
                activeTool={activeTool}
                onDelete={handleDeleteAnnotation}
                zoom={zoom / 100}
              />
            </div>
          </Document>

          {stickyNotePosition && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => { setStickyNotePosition(null); setStickyNoteText(''); }}>
              <div className="w-80 bg-surface-container-lowest rounded-[var(--radius-lg)] border border-outline-variant p-4 animate-scale-in" onClick={e => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-on-surface">Add Note</h3>
                  <button onClick={() => { setStickyNotePosition(null); setStickyNoteText(''); }} className="inline-flex items-center justify-center h-6 w-6 rounded-[var(--radius-full)] hover:bg-surface-container-high">
                    <X className="h-4 w-4 text-on-surface-variant" />
                  </button>
                </div>
                <textarea
                  value={stickyNoteText}
                  onChange={(e) => setStickyNoteText(e.target.value)}
                  placeholder="Type your note..."
                  className="w-full h-24 rounded-[var(--radius-sm)] border border-outline-variant bg-surface-container-lowest px-3 py-2 text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  autoFocus
                />
                <div className="flex justify-end gap-2 mt-3">
                  <Button variant="ghost" size="sm" onClick={() => { setStickyNotePosition(null); setStickyNoteText(''); }}>Cancel</Button>
                  <Button variant="primary" size="sm" onClick={handleSaveStickyNote} disabled={!stickyNoteText.trim()}>Save</Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {showAnnotationSidebar && (
          <div className="w-72 border-l border-outline-variant bg-surface-container-low overflow-y-auto hidden lg:block shrink-0">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-on-surface">Annotations</h3>
                <button onClick={() => setShowAnnotationSidebar(false)} className="inline-flex items-center justify-center h-6 w-6 rounded-[var(--radius-full)] hover:bg-surface-container-high">
                  <X className="h-4 w-4 text-on-surface-variant" />
                </button>
              </div>
              {annotations.length === 0 ? (
                <p className="text-xs text-on-surface-variant text-center py-8">No annotations yet. Use the toolbar to add highlights, underlines, or sticky notes.</p>
              ) : (
                <div className="space-y-2">
                  {annotations.map(ann => (
                    <button
                      key={ann.id}
                      onClick={() => setCurrentPage(ann.pageNumber)}
                      className="w-full text-left p-2 rounded-[var(--radius-sm)] bg-surface-container border border-outline-variant hover:bg-surface-container-high transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-on-surface">Page {ann.pageNumber}</span>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] text-on-surface-variant capitalize">{ann.type === 'sticky-note' ? 'note' : ann.type}</span>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteAnnotation(ann.id); }} className="inline-flex items-center justify-center h-4 w-4 rounded hover:bg-surface-container-highest">
                            <X className="h-3 w-3 text-on-surface-variant" />
                          </button>
                        </div>
                      </div>
                      {ann.text && <p className="text-xs text-on-surface-variant mt-1 line-clamp-2">{ann.text}</p>}
                      <div className="flex items-center gap-1 mt-1">
                        <span className="h-2 w-2 rounded-[var(--radius-full)]" style={{ backgroundColor: ann.color }} />
                      </div>
                    </button>
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