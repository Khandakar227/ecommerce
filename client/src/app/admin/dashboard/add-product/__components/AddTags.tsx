"use client";
import { ChangeEvent, useState } from "react";
import { AiOutlineClose } from 'react-icons/ai'
function AddTags({tags, setTags}:{tags: string [], setTags: (__tags:string[])=>void}) {
  // const [tags, setTags] = useState<string []>([]);

  function handleChange (e:ChangeEvent) {
    const el = (e.target as HTMLInputElement);
    setTags(el.value.split(","));
  }
  function deleteTag (tag:string) {
    const __tags = tags.filter(t => t !== tag);
    setTags(__tags);
  }
  return (
    <>
      <div className="py-2 flex items-center gap-2">
        {
            tags.map((tag, i) => tag &&
            <div key={i+ " tag"} className="flex gap-1 text-xs px-2 py-1 rounded bg-green-300">
                <span>{tag.trim()}</span>
                <span tabIndex={1} role="button" onClick={() => deleteTag(tag)} className="text-xs"><AiOutlineClose size={12} /></span>
            </div>
            )
        }
      </div>
      <div>
        <label className="text-sm font-medium pr-4" htmlFor="tags">
          Add tags (Seperated by comma):
        </label>
        <input
          className="w-full p-2 border shadow-sm rounded-md focus:border-green-600 outline-none"
          type="text"
          name="tags"
          id="tags"
          value={tags || ""}
          onChange={handleChange}
          required
        />
      </div>
    </>
  );
}

export default AddTags;
