import { useHomePageStore } from '@/store/usehomePageStore'
import { Trash } from 'lucide-react'
import { useEffect, useState } from 'react'

export const CreateList = ({ existingLists }) => {
  const {
    list,
    isCreatingList,
    toggleFloating,
    saveToExistingList,
    saveNewList,
    mode,
    setMode,
    removeFromList, 
    saveAll,  
    togglePush      
  } = useHomePageStore()

  const [selectedList, setSelectedList] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  useEffect(() => {
    console.log('selected list: ', selectedList);
  }, [selectedList])
  
  if (!isCreatingList) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-[450px] max-h-[80vh] overflow-y-auto">
        
        {/* Problems Preview */}
        <h3 className="font-bold mb-2">Problems to add</h3>
        {list.length > 0 ? (
          <ul className="mb-4 rounded">
            {list.map((p, idx) => (
              <li 
                key={idx} 
                className="flex justify-between items-center py-1 last:border-0 px-2 rounded-lg bg-gray-100 dark:bg-gray-700 mb-2"
              >
                <span>{p.title}</span>
                <button 
                  className="text-red-500 hover:text-red-700"
                  onClick={() => removeFromList(p.id)} // ⚡️ handle delete
                >
                  <Trash size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm mb-4 text-gray-500">No problems selected yet.</p>
        )}

        {mode === "select" && (
          <>
            {/* Select Existing List */}
            <h3 className="font-bold mb-2">Select a List</h3>
            <select
              className="select select-bordered w-full mb-4"
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
            >
              <option value="">-- Choose a list --</option>
              {existingLists.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>

            <div className="flex justify-between">
              <button 
                className="btn btn-primary" 
                disabled={!selectedList} 
                onClick={() => saveToExistingList(selectedList)}
              >
                Save to Selected
              </button>
              <button 
                className="btn btn-outline" 
                onClick={() => setMode("create")}
              >
                + Create New List
              </button>
            </div>
          </>
        )}

        {mode === "create" && (
          <>
            {/* Create New List */}
            <h3 className="font-bold mb-2">Create New List</h3>
            <input
              type="text"
              placeholder="List Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full mb-3"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full mb-3"
            />
            <div className="flex justify-between">
              <button 
                className="btn btn-secondary" 
                onClick={() => setMode("select")}
              >
                Back
              </button>
              <button 
                className="btn btn-primary" 
                onClick={() => saveNewList({ name, description })}
              >
                Save New List
              </button>
            </div>
          </>
        )}

        {/* ✅ Save All Button */}
        {/* {list.length > 0 && (
          <button 
            className="btn btn-success mt-4 w-full"
            onClick={saveAll}
          >
            Save All
          </button>
        )} */}

        <button 
          className="btn btn-error btn-sm mt-4 w-full" 
          onClick={togglePush}
        >
          Close
        </button>
      </div>
    </div>
  )
}