import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import DatePicker from "react-datepicker";

import qcareApi from '../../api/qcareApi'
import { CardLifeTest } from '../CardLifeTest'
import { Charging } from '../ui/Charging'
import { Pagination } from '../ui/Pagination'

export const LifeTestPage = () => {

  const [lifeTest, setLifeTest] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [page, setPage] = useState(1)

  // -------------------------------- Filter --------------------------------
  const [filterActive, setFilterActive] = useState(false);
  const [filterPalletRef, setFilterPalletRef] = useState("");
  const [filterGrower, setFilterGrower] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // -------------------------------- Filter --------------------------------


  useEffect(() => {

    const fetchLifeTest = async () => {

      setLifeTest('loading')

      try {
        const { data } = await qcareApi.get(`/life-test?page=${page}`)
        setLifeTest(data.allLifeTest)
        setTotalPages(data.totalPages)

      } catch (error) {
        console.log(error)
        setLifeTest([])
      }
    };

    fetchLifeTest()

  }, [page])


  // -------------------------------- Filter --------------------------------


  const refresh = (item) => {
    switch (item) {
      case "date":
        setStartDate(null)
        setEndDate(null)
        break;
      case "palletRef":
        setFilterPalletRef("")
        break;
      case "grower":
        setFilterGrower("")
        break;
      default:
        break;
    }
  };

  const checkedBtn = () => {
    document.getElementById("search").checked = false
  }

  const handleFilter = async () => {

    console.log(startDate.toLocaleDateString('en-US'))
    console.log(endDate.toLocaleDateString('en-US'))
    console.log(filterPalletRef)
    console.log(filterGrower)

    return


    checkedBtn()
    setFilterActive(true)
    setPage(1)
  };


  const cleanFilter = () => {
    setFilterActive(false)
  };

  // -------------------------------- Filter --------------------------------

  return (
    <div className="content">

      <main className="container lifetest">
        <div className='mb-2 flex-space-between'>
          <h2 className="main-title">Shelf Life Test</h2>
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


                    {/* Filter by Date */}
                    <p className="mb-02 font-small bold ml-05">Date:</p>
                    <div className="filter-input mb-2">

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
                        className="date-input date-filter"
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


                      <button className="ml-05"
                        onClick={() => refresh('date')}
                      >
                        <img src='assets/img/close-icon.svg' alt="close-supplier" />
                      </button>
                    </div>



                    {/* Filter by Pallet Ref */}
                    <p className="mb-02 font-small bold ml-05">Pallet Ref.:</p>
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



                    {/* Filter by Grower */}
                    <p className="mb-02 font-small bold ml-05">Grower:</p>
                    <div className="filter-input mb-2">
                      <input
                        type='text'
                        value={filterGrower}
                        onChange={(e) => setFilterGrower(e.target.value)}
                      />
                      <button className="ml-05"
                        onClick={() => refresh('grower')}
                      >
                        <img src='assets/img/close-icon.svg' alt="close-supplier" />
                      </button>
                    </div>



                    {/* Filter by Grower */}
                    <p className="mb-02 font-small bold ml-05">Status:</p>
                    <div className="filter-input status-grid mb-2">
                      <div className='stat-pending'>PENDING</div>
                      <div className='stat-in-process'>IN PROCESS</div>
                      <div className='stat-done'>DONE</div>
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
          (lifeTest === "loading")
            ? <Charging />
            : lifeTest.length === 0
              ? <p className="text-center">No Life Tests</p>
              :
              <div>
                <div className="lifetest__list">
                  <div className="life-item py-02 mb-05 bg-grey border-round">
                    <p className='life-status font-small bold pl-05'>Status</p>
                    <p className='life-title ml-1 font-small bold'>Report Info</p>
                    <p className='life-days font-small bold'>Days</p>
                  </div>
                  {
                    lifeTest.map(test => (
                      <CardLifeTest
                        key={uuidv4()}
                        {...test}
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
  )
}
