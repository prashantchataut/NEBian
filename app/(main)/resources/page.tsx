'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, BookOpen, Download } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { SUBJECTS, GRADES, RESOURCE_TYPES, SUBJECT_LABELS, GRADE_LABELS, RESOURCE_TYPE_LABELS, SUBJECT_COLORS, RESOURCE_TYPE_COLORS, type Resource } from '@/types';

const mockResources: Resource[] = [
  { id: '1', title: 'Physics Grade 11 Textbook', description: 'Complete NEB physics textbook for Grade 11 students', subject: 'Physics', grade: 'Grade11', type: 'Textbook', fileUrl: '/papers/physics-11.pdf', fileSize: 15728640, thumbnailUrl: null, pageCount: 320, downloadCount: 1245, createdAt: '2025-01-15', updatedAt: '2025-01-15' },
  { id: '2', title: 'Chemistry Grade 12 Notes', description: 'Comprehensive chemistry notes for NEB exam preparation', subject: 'Chemistry', grade: 'Grade12', type: 'Notes', fileUrl: '/papers/chem-12.pdf', fileSize: 5242880, thumbnailUrl: null, pageCount: 85, downloadCount: 892, createdAt: '2025-02-01', updatedAt: '2025-02-01' },
  { id: '3', title: 'Mathematics Grade 11 Past Paper 2080', description: 'NEB Mathematics past paper with solutions', subject: 'Mathematics', grade: 'Grade11', type: 'PastPaper', fileUrl: '/papers/math-11-pp.pdf', fileSize: 2097152, thumbnailUrl: null, pageCount: 24, downloadCount: 2341, createdAt: '2025-03-10', updatedAt: '2025-03-10' },
  { id: '4', title: 'Biology Grade 12 Practice Set', description: 'Practice problems for NEB Biology Grade 12', subject: 'Biology', grade: 'Grade12', type: 'PracticeSet', fileUrl: '/papers/bio-12-ps.pdf', fileSize: 3145728, thumbnailUrl: null, pageCount: 48, downloadCount: 567, createdAt: '2025-04-05', updatedAt: '2025-04-05' },
  { id: '5', title: 'English Grade 10 Textbook', description: 'NEB English textbook for SEE preparation', subject: 'English', grade: 'Grade10', type: 'Textbook', fileUrl: '/papers/eng-10.pdf', fileSize: 10485760, thumbnailUrl: null, pageCount: 200, downloadCount: 3100, createdAt: '2025-01-20', updatedAt: '2025-01-20' },
  { id: '6', title: 'Nepali Grade 11 Notes', description: 'Detailed notes for NEB Nepali subject', subject: 'Nepali', grade: 'Grade11', type: 'Notes', fileUrl: '/papers/nep-11.pdf', fileSize: 4194304, thumbnailUrl: null, pageCount: 120, downloadCount: 780, createdAt: '2025-02-15', updatedAt: '2025-02-15' },
];

