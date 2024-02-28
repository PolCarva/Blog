import React, { useEffect, useRef, useState } from 'react';
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
import { FiSearch } from 'react-icons/fi';

let isFirstRun = true;

const BlogPage = () => {
    const searchInputRef = useRef(null);
    const [searchParams, setSearchParams] = useSearchParams();
    const searchParamsValue = Object.fromEntries([...searchParams]);
    const [currentPage, setCurrentPage] = useState(parseInt(searchParamsValue?.page) || 1);
    const [searchQuery, setSearchQuery] = useState(searchParamsValue?.search || '');
    const [category, setCategory] = useState(searchParamsValue?.category || '');
    const { t } = useTranslation();
    const { data, isLoading, isError, refetch } = useQuery({
        queryFn: () => getAllPosts(searchQuery, currentPage, 12, category),
        queryKey: ['posts'],
        onError: (error) => {
            toast.error(error.message);
        },
    });

    useEffect(() => {
        if (isFirstRun) {
            isFirstRun = false;
            return;
        }
        refetch({ page: currentPage, search: searchQuery });
        window.scrollTo({ top: 0 });
    }, [currentPage, refetch, searchQuery]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setSearchParams({ page, search: searchQuery });
    };

    const handleSearch = (search) => {
        setSearchQuery(search);
        setCurrentPage(1);
        setSearchParams({ page: 1, search });
    };


    return (
        <MainLayout>
            <section className="flex flex-col container px-5 md:px-12 mx-auto py-10 w-full">
                <div className='mb-5 md:mb-8 lg:mb-10 flex w-full'>
                    <div className="flex flex-col gap-y-2.5 relative w-full lg:w-1/2 lg:max-w-4xl">
                        <div className="relative">
                            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-placeholder" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                className="placeholder:font-bold font-semibold text-dark-soft placeholder:text-gray-placeholder rounded-lg pl-12 pr-13 w-full py-3 focus:outline-none shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px] md:py-4"
                                placeholder={t('hero.searchPlaceholder')}
                                onChange={(e) => handleSearch(e.target.value)}
                                value={searchQuery}
                            />
                        </div>
                        <button onClick={() => handleSearch(searchInputRef.current.value)} className="w-full bg-primary text-white font-semibold rounded-lg px-5 py-3 md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 md:w-fit md:py-2">
                            {t('hero.searchBtn')}
                        </button>
                    </div>
                </div>
                <div className="flex flex-wrap md:gap-x-5 gap-y-5 pb-10">

                    {isLoading ? (
                        [...Array(3)].map((item, index) => {
                            return (
                                <ArticleCardSkeleton
                                    key={index}
                                    className={
                                        'w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]'
                                    }
                                />
                            );
                        })
                    ) : isError ? (
                        <ErrorMessage message={t('alerts.somethingWentWrong')} />
                    ) : (

                        data?.data.filter((post) => !post.isNew).length > 0 ? (
                            data?.data
                                .filter((post) => !post.isNew)
                                .map((post) => (
                                    <ArticleCard
                                        key={post._id}
                                        post={post}
                                        className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
                                    />
                                ))
                        ) : (
                            <h1 className='font-bold text-center w-full text-2xl mt-10 text-primary'>{t("alerts.nothingHere")}</h1>
                        )
                    )}
                </div>
                {!isLoading && (
                    <Pagination
                        onPageChange={(page) => handlePageChange(page)}
                        currentPage={currentPage}
                        totalPageCount={JSON.parse(data?.headers?.['x-totalpagecount'])}
                    />
                )}
            </section>
        </MainLayout>
    );
};

export default BlogPage;
