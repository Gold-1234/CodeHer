import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@/store/useAuthStore'
import { useSubimissionStore } from '@/store/useSubmissionStore'
import { useListStore } from '@/store/useListStore'

export const ProfilePage = () => {
  const { authUser, updateAvatar } = useAuthStore()
  const { getSubmissions, isSubmitted, userSubmissions } = useSubimissionStore()
  const { fetchList, userLists } = useListStore()
  const [showAvatarSelector, setShowAvatarSelector] = useState(false)

  // Array of available avatar options
  const avatarOptions = [
    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png",
    "https://cdn.pixabay.com/photo/2016/08/20/05/38/avatar-1606916_640.png",
    "https://cdn.pixabay.com/photo/2016/08/20/05/36/avatar-1606914_640.png",
    "https://cdn.pixabay.com/photo/2022/07/18/20/51/guy-7330788_960_720.png",
    "https://cdn.pixabay.com/photo/2022/07/26/20/53/guy-7346668_1280.png",
    "https://cdn.pixabay.com/photo/2022/08/19/19/29/anime-7397617_1280.png",
    "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027366_640.png",
    "https://cdn.pixabay.com/photo/2017/01/31/21/23/avatar-2027365_640.png",
    
  ]

  useEffect(() => {
    // Fetch submissions and lists data for stats
    getSubmissions()
    fetchList()
  }, [])

  const handleAvatarSelect = async (avatarUrl) => {
    await updateAvatar(avatarUrl)
    setShowAvatarSelector(false)
  }

  if (!authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className='flex text-black dark:text-white w-full items-center justify-center h-full'>
      <div className='grid grid-cols-[auto_1fr] w-full h-full'>
        <div className='h-full w-fit'>
          {/* Sidebar space */}
        </div>
        <div className='text-secondary-content w-full flex flex-col p-8'>
          <div className="max-w-4xl mx-auto w-full">
            <div className="mb-8">
              <h1 className="text-4xl font-bold mb-4">Profile</h1>
              <p className="text-lg text-base-content/70">Manage your account settings and preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Info Card */}
              <div className="lg:col-span-2">
                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <h2 className="card-title text-2xl mb-6">Profile Information</h2>

                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img
                              src={authUser?.image || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
                              alt="Profile"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold">{authUser?.name || 'User'}</h3>
                          <p className="text-base-content/70">{authUser?.email}</p>
                          <div className="badge badge-primary mt-1">
                            {authUser?.role || 'USER'}
                          </div>
                          <button
                            className="btn btn-sm btn-outline mt-2"
                            onClick={() => setShowAvatarSelector(!showAvatarSelector)}
                          >
                            Change Avatar
                          </button>
                        </div>
                      </div>

                      {/* Avatar Selector */}
                      {showAvatarSelector && (
                        <div className="mt-6 p-4 bg-base-200 rounded-lg">
                          <h4 className="font-semibold mb-4">Choose Avatar</h4>
                          <div className="grid grid-cols-4 gap-4">
                            {avatarOptions.map((avatar, index) => (
                              <div
                                key={index}
                                className="avatar cursor-pointer hover:scale-110 transition-transform"
                                onClick={() => handleAvatarSelect(avatar)}
                              >
                                <div className="w-16 rounded-full ring ring-base-300 ring-offset-base-100 ring-offset-2">
                                  <img src={avatar} alt={`Avatar ${index + 1}`} />
                                </div>
                              </div>
                            ))}
                          </div>
                          <button
                            className="btn btn-sm btn-ghost mt-4"
                            onClick={() => setShowAvatarSelector(false)}
                          >
                            Cancel
                          </button>
                        </div>
                      )}

                      <div className="divider"></div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="label">
                            <span className="label-text font-semibold">Name</span>
                          </label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={authUser?.name || ''}
                            readOnly
                          />
                        </div>

                        <div>
                          <label className="label">
                            <span className="label-text font-semibold">Email</span>
                          </label>
                          <input
                            type="email"
                            className="input input-bordered w-full"
                            value={authUser?.email || ''}
                            readOnly
                          />
                        </div>

                        <div>
                          <label className="label">
                            <span className="label-text font-semibold">Role</span>
                          </label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={authUser?.role || 'USER'}
                            readOnly
                          />
                        </div>

                        <div>
                          <label className="label">
                            <span className="label-text font-semibold">Member Since</span>
                          </label>
                          <input
                            type="text"
                            className="input input-bordered w-full"
                            value={authUser?.createdAt ? new Date(authUser.createdAt).toLocaleDateString() : 'N/A'}
                            readOnly
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Card */}
              <div className="lg:col-span-1">
                <div className="card bg-base-100 shadow-lg">
                  <div className="card-body">
                    <h3 className="card-title text-xl">Quick Stats</h3>
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">{isSubmitted?.length || 0}</div>
                        <p className="text-sm text-base-content/70">Problems Solved</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-secondary">{userLists?.length || 0}</div>
                        <p className="text-sm text-base-content/70">Lists Created</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent">{isSubmitted?.length || 0}</div>
                        <p className="text-sm text-base-content/70">Submissions</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