export default function ResourcesPage() {
  const [search, setSearch] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedGrades, setSelectedGrades] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilter = (arr: string[], setArr: (v: string[]) => void, val: string) => {
    setArr(arr.includes(val) ? arr.filter(v => v !== val) : [...arr, val]);
  };

  const filtered = mockResources.filter(r => {
    if (search && !r.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (selectedSubjects.length && !selectedSubjects.includes(r.subject)) return false;
    if (selectedGrades.length && !selectedGrades.includes(r.grade)) return false;
    if (selectedTypes.length && !selectedTypes.includes(r.type)) return false;
    return true;
  });

  return (
    <div className="px-4 lg:px-6 py-6 max-w-5xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-semibold text-on-surface tracking-tight">Resources</h1>
        <p className="text-sm text-on-surface-variant mt-1">Browse textbooks, notes, past papers, and practice sets.</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-on-surface-variant pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search resources..."
            className="w-full h-10 pl-10 pr-4 rounded-[var(--radius-full)] bg-surface-container-high text-on-surface text-sm placeholder:text-on-surface-variant/60 border border-transparent hover:border-outline-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-[border-color,box-shadow] duration-[var(--transition-fast)]"
          />
        </div>
        <Button
          variant="outline"
          size="md"
          iconLeft={<SlidersHorizontal className="h-4 w-4" />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Filter
        </Button>
      </div>

      {showFilters && (
        <div className="space-y-4 p-4 rounded-[var(--radius-md)] bg-surface-container-low border border-outline-variant animate-slide-down">
          <div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2">Subject</p>
            <div className="flex flex-wrap gap-2">
              {SUBJECTS.map(s => (
                <button
                  key={s}
                  onClick={() => toggleFilter(selectedSubjects, setSelectedSubjects, s)}
                  aria-pressed={selectedSubjects.includes(s)}
                  className={`px-3 h-7 rounded-[var(--radius-full)] text-xs font-medium transition-[background-color,color] duration-[var(--transition-fast)] ${
                    selectedSubjects.includes(s)
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest active:bg-surface-container-highest'
                  }`}
                >
                  {SUBJECT_LABELS[s]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2">Grade</p>
            <div className="flex flex-wrap gap-2">
              {GRADES.map(g => (
                <button
                  key={g}
                  onClick={() => toggleFilter(selectedGrades, setSelectedGrades, g)}
                  aria-pressed={selectedGrades.includes(g)}
                  className={`px-3 h-7 rounded-[var(--radius-full)] text-xs font-medium transition-[background-color,color] duration-[var(--transition-fast)] ${
                    selectedGrades.includes(g)
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest active:bg-surface-container-highest'
                  }`}
                >
                  {GRADE_LABELS[g]}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-2">Type</p>
            <div className="flex flex-wrap gap-2">
              {RESOURCE_TYPES.map(t => (
                <button
                  key={t}
                  onClick={() => toggleFilter(selectedTypes, setSelectedTypes, t)}
                  aria-pressed={selectedTypes.includes(t)}
                  className={`px-3 h-7 rounded-[var(--radius-full)] text-xs font-medium transition-[background-color,color] duration-[var(--transition-fast)] ${
                    selectedTypes.includes(t)
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest active:bg-surface-container-highest'
                  }`}
                >
                  {RESOURCE_TYPE_LABELS[t]}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(resource => (
          <Link key={resource.id} href={`/resources/${resource.id}`} className="block">
            <Card variant="outlined" padding="default" interactive className="h-full flex flex-col">
              <div className="flex items-start gap-3 mb-3">
                <div
                  className="flex items-center justify-center w-10 h-10 rounded-[var(--radius-md)] text-white text-sm font-bold shrink-0"
                  style={{ backgroundColor: SUBJECT_COLORS[resource.subject] }}
                >
                  {resource.subject.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-on-surface line-clamp-2">{resource.title}</h3>
                  <p className="text-xs text-on-surface-variant mt-0.5 line-clamp-1">{resource.description}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-auto">
                <Badge size="sm" variant="tonal" color={SUBJECT_COLORS[resource.subject]}>
                  {SUBJECT_LABELS[resource.subject]}
                </Badge>
                <Badge size="sm" variant="outlined">{GRADE_LABELS[resource.grade]}</Badge>
                <Badge size="sm" variant="tonal" color={RESOURCE_TYPE_COLORS[resource.type]}>
                  {RESOURCE_TYPE_LABELS[resource.type]}
                </Badge>
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-outline-variant text-xs text-on-surface-variant">
                <span className="flex items-center gap-1"><Download className="h-3 w-3" />{resource.downloadCount}</span>
                <span>{resource.pageCount} pages</span>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-[var(--radius-full)] bg-surface-container-high mb-4">
            <BookOpen className="h-8 w-8 text-on-surface-variant" />
          </div>
          <h3 className="text-base font-medium text-on-surface">No resources found</h3>
          <p className="text-sm text-on-surface-variant mt-1 max-w-xs">Try adjusting your filters or search terms.</p>
        </div>
      )}
    </div>
  );
}