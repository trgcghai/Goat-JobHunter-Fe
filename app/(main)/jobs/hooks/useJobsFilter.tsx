import { useFetchJobsAvailableQuery } from '@/services/job/jobApi';
import { useGetAllSkillsQuery } from '@/services/skill/skillApi';
import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

export interface JobFilters {
    location?: string[];
    skills?: string[];
    level?: string[];
    workingType?: string[];
}

export interface UseJobsFilterOptions {
    initialPage?: number;
    itemsPerPage?: number;
    initialFilters?: JobFilters;
}

export const useJobsFilter = (options?: UseJobsFilterOptions) => {
    const { initialPage = 1, itemsPerPage = 10, initialFilters = {} } = options || {};

    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(initialPage);
    const [filters, setFilters] = useState<JobFilters>(initialFilters);
    const [skillInputValue, setSkillInputValue] = useState<string>('');
    const [debouncedSkillInput, setDebouncedSkillInput] = useState<string>('');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const debouncedSkillSearch = useCallback(
        debounce((value: string) => {
            setDebouncedSkillInput(value);
        }, 500),
        [],
    );

    // Handle skill input value change
    const handleSkillInputChange = (value: string) => {
        setSkillInputValue(value);
        debouncedSkillSearch(value);
    };

    // Fetch skills from API
    const { data: skillsData, isFetching: isFetchingSkills } = useGetAllSkillsQuery(
        {
            name: debouncedSkillInput,
        },
        {
            skip: !debouncedSkillInput && debouncedSkillInput.length < 2 && filters.skills?.length === 0,
        },
    );

    // Convert API skills to map for easy lookup (name -> id)
    const skillNameToIdMap = useMemo(() => {
        const map = new Map<string, number>();
        skillsData?.data?.result?.forEach((skill) => {
            map.set(skill.name, skill.skillId);
        });
        return map;
    }, [skillsData]);

    // Build query params matching FetchJobsRequest
    const queryParams = useMemo(() => {
        const params: Record<string, string | number | string[] | boolean | number[]> = {
            page: currentPage,
            size: itemsPerPage,
        };

        if (filters.location && filters.location.length > 0) {
            params.location = filters.location.join(',');
        }

        if (filters.level && filters.level.length > 0) {
            params.level = filters.level;
        }

        if (filters.workingType && filters.workingType.length > 0) {
            params.workingType = filters.workingType;
        }

        if (filters.skills && filters.skills.length > 0) {
            // Convert skill names to IDs for API call
            const skillIds = filters.skills
                .map((skillName) => skillNameToIdMap.get(skillName))
                .filter((id): id is number => id !== undefined);

            if (skillIds.length > 0) {
                params.skills = skillIds;
            }
        }

        return params;
    }, [currentPage, itemsPerPage, filters, skillNameToIdMap]);

    const { data: jobsResponse, isLoading, isFetching, isError, error } = useFetchJobsAvailableQuery(queryParams);

    // Extract data from response
    const jobs = jobsResponse?.data?.result || [];
    const meta = jobsResponse?.data?.meta || {
        current: 1,
        pageSize: itemsPerPage,
        pages: 0,
        total: 0,
    };

    const totalPages = meta.pages;
    const totalItems = meta.total;

    // Filter handlers
    const handleFilterChange = (newFilters: Partial<JobFilters>) => {
        setFilters((prev) => ({ ...prev, ...newFilters }));
        setCurrentPage(1);
    };

    const resetFilters = () => {
        setFilters({
            level: [],
            skills: [],
            location: [],
            workingType: [],
        });
        setCurrentPage(1);
        setSkillInputValue('');
        setDebouncedSkillInput('');

        router.push('/jobs');
    };

    // Pagination handlers
    const goToPage = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const nextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const previousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    // Active filters count
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const activeFiltersCount = Object.entries(filters).filter(([_, value]) => {
        if (Array.isArray(value)) {
            return value.length > 0;
        }
        return value !== undefined && value !== null && value !== '';
    }).length;

    return {
        // Data
        jobs,
        meta,
        totalPages,
        totalItems,
        currentPage,
        itemsPerPage,

        // Loading states
        isLoading,
        isFetching,
        isError,
        error,

        // Filters
        filters,
        handleFilterChange,
        resetFilters,
        activeFiltersCount,

        // Pagination
        goToPage,
        nextPage,
        previousPage,
        hasNextPage,
        hasPreviousPage,

        // Skills
        skillsData: skillsData?.data?.result || [],
        isFetchingSkills,
        skillInputValue,
        handleSkillInputChange,
    };
};

export default useJobsFilter;
