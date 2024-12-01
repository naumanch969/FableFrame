"use client"

import React, { useEffect, useState } from "react";

interface StoryProps {
  id: string;
  title: string;
  content: string;
  authorName: string;
  genre: string;
  imageStyle: string;
  ageCategory: string;
  coverImage: string;
  type: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  status: string;
  viewsCount: number;
  readingTime?: number;
  ratingsAverage: number;
  reportsCount: number;
}

const Story: React.FC<StoryProps> = ({
  title,
  content,
  authorName,
  genre,
  imageStyle,
  ageCategory,
  coverImage,
  type,
  isPublic,
  createdAt,
  status,
  viewsCount,
  readingTime,
  ratingsAverage,
  reportsCount,
}) => {
  const [clientSide, setClientSide] = useState(false);

  useEffect(() => {
    setClientSide(true); // Ensures client-side rendering after initial render
  }, []);

  // Ensure ratingsAverage is handled correctly and avoid hydration issues
  const formattedRating = ratingsAverage ? ratingsAverage.toFixed(1) : "N/A";

  return (
    <div className="p-6 max-w-3xl mx-auto bg-purple-100 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={coverImage}
          alt={`${title} cover`}
          className="w-24 h-24 rounded-lg shadow-md mr-4"
        />
        <div>
          <h1 className="text-2xl font-bold text-purple-800">{title}</h1>
          <p className="text-sm text-purple-600">By: {authorName}</p>
        </div>
      </div>

      <p className="text-purple-700 mb-4">
        <span className="font-semibold">Genre:</span> {genre}
      </p>
      <p className="text-purple-700 mb-4">
        <span className="font-semibold">Image Style:</span> {imageStyle}
      </p>
      <p className="text-purple-700 mb-4">
        <span className="font-semibold">Age Category:</span> {ageCategory}
      </p>
      <p className="text-purple-700 mb-4">
          <span className="font-semibold">Type:</span> {type}
        </p>
        <p className="text-purple-700 mb-4">
          <span className="font-semibold">Status:</span> {status}
        </p>
        <p className="text-purple-700 mb-4">
          <span className="font-semibold">Created At:</span>{" "}
          {new Date(createdAt).toLocaleDateString()}
        </p>
        <p className="text-purple-700 mb-4">
          <span className="font-semibold">Views:</span> {viewsCount}
        </p>
        <p className="text-purple-700 mb-4">
          <span className="font-semibold">Reading Time:</span>{" "}
          {readingTime ? `${readingTime} mins` : "N/A"}
        </p>
        <p className="text-purple-700 mb-4">
          <span className="font-semibold">Ratings:</span> {formattedRating} / 5
        </p>
        <p className="text-purple-700 mb-4">
          <span className="font-semibold">Reports:</span> {reportsCount}
        </p>

      <p className="text-purple-900 mb-4 whitespace-pre-line">{content}</p>

      <div className="mt-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isPublic}
            readOnly
            className="form-checkbox text-purple-600"
          />
          <span className="ml-2 text-purple-700">
            {isPublic ? "Public" : "Private"}
          </span>
        </label>
      </div>

      <div className="mt-6">
        <button className="bg-purple-700 text-white px-4 py-2 rounded-lg shadow hover:bg-purple-800">
          Edit Story
        </button>
        <button className="ml-4 bg-red-600 text-white px-4 py-2 rounded-lg shadow hover:bg-red-700">
          Delete Story
        </button>
      </div>
    </div>
  );
};

export default Story;
