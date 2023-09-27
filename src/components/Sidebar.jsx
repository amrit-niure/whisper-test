'use client'
import React from 'react';

const Sidebar = () => {
  // Mock data for friends and groups
  const friends = [
    { id: 1, name: 'Friend 1' },
    { id: 2, name: 'Friend 2' },
    // Add more friends here
  ];

  const groups = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    // Add more groups here
  ];

  return (
    <div className="w-1/4 bg-gray-200 h-[60vh]">
      {/* Add Friend Section */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">Add Friend</h2>
        <input
          type="text"
          placeholder="Add friend by email"
          className="w-full rounded-lg p-2 border border-gray-300 mb-2"
        />
         <button className="bg-blue-500 text-white rounded-lg py-2 px-4">
       Add
        </button>
        {/* Add friend search and add functionality */}
      </div>

      {/* Create Group Section */}
      <div className="px-4">
        <h2 className="text-lg font-semibold mb-2">Create Group</h2>
        <input
          type="text"
          placeholder="Group name"
          className="w-full rounded-lg p-2 border border-gray-300 mb-2"
        />
        <button className="bg-blue-500 text-white rounded-lg py-2 px-4">
          Create Group
        </button>
        {/* Add group creation functionality */}
      </div>

      {/* Friends List */}
      <div className="py-2 px-4">
        <h2 className="text-lg font-semibold mb-2">Friends</h2>
        <ul>
          {friends.map((friend) => (
            <li
              key={friend.id}
              className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              <span>{friend.name}</span>
              {/* Add functionality to open chat with friend */}
            </li>
          ))}
        </ul>
      </div>

      {/* Groups List */}
      <div className="px-4">
        <h2 className="text-lg font-semibold mb-2">Groups</h2>
        <ul>
          {groups.map((group) => (
            <li
              key={group.id}
              className="flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-300"
            >
              <span>{group.name}</span>
              {/* Add functionality to open group chat */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
