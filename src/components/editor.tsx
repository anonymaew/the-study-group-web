// import 'katex/dist/katex.min.css';
import 'quill/dist/quill.snow.css';

// import katex from 'katex';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';

import { DocumentArrowDownIcon } from '@heroicons/react/20/solid';

const Editor = (props: {
  content: string;
  setContent: Dispatch<SetStateAction<string>>;
  save: () => void;
}) => {
  const { quill, Quill, quillRef } = useQuill({
    modules: {
      toolbar: "#toolbar",
      imageCompress: {
        quality: 0.7, // default
        maxWidth: 1000, // default
        maxHeight: 1000, // default
        imageType: "image/jpeg", // default
        debug: false,
        suppressErrorLogging: false, // default
        insertIntoEditor: undefined, // default
      },
    },
    theme: "snow",
  });

  useEffect(() => {
    // if (typeof window !== "undefined") window["katex"] = katex;
  }, []);

  useEffect(() => {
    if (quill) {
      quill.clipboard.dangerouslyPasteHTML(props.content);
      quill.on("text-change", () => {
        props.setContent(quill.root.innerHTML);
      });
    }
  }, [quill]);

  if (Quill && !quill) {
    Quill.register("modules/imageCompress", require("quill-image-compress"));
    Quill.register();
  }

  return (
    <div className="no-prose">
      <div id="toolbar" className="!sticky !top-24 !z-10 bg-zinc-300">
        <span className="ql-formats">
          <select className="ql-header">
            <option defaultValue="true"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-bold"></button>
          <button className="ql-italic"></button>
          <button className="ql-underline"></button>
          <button className="ql-strike"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-script" value="sub"></button>
          <button className="ql-script" value="super"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-header" value="2"></button>
          <button className="ql-blockquote"></button>
          <button className="ql-code-block"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-list" value="ordered"></button>
          <button className="ql-list" value="bullet"></button>
          <button className="ql-indent" value="-1"></button>
          <button className="ql-indent" value="+1"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-direction" value="rtl"></button>
          <select className="ql-align">
            <option defaultValue="true"></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </span>
        <span className="ql-formats">
          <button className="ql-link"></button>
          <button className="ql-image"></button>
          <button className="ql-video"></button>
        </span>
        <span className="ql-formats">
          <button className="ql-clean"></button>
        </span>
        <span className="ql-formats">
          <button className="group" onClick={props.save}>
            <DocumentArrowDownIcon className="aspect-square w-6 text-zinc-600 group-hover:text-blue-700" />
          </button>
        </span>
      </div>
      <div ref={quillRef}></div>
    </div>
  );
};

export default Editor;
