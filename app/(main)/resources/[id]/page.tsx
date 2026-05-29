'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { resourceService } from '@/lib/services';
import type { Resource } from '@/types';

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

export default function ResourceDetailPage() {
  const params = useParams();
  const resourceId = params.id as string;

  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResource = () => {
    setIsLoading(true);
    setError(null);
    resourceService.getById(resourceId)
      .then(setResource)
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load resource'))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchResource();
  }, [resourceId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100dvh-3.5rem)]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 rounded-[var(--radius-sm)] border-2 border-primary border-t-transparent animate-spin" />
          <p className="text-sm text-on-surface-variant">Loading resource...</p>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="flex flex-col items-center justify-center h-[calc(100dvh-3.5rem)] text-center px-4">
        <div className="flex items-center justify-center w-16 h-16 rounded-[var(--radius-full)] bg-error-container mb-4">
          <AlertCircle className="h-8 w-8 text-on-error-container" />
        </div>
        <h3 className="text-base font-medium text-on-surface">Failed to load resource</h3>
        <p className="text-sm text-on-surface-variant mt-1 max-w-xs">{error || 'Resource not found'}</p>
        <Button variant="outline" size="md" iconLeft={<RefreshCw className="h-4 w-4" />} onClick={fetchResource} className="mt-4">
          Retry
        </Button>
      </div>
    );
  }

  return (
    <PdfViewer
      fileUrl={resource.fileUrl}
      resourceTitle={resource.title}
      subject={resource.subject}
      grade={resource.grade}
      type={resource.type}
      pageCount={resource.pageCount ?? undefined}
    />
  );
}
