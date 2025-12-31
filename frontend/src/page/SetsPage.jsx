import React, { useState, useEffect } from 'react';
import { useHomePageStore } from '@/store/usehomePageStore';
import { useListStore } from '@/store/useListStore';
import { useNavigate } from 'react-router-dom';

export const SetsPage = () => {
  const navigate = useNavigate();
  const { getList, isLoading, lists } = useHomePageStore()
  const [error, setError] = useState(null);

  const openList = (id) => {
    navigate(`/home/list/${id}`)
  }
  useEffect(() => {
    getList()
  }, [getList]); 

  useEffect(() => {
    console.log("no user list ig")
    console.log(lists);
  }, [lists, getList])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  if (error) {
    return (
      <div role="alert" className="alert alert-error bg-transparent text-gray-600 border-0 max-w-lg mx-auto mt-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 border-b pb-3">My Lists</h2>
        {lists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lists.map(list => (
              <div key={list.id} className="card bg-base-200 shadow-xl hover:shadow-primary/20 transition-shadow duration-300"
              onClick={() => openList(list.id)}>
                <div className="card-body">
                  <h3 className="card-title text-2xl">{list.name}</h3>
                  <p className="text-base-content/70">{list.problems?.length || 0} problems</p>
                  <div className="card-actions mt-4 text-gray-300 font-semibold text-l">
                    {list.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 px-4 bg-base-200 rounded-lg">
            <p className="text-lg text-base-content/70">You haven't created any lists yet.</p>
            <button className="btn btn-primary mt-4">Create Your First List</button>
          </div>
        )}
      </section>

  
    </div>

  );
};
