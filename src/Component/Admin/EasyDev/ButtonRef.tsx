import React, { useEffect, useRef, useState } from "react";

type Props = {};

function ButtonRef({}: Props) {
  const [first, setfirst] = useState("");
  const firstRef = useRef("");
  const renderRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    firstRef.current = first;
  }, [first]);
  function doFocus() {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }
  useEffect(() => {
    renderRef.current = renderRef.current + 1;
  });
  return (
    <div className="mx-10">
      <div>
        INPUT BOX:
        <input
          className="border-2 px-2 border-black bg-slate-500 text-white"
          ref={inputRef}
          type="text"
          value={first}
          onChange={(e) => setfirst(e.target.value)}
        />
      </div>
      <p>
        first is: <span className="font-bold px-1">{first}</span>, first used to
        be: <span className="font-bold px-1">{firstRef.current}</span> .
      </p>
      <button
        type="button"
        className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        onClick={doFocus}
      >
        Focus
      </button>
      <p>render: {renderRef.current}</p>
    </div>
  );
}

export default ButtonRef;
