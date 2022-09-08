import React, { useState } from 'react'

import toast from 'react-hot-toast';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CardReport } from '../CardReport';
import { Pagination } from '../ui/Pagination';
import { useEffect } from 'react';
import qcareApi from '../../api/qcareApi';
import { Charging } from '../ui/Charging';


export const History = () => {

    const [reports, setReports] = useState([])

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState(false)

    const [loo, setLoo] = useState(false)


    useEffect(() => {

        async function fetchData() {

            setReports([])

            try {
                const { data } = await qcareApi.post(`/report/filter/search-date?page=${page}`, { startDate: startDate, endDate: endDate })

                const reports = data.result.map(report => {
                    return {
                        id: report._id,
                        palletRef: report.mainData.pallet_ref || "--",
                        mainData: report.mainData,
                        pallets: report.pallets,
                        fruit: report.fruit,
                        score: report.score,
                        date: report.date
                    }
                })

                setReports(reports)
                setTotalPages(data.totalPages)
                setLoo(false)

            } catch (error) {
                console.log(error)
                toast.error('Something went wrong')
                setLoo(false)
            }

        }

        fetchData()

    }, [page, search])


    const searchDate = async () => {
        setLoo(true)

        if (!startDate || !endDate) {
            setLoo(false)
            return toast.error("Please select a date range")}
        setSearch(!search)
    }

    const cleanDate = () => {
        setStartDate(null)
        setEndDate(null)
        setSearch(!search)
    };

    return (
        <div className="reports content">

            <main className="container">

                <h2 className="main-title mb-1">History</h2>

                <div className="mb-1 date-container">
                    <div className='flex'>
                        <DatePicker
                            className="date-input"
                            dateFormat="dd / MM / yyyy"
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            maxDate={new Date()}
                            placeholderText="Select a date"
                        />
                        <DatePicker
                            className="date-input"
                            dateFormat="dd / MM / yyyy"
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            maxDate={new Date()}
                            placeholderText="Select a date"
                        />
                        <button
                            className="btn-primary"
                            onClick={searchDate}
                        >Search
                        </button>
                    </div>
                </div>


                {
                    loo
                        ? <Charging />
                        : (reports.length === 0)
                            ?
                            <p className="text-center mt-2">No reports</p>
                            :
                            <>
                                {
                                    reports.length > 0 &&
                                    <button
                                        onClick={cleanDate}
                                        className="clear-filter mb-2">Clean Date
                                    </button>
                                }
                                <div className="reports__list">
                                    {
                                        reports.map(report => (
                                            <CardReport
                                                key={report.id}
                                                {...report}
                                            />
                                        ))
                                    }
                                </div>
                                {
                                    totalPages > 1 &&
                                    <Pagination
                                        totalPages={totalPages}
                                        page={page}
                                        setPage={setPage}
                                    />
                                }
                            </>
                }

            </main>
        </div>
    );
}