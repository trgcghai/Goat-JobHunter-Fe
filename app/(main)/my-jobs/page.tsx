'use client';

import React, { useRef, useState, useEffect } from 'react';
import ApplicationCard from './components/ApplicationCard';
import SavedJobCard from './components/SavedJobCard';
import LoaderSpin from '@/components/common/LoaderSpin';
import CustomPagination from '@/components/common/CustomPagination';
import { Briefcase, FileX, Bookmark } from 'lucide-react';
import { useMyJob } from './hooks/useMyJob';
import { cn } from '@/lib/utils';

export default function MyJobsPage() {
  const {
    mainTab,
    page,
    applications,
    isLoadingApplications,
    isErrorApplications,
    totalPagesApplications,
    totalElementsApplications,
    savedJobs,
    isLoadingSavedJobs,
    isErrorSavedJobs,
    totalPagesSavedJobs,
    totalElementsSavedJobs,
    handleMainTabChange,
    setPage,
  } = useMyJob();

  const appliedTabRef = useRef<HTMLButtonElement>(null);
  const savedTabRef = useRef<HTMLButtonElement>(null);
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const activeTab = mainTab === 'applied' ? appliedTabRef.current : savedTabRef.current;
    if (activeTab) {
      setUnderlineStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [mainTab, totalElementsApplications, totalElementsSavedJobs]);

  return (
    <div className="container mx-auto py-8 px-4 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold">Quản lý việc làm</h1>
        </div>
        <p className="text-muted-foreground">Theo dõi việc làm đã lưu và đơn ứng tuyển của bạn</p>
      </div>

      {/* Custom Tabs - LinkedIn Style */}
      <div className="border-b border-border mb-6">
        <div className="flex gap-8 relative">
          <button
            ref={appliedTabRef}
            onClick={() => handleMainTabChange('applied')}
            className={cn(
              'pb-3 px-1 text-sm font-medium transition-colors duration-200 hover:text-foreground cursor-pointer',
              mainTab === 'applied' ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            <div className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              <span>Việc làm đã ứng tuyển</span>
              {totalElementsApplications > 0 && (
                <span className="ml-1 text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                  {totalElementsApplications}
                </span>
              )}
            </div>
          </button>

          <button
            ref={savedTabRef}
            onClick={() => handleMainTabChange('saved')}
            className={cn(
              'pb-3 px-1 text-sm font-medium transition-colors duration-200 hover:text-foreground cursor-pointer',
              mainTab === 'saved' ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            <div className="flex items-center gap-2">
              <Bookmark className="h-4 w-4" />
              <span>Việc làm đã lưu</span>
              {totalElementsSavedJobs > 0 && (
                <span className="ml-1 text-xs bg-muted text-muted-foreground rounded-full px-2 py-0.5">
                  {totalElementsSavedJobs}
                </span>
              )}
            </div>
          </button>

          {/* Animated Sliding Underline */}
          <div
            className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-500 ease-out"
            style={{
              left: `${underlineStyle.left}px`,
              width: `${underlineStyle.width}px`,
            }}
          />
        </div>
      </div>

      {/* Tab Content */}
      <div className="animate-in fade-in-0 slide-in-from-bottom-4 duration-300">
        {mainTab === 'applied' ? (
          /* Applied Jobs Content */
          <>
            {isLoadingApplications ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <LoaderSpin />
              </div>
            ) : isErrorApplications ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <FileX className="h-16 w-16 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Không thể tải danh sách đơn ứng tuyển</p>
              </div>
            ) : applications.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Briefcase className="h-16 w-16 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Chưa có đơn ứng tuyển nào</p>
              </div>
            ) : (
              <>
                {/* Application List */}
                <div className="space-y-4">
                  {applications.map((application) => (
                    <ApplicationCard key={application.applicationId} application={application} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPagesApplications > 1 && (
                  <div className="mt-8 flex justify-center">
                    <CustomPagination
                      currentPage={page}
                      totalPages={totalPagesApplications}
                      onPageChange={setPage}
                      onNextPage={() => setPage((prev) => Math.min(prev + 1, totalPagesApplications))}
                      onPreviousPage={() => setPage((prev) => Math.max(prev - 1, 1))}
                      hasNextPage={page < totalPagesApplications}
                      hasPreviousPage={page > 1}
                    />
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          /* Saved Jobs Content */
          <>
            {isLoadingSavedJobs ? (
              <div className="flex items-center justify-center min-h-[400px]">
                <LoaderSpin />
              </div>
            ) : isErrorSavedJobs ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <FileX className="h-16 w-16 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Không thể tải danh sách việc làm đã lưu</p>
              </div>
            ) : savedJobs.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                <Bookmark className="h-16 w-16 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">Chưa có việc làm nào được lưu</p>
                <p className="text-sm text-muted-foreground">Hãy khám phá và lưu các công việc phù hợp với bạn</p>
              </div>
            ) : (
              <>
                {/* Saved Jobs List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedJobs.map((job) => (
                    <SavedJobCard key={job.jobId} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPagesSavedJobs > 1 && (
                  <div className="mt-8 flex justify-center">
                    <CustomPagination
                      currentPage={page}
                      totalPages={totalPagesSavedJobs}
                      onPageChange={setPage}
                      onNextPage={() => setPage((prev) => Math.min(prev + 1, totalPagesSavedJobs))}
                      onPreviousPage={() => setPage((prev) => Math.max(prev - 1, 1))}
                      hasNextPage={page < totalPagesSavedJobs}
                      hasPreviousPage={page > 1}
                    />
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
