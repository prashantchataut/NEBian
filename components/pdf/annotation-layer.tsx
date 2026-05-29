'use client';

import type { PdfAnnotation } from '@/types';

interface AnnotationLayerProps {
  annotations: PdfAnnotation[];
  activeTool: 'highlight' | 'underline' | 'sticky-note' | 'eraser' | null;
  onDelete: (id: string) => void;
  zoom: number;
}

export function AnnotationLayer({ annotations, activeTool, onDelete, zoom }: AnnotationLayerProps) {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 10 }}>
      {annotations.map((annotation) => {
        if (annotation.type === 'highlight' && annotation.rect) {
          return (
            <div
              key={annotation.id}
              className="absolute pointer-events-auto cursor-pointer group"
              style={{
                left: `${annotation.rect.x}%`,
                top: `${annotation.rect.y}%`,
                width: `${annotation.rect.width}%`,
                height: `${annotation.rect.height * zoom}%`,
                backgroundColor: annotation.color,
                opacity: 0.3,
                borderRadius: '2px',
              }}
              onClick={() => {
                if (activeTool === 'eraser') onDelete(annotation.id);
              }}
            >
              <div className="absolute -top-1 -right-1 hidden group-hover:block">
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(annotation.id); }}
                  className="h-4 w-4 rounded-full bg-surface text-on-surface-variant text-[8px] flex items-center justify-center"
                >
                  x
                </button>
              </div>
            </div>
          );
        }

        if (annotation.type === 'underline' && annotation.rect) {
          return (
            <div
              key={annotation.id}
              className="absolute pointer-events-auto cursor-pointer group"
              style={{
                left: `${annotation.rect.x}%`,
                top: `${annotation.rect.y + annotation.rect.height}%`,
                width: `${annotation.rect.width}%`,
                height: '2px',
                backgroundColor: annotation.color,
              }}
              onClick={() => {
                if (activeTool === 'eraser') onDelete(annotation.id);
              }}
            >
              <div className="absolute -top-3 -right-1 hidden group-hover:block">
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(annotation.id); }}
                  className="h-4 w-4 rounded-full bg-surface text-on-surface-variant text-[8px] flex items-center justify-center"
                >
                  x
                </button>
              </div>
            </div>
          );
        }

        if (annotation.type === 'sticky-note' && annotation.position) {
          return (
            <div
              key={annotation.id}
              className="absolute pointer-events-auto cursor-pointer group"
              style={{
                left: `${annotation.position.x}%`,
                top: `${annotation.position.y}%`,
              }}
              onClick={() => {
                if (activeTool === 'eraser') onDelete(annotation.id);
              }}
            >
              <div
                className="w-6 h-6 rounded-[2px] rotate-45 shadow-sm flex items-center justify-center"
                style={{ backgroundColor: annotation.color }}
              >
                <span className="text-[8px] font-bold rotate-[-45deg] text-white">N</span>
              </div>
              {annotation.text && (
                <div className="absolute left-6 top-0 hidden group-hover:block w-48 p-2 rounded-[var(--radius-sm)] bg-surface-container-lowest border border-outline-variant text-xs text-on-surface shadow-sm z-20">
                  {annotation.text}
                </div>
              )}
            </div>
          );
        }

        return null;
      })}
    </div>
  );
}