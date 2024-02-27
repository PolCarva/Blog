import React, { useEffect, useState } from 'react'
import ErrorMessage from '../../components/ErrorMessage';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../../services/index/posts';
import toast from 'react-hot-toast';
import ArticleCardSkeleton from '../../components/ArticleCardSkeleton';
import ArticleCard from '../../components/ArticleCard';
import MainLayout from '../../components/MainLayout';
import Pagination from '../../components/Pagination';
import { useSearchParams } from 'react-router-dom';

let isFirstRun = true;

const BlogPage = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const searchParamsValue = Object.fromEntries([...searchParams]);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParamsValue?.page) || 1);
    const { t } = useTranslation();
    const { data, isLoading, isError, refetch } = useQuery({
        queryFn: () => getAllPosts("", currentPage, 12),
        queryKey: ["posts"],
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        if (isFirstRun) {
            isFirstRun = false;
            return;
        }
        refetch({ page: currentPage });
        window.scrollTo({ top: 0 });
    }, [currentPage, refetch]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSearchParams({ page });
    }

    return (
        <MainLayout>
            <section className="flex flex-col container px-5 md:px-12 mx-auto py-10 w-full">
                <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">
                    {isLoading ? (
                        [...Array(3)].map((item, index) => {
                            return (
                                <ArticleCardSkeleton
                                    key={index}
                                    className={
                                        "w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                                    }
                                />
                            );
                        })
                    ) : isError ? (
                        <ErrorMessage message={t('alerts.somethingWentWrong')} />
                    ) : (
                        data?.data
                            .filter((post) => !post.isNew)
                            .map((post) => (
                                <ArticleCard
                                    key={post._id}
                                    post={post}
                                    className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                                />
                            ))
                    )}
                </div>
                {!isLoading && (
                    <Pagination
                        onPageChange={(page) => handlePageChange(page)}
                        currentPage={currentPage}
                        totalPageCount={JSON.parse(data?.headers?.["x-totalpagecount"])}
                    />
                )}
            </section>
        </MainLayout>

    );
}

export default BlogPage