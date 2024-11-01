"use client";

import { useState, useRef } from "react";

export default function AdvancedFilter({
  availableTags = [],
  searchParams,
  updateUrl,
  defaultValues = { tags: [], tagMatchType: "all" },
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentTags = searchParams.getAll("tags[]");
  const currentMatchType =
    searchParams.get("tagMatchType") || defaultValues.tagMatchType;

  const handleTagClick = (tag) => {
    const newTags = currentTags.includes(tag)
      ? currentTags.filter((t) => t !== tag)
      : [...currentTags, tag];

    // Only update if different from default
    const updates = {
      "tags[]": newTags,
      tagMatchType:
        currentMatchType !== defaultValues.tagMatchType
          ? currentMatchType
          : null,
    };

    if (newTags.length === 0) {
      updates.tagMatchType = null;
    }

    updateUrl(updates);
  };

  const handleMatchTypeChange = (newMatchType) => {
    // Only update if there are tags selected or if match type is different from default
    if (currentTags.length > 0 || newMatchType !== defaultValues.tagMatchType) {
      updateUrl({
        "tags[]": currentTags,
        tagMatchType: newMatchType,
      });
    }
  };

  const clearAllTags = () => {
    updateUrl({
      "tags[]": defaultValues.tags,
      tagMatchType: null,
    });
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2.5 bg-green-800 
                 text-white border border-green-700 rounded-lg 
                 shadow-lg hover:bg-green-700 transition-all duration-200
                 focus:outline-none focus:ring-2 focus:ring-green-500 
                 focus:ring-opacity-50"
      >
        <span className="font-medium">Filter by Tags</span>
        {currentTags.length > 0 && (
          <span
            className="inline-flex items-center justify-center w-6 h-6 
                         text-xs font-semibold text-green-800 bg-white 
                         rounded-full shadow-inner"
          >
            {currentTags.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          className="absolute z-50 mt-2 w-80 bg-white rounded-xl 
                      shadow-xl border border-green-100 transform 
                      transition-all duration-200 ease-out"
        >
          <div className="p-5 space-y-4">
            <div
              className="flex items-center justify-between border-b 
                          border-green-100 pb-3"
            >
              <h3 className="text-lg font-semibold text-green-800">
                Tag Filters
              </h3>
              {currentTags.length > 0 && (
                <button
                  onClick={clearAllTags}
                  className="text-sm text-red-600 hover:text-red-700 
                           font-medium transition-colors duration-200"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-green-800">Match Type</p>
              <div className="flex space-x-6">
                <label
                  className="flex items-center space-x-2 text-sm 
                                cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="tagMatchType"
                    value="all"
                    checked={currentMatchType === "all"}
                    onChange={(e) => handleMatchTypeChange(e.target.value)}
                    className="text-green-800 focus:ring-green-700 
                             focus:ring-offset-0 cursor-pointer"
                  />
                  <span
                    className="text-gray-700 group-hover:text-green-800 
                                 transition-colors duration-200"
                  >
                    All tags
                  </span>
                </label>
                <label
                  className="flex items-center space-x-2 text-sm 
                                cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="tagMatchType"
                    value="any"
                    checked={currentMatchType === "any"}
                    onChange={(e) => handleMatchTypeChange(e.target.value)}
                    className="text-green-800 focus:ring-green-700 
                             focus:ring-offset-0 cursor-pointer"
                  />
                  <span
                    className="text-gray-700 group-hover:text-green-800 
                                 transition-colors duration-200"
                  >
                    Any tag
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-[#0c3a2da5]">
                Available Tags
              </p>
              <div
                className="max-h-64 overflow-y-auto pr-1 
                            scrollbar-thin scrollbar-thumb-green-800 
                            scrollbar-track-green-100"
              >
                <div className="grid grid-cols-2 gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      className={`px-3 py-2.5 rounded-lg text-sm text-left 
                                transition-all duration-200 font-medium
                                hover:shadow-md ${
                                  currentTags.includes(tag)
                                    ? "bg-[#0c3b2ef4] text-white hover:bg-green-700"
                                    : "bg-green-50 text-green-800 hover:bg-green-100"
                                }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
