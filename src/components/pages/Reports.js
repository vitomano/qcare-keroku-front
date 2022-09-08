import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import qcareApi from '../../api/qcareApi';
import { fruitList, scoreList } from '../../data/search'
import { CardReport } from '../CardReport';
import { Charging } from '../ui/Charging'
import { ModalConfirmation } from '../ui/ModalConfirmation';
import { Pagination } from '../ui/Pagination';
import { SearchList } from '../ui/SearchList'
import { Spinner } from '../ui/Spinner'


export const Reports = () => {

    const [reports, setReports] = useState(["start"])
    const [removed, setRemoved] = useState(false)
    const [totalPages, setTotalPages] = useState(1)
    const [page, setPage] = useState(1)

    const [loo, setLoo] = useState(false)

    const [filterFruit, setFilterFruit] = useState([]);
    const [filterScore, setFilterScore] = useState([]);
    const [filterSupplier, setFilterSupplier] = useState("");
    const [filterPalletRef, setFilterPalletRef] = useState("");
    const [filterDeliveryNote, setFilterDeliveryNote] = useState("");
    const [query, setQuery] = useState("");

    const [filterActive, setFilterActive] = useState(false);
    const [openConfirmation, setOpenConfirmation] = useState(false)
    const [currentId, setCurrentId] = useState(null)


    useEffect(() => {
        async function fetchData() {

            setReports(["start"])

            const { data } = await qcareApi.get(`/report?page=${page}`)

            const reports = data.reports.map(report => {
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
        }

        async function fetchFilter() {

            setReports(["start"])

            const { data } = await qcareApi.get(`/report/filter/search?page=${page}${query}`)

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

            setReports(reports || [])
            setTotalPages(data.totalPages)

            setLoo(false)

        }

        if (filterActive) {
            fetchFilter()
        } else {
            fetchData()
        }

    }, [removed, page, filterActive, query])


    const handleRemove = async (currentId) => {

        if(currentId === null) return

        setLoo(true)

        try {

            await qcareApi.get(`/report/delete/${currentId}`);
            setRemoved(!removed)
            setOpenConfirmation(false)
            setLoo(false)

        } catch (error) {
            console.log(error)
            setOpenConfirmation(false)
            setLoo(false)
        }
    }

    const checkedBtn = () => {
        document.getElementById("search").checked = false
    }


    /* ------------------------- FILTER ------------------------- */

    const refresh = (item) => {

        switch (item) {
            case "supplier":
                setFilterSupplier("")
                break;
            case "palletRef":
                setFilterPalletRef("")
                break;
            case "deliveryNote":
                setFilterDeliveryNote("")
                break;
            default:
                break;
        }
    };

    const selectFruit = (fruit) => {
        if (filterFruit.includes(fruit)) {
            setFilterFruit(f => filterFruit.filter(fru => fru !== fruit))
        } else {
            setFilterFruit(f => [...f, fruit])
        }
    };
    const selectScore = (score) => {
        if (filterScore.includes(score)) {
            setFilterScore(f => filterScore.filter(sco => sco !== score))
        } else {
            setFilterScore(f => [...f, score])
        }
    };

    const handleFilter = async () => {

        let newQuery = ""

        if (filterPalletRef.trim().length > 0) {
            const fullWord = filterPalletRef.trim().split(" ").join("+").toLowerCase()
            newQuery += `&palletRef=${fullWord}`
        }

        if (filterDeliveryNote.trim().length > 0) {
            const fullWord = filterDeliveryNote.trim().split(" ").join("+").toLowerCase()
            newQuery += `&deliveryNote=${fullWord}`
        }

        if (filterFruit.length > 0) {
            for (const fru of filterFruit) {
                newQuery += `&fruit=${fru}`
            }
        }

        if (filterScore.length > 0) {
            for (const sco of filterScore) {
                newQuery += `&score=${sco}`
            }
        }

        if (filterSupplier.trim().length > 0) {
            const fullWord = filterSupplier.trim().split(" ").join("+").toLowerCase()
            newQuery += `&supplier=${fullWord}`
        }

        if (newQuery.trim().length === 0) {
            return toast.error("No filter selected")
        }

        setQuery(newQuery)

        checkedBtn()
        setRemoved(!removed)
        setFilterActive(true)
        setPage(1)

    };


    const cleanFilter = () => {
        setFilterFruit([])
        setFilterScore([])
        setFilterSupplier("")
        setQuery("")
        setFilterActive(false)
    };

    /* ------------------------- FILTER ------------------------- */


    return (
        <div className="reports content">

            <main className="container">

                {
                    loo && <Spinner motive="loading" />
                }

                {
                    openConfirmation &&
                    <ModalConfirmation
                        msg="Are you sure you want to remove this Report?"
                        closeConfirmation={setOpenConfirmation}
                        action={() => handleRemove(currentId)}
                    />
                }

                <div className="reports__title mb-2">
                    <h2 className="main-title">All Reports</h2>
                    <div className="flex">
                        {
                            filterActive &&
                            <button
                                onClick={cleanFilter}
                                className="clear-filter mr-1">Clean Filter</button>
                        }

                        <p className="font-small mr-05">Filter</p>

                        <nav className="searching">
                            <div className="searching__container">
                                <div className="searching__menu">

                                    <label htmlFor="search" className="filter">
                                        <img src='./assets/img/filter-icon.svg' alt='filter-icon' />
                                    </label>

                                    <input type="checkbox" name="search" id="search" />
                                    <div className="searching__list px-3" name="search">
                                        <label htmlFor="search" className="close-icon">
                                            <img src="/assets/img/close-icon-black.svg" alt="close-icon" />
                                            <input type="checkbox" name="search" id="search" />
                                        </label>
                                        <h2 className="mb-2 ml-05">Filter by</h2>

                                        {/* Filter by Pallet Ref */}
                                        <p className="mb-05 font-small bold ml-05">Pallet Ref.:</p>
                                        <div className="filter-input mb-2">
                                            <input
                                                type='text'
                                                value={filterPalletRef}
                                                onChange={(e) => setFilterPalletRef(e.target.value)}
                                            />
                                            <button className="ml-05"
                                                onClick={() => refresh('palletRef')}
                                            >
                                                <img src='assets/img/close-icon.svg' alt="close-supplier" />
                                            </button>
                                        </div>


                                        {/* Filter by Delivery Note */}
                                        <p className="mb-05 font-small bold ml-05">Delivery Note:</p>
                                        <div className="filter-input mb-2">
                                            <input
                                                type='text'
                                                value={filterDeliveryNote}
                                                onChange={(e) => setFilterDeliveryNote(e.target.value)}
                                            />
                                            <button className="ml-05"
                                                onClick={() => refresh('deliveryNote')}
                                            >
                                                <img src='assets/img/close-icon.svg' alt="close-supplier" />
                                            </button>
                                        </div>


                                        {/* Filter by Product */}
                                        <p className="mb-05 font-small bold ml-05">Product:</p>
                                        <div className="filter-grid mb-2">
                                            {
                                                fruitList.map((fru, index) => (
                                                    <SearchList
                                                        key={index}
                                                        itemName={fru}
                                                        selectFruit={selectFruit}
                                                        filterActive={filterActive}
                                                    />
                                                ))
                                            }
                                        </div>

                                        <p className="mb-05 font-small bold ml-05">Score:</p>
                                        <div className="filter-grid mb-2">
                                            {
                                                scoreList.map((score, index) => (
                                                    <SearchList
                                                        key={index}
                                                        itemName={score}
                                                        selectFruit={selectScore}
                                                        filterActive={filterActive}
                                                    />
                                                ))
                                            }
                                        </div>

                                        {/* Filter by Supplier */}
                                        <p className="mb-05 font-small bold ml-05">Supplier:</p>
                                        <div className="filter-input mb-2">
                                            <input
                                                type='text'
                                                // ref={inputRef}
                                                value={filterSupplier}
                                                // onClick={handleSelect}
                                                onChange={(e) => setFilterSupplier(e.target.value)}
                                            />
                                            <button className="ml-05"
                                                onClick={() => refresh('supplier')}
                                            >
                                                <img src='assets/img/close-icon.svg' alt="close-supplier" />
                                            </button>
                                        </div>


                                        {/* Search Button */}
                                        <button
                                            className="mt-2 btn-primary outline shadow"
                                            onClick={handleFilter}
                                        >Search
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </nav>

                    </div>
                </div>


                {
                    (reports[0] === "start")
                        ? <Charging />
                        : reports.length === 0
                            ? <p className="text-center">No reports</p>
                            :
                            <div>
                                <div className="reports__list">
                                    {
                                        reports.map(report =>  (
                                                <CardReport
                                                    key={report.id}
                                                    setOpenConfirmation={setOpenConfirmation}
                                                    setCurrentId={setCurrentId}
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
                            </div>


                }

            </main>

        </div>
    );
}
