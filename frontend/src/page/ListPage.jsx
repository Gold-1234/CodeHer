import { useListStore } from '@/store/useListStore'
import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

export const ListPage = () => {
  const { id } = useParams()
  const { getCurrentList, list } = useListStore()

  useEffect(() => {
    getCurrentList(id)
  }, [])

  return (
    <div className='flex text-black dark:text-white w-full items-center justify-center h-full'>
      <div className='grid grid-cols-[auto_1fr] min-w-screen h-full w-full'>
       
        {list?.data ? (
          <div className=' w-screen p-10'>
            <div className="mb-8 flex flex-row items-end justify-around">
              <h1 className="text-4xl font-bold mb-4">{list.data.name}</h1>
              {list.data.description && (
                <p className="text-lg text-base-content/70 mb-6">{list.data.description}</p>
              )}
              <div className="stats stats-vertical lg:stats-horizontal shadow">
                <div className="stat">
                  <div className="stat-title">Total Problems</div>
                  <div className="stat-value">{list.data.problems?.length || 0}</div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-6">Problems</h2>
              {list.data.problems && list.data.problems.length > 0 ? (
                <div className="grid gap-4">
                  {list.data.problems.map((problemInList, index) => (
                    <div key={problemInList.id} className="card bg-base-100 shadow-lg">
                      <div className="card-body">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="card-title text-xl">
                              {index + 1}. {problemInList.problem.title}
                            </h3>
                            <div className="flex items-center gap-4 mt-2">
                              <div className={`capitalize text-sm font-semibold ${
                                problemInList.problem.difficulty === 'EASY' ? 'text-green-400' :
                                problemInList.problem.difficulty === 'MEDIUM' ? 'text-orange-400' :
                                'text-red-400'
                              }`}>
                                {problemInList.problem.difficulty.toLowerCase()}
                              </div>
                              {problemInList.problem.tags && problemInList.problem.tags.length > 0 && (
                                <div className="flex gap-2 flex-wrap justify-start items-center">
                                  {problemInList.problem.tags.slice(0, 2).map((tag, tagIndex) => (
                                    <div key={tagIndex} className="bg-secondary text-white text-xs px-3 py-1 rounded-full min-w-max">
                                      {tag}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                          <Link
                            to={`/problem/id/${problemInList.problem.id}`}
                            className="btn btn-primary btn-sm"
                          >
                            Solve Problem
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-base-200 rounded-lg">
                  <p className="text-lg text-base-content/70">No problems in this list yet.</p>
                  <p className="text-sm text-base-content/50 mt-2">
                    Add problems to this list from the problem browser.
                  </p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="loading loading-spinner loading-lg"></div>
            <p className="mt-4 text-base-content/70">Loading list details...</p>
          </div>
        )}
      </div>
    </div>
  )
}
