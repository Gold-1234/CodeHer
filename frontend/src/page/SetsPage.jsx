import React, { useState, useEffect } from 'react';

/**
 * MOCK API: Fetches lists created by the user.
 */
const fetchUserListsAPI = async () => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  return [
    {
      id: 'user-list-1',
      name: 'Interview Prep Sheet',
      problems: [
        { id: 'p1', title: 'Two Sum' },
        { id: 'p6', title: 'Number of Islands' },
        { id: 'p11', title: '3Sum' },
      ],
    },
    {
      id: 'user-list-2',
      name: 'Weekend Practice',
      problems: [],
    },
  ];
};

/**
 * MOCK API: Fetches pre-made sets for all users to explore.
 */
const fetchExploreSetsAPI = async () => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  return [
    {
      id: 'set-1',
      name: 'Dynamic Programming Basics',
      problems: [
        { id: 'p1', title: 'Fibonacci Number' },
        { id: 'p2', title: 'Climbing Stairs' },
        { id: 'p3', title: 'Coin Change' },
        { id: 'p4', title: 'Longest Increasing Subsequence' },
        { id: 'p5', title: 'Knapsack Problem' },
      ],
    },
    {
      id: 'set-2',
      name: 'Graph Traversal',
      problems: [
        { id: 'p6', title: 'Number of Islands' },
        { id: 'p7', title: 'Course Schedule' },
        { id: 'p8', title: 'Rotting Oranges' },
      ],
    },
    {
      id: 'set-3',
      name: 'Two Pointers',
      problems: [
        { id: 'p10', title: 'Two Sum II' },
        { id: 'p11', title: '3Sum' },
        { id: 'p12', title: 'Container With Most Water' },
      ],
    },
  ];
};


export const SetsPage = () => {
  // State for user-created lists and pre-made explore sets
  const [userLists, setUserLists] = useState([]);
  const [exploreSets, setExploreSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch both user lists and explore sets when the component mounts
  useEffect(() => {
    const getAllData = async () => {
      try {
        // Fetch both sets of data in parallel for efficiency
        const [userListsData, exploreSetsData] = await Promise.all([
          fetchUserListsAPI(),
          fetchExploreSetsAPI(),
        ]);
        setUserLists(userListsData);
        setExploreSets(exploreSetsData);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    getAllData();
  }, []); // Empty dependency array ensures this runs only once

  // Render a loading spinner while fetching data
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  // Render an error message if the fetch fails
  if (error) {
    return (
      <div role="alert" className="alert alert-error max-w-lg mx-auto mt-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8">
      {/* Section 1: My Lists */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 border-b pb-3">My Lists</h2>
        {userLists.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {userLists.map(list => (
              <div key={list.id} className="card bg-base-200 shadow-xl hover:shadow-primary/20 transition-shadow duration-300">
                <div className="card-body">
                  <h3 className="card-title text-2xl">{list.name}</h3>
                  <p className="text-base-content/70">{list.problems?.length || 0} problems</p>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary btn-outline">Edit List</button>
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

      {/* Section 2: Explore */}
      <section>
        <h2 className="text-3xl font-bold mb-6 border-b pb-3">Explore</h2>
        {exploreSets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exploreSets.map(set => (
              <div key={set.id} className="card bg-base-200 shadow-xl hover:shadow-primary/20 transition-shadow duration-300">
                <div className="card-body">
                  <h3 className="card-title text-2xl">{set.name}</h3>
                  <p className="text-base-content/70">Contains {set.problems?.length || 0} problems</p>
                  <div className="card-actions justify-end mt-4">
                    <button className="btn btn-primary">Start Set</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-lg text-base-content/70 mt-16">No pre-made sets are available right now.</p>
        )}
      </section>
    </div>
  );
};