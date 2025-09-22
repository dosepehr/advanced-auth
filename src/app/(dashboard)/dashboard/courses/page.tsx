'use client';
import api from '@/utils/api';
import useCustomQuery from '@/utils/hooks/useCustomQuery';
import { CourseListItem } from '@/utils/types/DTO/course.inerface';
import React from 'react';

const Page = () => {
    const { data } = useCustomQuery<CourseListItem[]>({
        queryFn: () => api.courses.all(),
        queryKey: ['COURSES'],
    });
    return (
        <div>
            {data?.map((course, i) => (
                <p key={i}>{course.title}</p>
            ))}
        </div>
    );
};

export default Page;
