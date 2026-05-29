'use client';

import { useEffect, useState } from 'react';
import type { PdfAnnotation } from '@/types';

export function usePdfAnnotations(pdfId: string) {
  const [annotations, setAnnotations] = useState<PdfAnnotation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadAnnotations() {
      try {
        const { getAnnotations } = await import('@/lib/pdf-annotations');
        const loaded = await getAnnotations(pdfId);
        if (mounted) {
          setAnnotations(loaded);
          setIsLoading(false);
        }
      } catch {
        if (mounted) setIsLoading(false);
      }
    }

    loadAnnotations();
    return () => { mounted = false; };
  }, [pdfId]);

  return { annotations, isLoading };
}