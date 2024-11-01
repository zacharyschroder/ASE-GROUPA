"use client";

import Link from "next/link";
import Gallery from "./Gallery";
import { useState } from "react";

// Highlight text function
function highlightText(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query})`, "gi");
  return text.split(regex).map((part, index) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <span key={index} className="bg-red-200">
        {part}
      </span>
    ) : (
      part
    )
  );
}

export default function RecipeCard({ recipe, searchQuery = "" }) {
  const [isHovered, setIsHovered] = useState(false);
  const images = Array.isArray(recipe?.images) ? recipe.images : [];

  return (
    <div
      className="bg-white rounded-3xl shadow-md overflow-hidden transition-all duration-500 hover:shadow-lg hover:scale-[1.02] flex flex-col justify-between"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden object-contain">
        <Gallery images={images} />
        <div
          className={`absolute bottom-0 left-0 right-0 p-2 bg-black bg-opacity-75 text-white text-sm transition-all duration-500 transform ${
            isHovered
              ? "translate-y-0 opacity-100"
              : "translate-y-full opacity-0"
          }`}
        >
          {recipe.description.length > 100 ? (
            <>
              {highlightText(recipe.description.slice(0, 100), searchQuery)}
              <span className="text-sm text-green-400 cursor-pointer">
                <Link href={`/recipes/${recipe._id}`}>...read more</Link>
              </span>
            </>
          ) : (
            highlightText(recipe.description, searchQuery)
          )}
        </div>
      </div>

      {/* Text Section */}
      <div className="p-4 flex-grow flex flex-col justify-between text-center">
        <div>
          <h3 className="font-bold text-lg text-[#6D9773] mb-2 line-clamp-2">
            {highlightText(recipe.title, searchQuery)}
          </h3>
        </div>
        <div>
          <h3 className="font-light text-sm text-[#6D9773] mb-2 line-clamp-2">
            {new Date(recipe.published).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
        </div>
        <div>
          <h3 className="font-light text-sm text-[#6D9773] mb-2 line-clamp-2">
            {recipe.instructions.length}{" "}
            {recipe.instructions.length === 1 ? "instruction" : "instructions"}
          </h3>
        </div>

        {/* Prep, Cook, and Serves */}
        <div className="flex justify-center space-x-8 text-xs text-gray-500 mb-4">
          {/* Prep Time */}
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 512 512"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5 text-[#0C3B2E]"
            >
              <path
                fill="#0C3B2E"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M512,200.388c-0.016-63.431-51.406-114.828-114.845-114.836c-11.782-0.008-23.118,1.952-33.846,5.275
              C338.408,58.998,299.57,38.497,256,38.497c-43.57,0-82.408,20.501-107.309,52.329c-10.737-3.322-22.073-5.283-33.846-5.275
              C51.406,85.56,0.016,136.957,0,200.388c0.008,54.121,37.46,99.352,87.837,111.523c-11.368,35.548-21.594,81.104-21.538,140.848v20.744
              h379.402v-20.744c0.056-59.744-10.169-105.3-21.538-140.848C474.54,299.741,511.984,254.509,512,200.388z M449.023,252.265
              c-13.322,13.297-31.505,21.456-51.803,21.48l-0.51-0.007l-30.524-0.77l10.534,28.66c11.977,32.704,24.464,72.928,27,130.387
              H108.281c2.536-57.459,15.023-97.683,27-130.387l10.534-28.669l-31.043,0.786c-20.29-0.024-38.473-8.184-51.803-21.48
              c-13.305-13.338-21.473-31.546-21.481-51.876c0.008-20.322,8.176-38.53,21.481-51.867c13.346-13.306,31.554-21.473,51.876-21.482
              c11.725,0.008,22.689,2.731,32.493,7.577l17.251,8.54l9.804-16.571C190.956,98.663,221.222,79.977,256,79.985
              c34.778-0.008,65.044,18.678,81.606,46.601l9.796,16.571l17.26-8.54c9.804-4.846,20.761-7.568,32.493-7.577
              c20.322,0.008,38.531,8.176,51.876,21.482c13.305,13.338,21.473,31.545,21.481,51.867
              C470.505,220.719,462.337,238.927,449.023,252.265z"
              />
            </svg>

            <span className="mt-2 font-semibold text-sm">Prep:</span>
            <span>{recipe.prep} mins</span>
          </div>

          {/* Cook Time */}
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 256 256"
              strokeWidth="1.0"
              stroke="currentColor"
              className="w-5 h-5 text-[#0C3B2E]"
            >
              <path
                fill="#0C3B2E"
                d="M76,40V16a12,12,0,0,1,24,0V40a12,12,0,0,1-24,0Zm52,12a12,12,0,0,0,12-12V16a12,12,0,0,0-24,0V40A12,12,0,0,0,128,52Zm40,0a12,12,0,0,0,12-12V16a12,12,0,0,0-24,0V40A12,12,0,0,0,168,52Zm83.2002,53.6001L224,126v58a36.04061,36.04061,0,0,1-36,36H68a36.04061,36.04061,0,0,1-36-36V126L4.7998,105.6001A12.0002,12.0002,0,0,1,19.2002,86.3999L32,96V88A20.02229,20.02229,0,0,1,52,68H204a20.02229,20.02229,0,0,1,20,20v8l12.7998-9.6001a12.0002,12.0002,0,0,1,14.4004,19.2002ZM200,92H56v92a12.01375,12.01375,0,0,0,12,12H188a12.01375,12.01375,0,0,0,12-12Z"
              />
            </svg>
            <span className="mt-2 font-semibold text-sm">Cook:</span>
            <span>{recipe.cook} mins</span>
          </div>

          {/* Servings (Plate Icon) */}
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64px"
              height="64px"
              viewBox="0 -4.83 52 52"
              fill="none"
              strokeWidth="2"
              stroke="currentColor"
              className="w-5 h-5 text-[#0C3B2E]"
            >
              <g
                id="Group_49"
                data-name="Group 49"
                transform="translate(-788.946 -1785.428)"
              >
                <path
                  id="Path_131"
                  data-name="Path 131"
                  d="M814.946,1793.095a24,24,0,0,0-24,24h48A24,24,0,0,0,814.946,1793.095Z"
                  fill="#ffffff"
                  stroke="#0C3B2E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="5"
                ></path>
                <line
                  id="Line_51"
                  data-name="Line 51"
                  x2="48"
                  transform="translate(790.946 1825.761)"
                  fill="#ffffff"
                  stroke="#0C3B2E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="5"
                ></line>
                <line
                  id="Line_52"
                  data-name="Line 52"
                  y2="5.667"
                  transform="translate(814.946 1787.428)"
                  fill="#ffffff"
                  stroke="#0C3B2E"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="5"
                ></line>
              </g>
            </svg>
            <span className="mt-2 font-semibold text-sm">Serves:</span>
            <span>{recipe.servings} people</span>
          </div>
        </div>

        {/* View Recipe Button */}
        <Link
          href={`/recipes/${recipe._id}`}
          className="w-[85%] mx-auto block text-center bg-[#DB8C28] text-white font-semibold py-2 rounded-full shadow hover:bg-[#0C3B2E] transition-colors mt-auto"
        >
          View Recipe
        </Link>
      </div>
    </div>
  );
}
