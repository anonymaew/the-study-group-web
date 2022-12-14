// import katex from 'katex';
import 'material-icons/iconfont/filled.css';

import Heading, { Level } from '@tiptap/extension-heading';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Youtube from '@tiptap/extension-youtube';
import { Editor, EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

const Button = (props: {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  materials: string;
  color?: string;
}) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className="group m-1 aspect-square h-8 w-8 items-center rounded-md p-1 transition duration-200 ease-in-out enabled:hover:bg-zinc-300 dark:enabled:hover:bg-zinc-700"
    >
      <span
        className="material-icons group-disabled:text-zinc-400 dark:group-disabled:text-zinc-600"
        style={{ color: props.active ? props.color || "#3b82f6" : "" }}
      >
        {props.materials || ""}
      </span>
    </button>
  );
};

const Select = (props: {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  activeIndex: number;
}) => {
  return (
    <select
      onChange={props.onChange}
      className="form-select rounded-md border-0 bg-zinc-200 transition duration-200 ease-in-out hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
    >
      {props.options.map((option, index) => (
        <option
          value={option.value}
          key={index}
          selected={index === props.activeIndex}
        >
          {option.label}
        </option>
      ))}
    </select>
  );
};

const Group = (props: { children: React.ReactNode }) => {
  return (
    <span className="flex h-6 items-center border-x border-zinc-400 px-1">
      {props.children}
    </span>
  );
};

const Toolbar = (props: { editor: Editor; save: () => void }) => {
  return (
    <div className="sticky top-28 z-10 flex rounded-md bg-zinc-200 p-2 dark:bg-zinc-800">
      <Group>
        <Button onClick={() => props.save()} materials="save" />
        <Button
          onClick={() => props.editor.chain().focus().undo().run()}
          disabled={!props.editor.can().chain().focus().undo().run()}
          materials="undo"
        />
        <Button
          onClick={() => props.editor.chain().focus().redo().run()}
          disabled={!props.editor.can().chain().focus().redo().run()}
          materials="redo"
        />
      </Group>
      <Group>
        <Select
          onChange={(e) =>
            props.editor
              .chain()
              .focus()
              .setHeading({ level: parseInt(e.currentTarget.value) as Level })
              .run()
          }
          activeIndex={
            props.editor.isActive("heading", { level: 2 })
              ? 1
              : props.editor.isActive("heading", { level: 3 })
              ? 2
              : props.editor.isActive("heading", { level: 4 })
              ? 3
              : 0
          }
          options={[
            { value: "5", label: "Normal" },
            { value: "2", label: "Heading 2" },
            { value: "3", label: "Heading 3" },
            { value: "4", label: "Heading 4" },
          ]}
        />
        <Button
          onClick={() => props.editor.chain().focus().toggleBold().run()}
          disabled={!props.editor.can().chain().focus().toggleBold().run()}
          active={props.editor.isActive("bold")}
          materials="format_bold"
        />
        <Button
          onClick={() => props.editor.chain().focus().toggleItalic().run()}
          disabled={!props.editor.can().chain().focus().toggleItalic().run()}
          active={props.editor.isActive("italic")}
          materials="format_italic"
        />
        <Button
          onClick={() => props.editor.chain().focus().toggleUnderline().run()}
          disabled={!props.editor.can().chain().focus().toggleUnderline().run()}
          active={props.editor.isActive("underline")}
          materials="format_underlined"
        />
        <Button
          onClick={() => props.editor.chain().focus().toggleCode().run()}
          disabled={!props.editor.can().chain().focus().toggleCode().run()}
          active={props.editor.isActive("code")}
          materials="code"
        />
        <Button
          onClick={() => props.editor.chain().focus().unsetAllMarks().run()}
          materials="format_clear"
        />
      </Group>
      <Group>
        <Button
          onClick={() => {
            const url = window.prompt("URL");
            if (url) props.editor.chain().focus().setLink({ href: url }).run();
          }}
          materials="link"
        />
        <Button
          onClick={() => {
            const url = window.prompt("URL");
            if (url) props.editor.chain().focus().setImage({ src: url }).run();
          }}
          materials="image"
        />
        <Button
          onClick={() => {
            const url = prompt("Enter YouTube URL");
            if (url)
              props.editor.commands.setYoutubeVideo({
                src: url,
              });
          }}
          materials="video_library"
        />
      </Group>
      <Group>
        <Button
          onClick={() => props.editor.chain().focus().toggleBulletList().run()}
          active={props.editor.isActive("bulletList")}
          materials="format_list_bulleted"
        />
        <Button
          onClick={() => props.editor.chain().focus().toggleOrderedList().run()}
          active={props.editor.isActive("orderedList")}
          materials="format_list_numbered"
        />
      </Group>
      <Group>
        <Button
          onClick={() => props.editor.chain().focus().toggleBlockquote().run()}
          active={props.editor.isActive("blockquote")}
          materials="format_quote"
        />
        <Button
          onClick={() => props.editor.chain().focus().toggleCodeBlock().run()}
          active={props.editor.isActive("codeBlock")}
          materials="terminal"
        />
        <Button
          onClick={() => props.editor.chain().focus().setHorizontalRule().run()}
          materials="horizontal_rule"
        />
        <Button
          onClick={() => props.editor.chain().focus().setHardBreak().run()}
          materials="insert_page_break"
        />
      </Group>
    </div>
  );
};

const RichTextEditor = (props: {
  content: string;
  save: (content: string) => void;
  writable: boolean;
}) => {
  const editor = useEditor({
    editable: props.writable,
    extensions: [
      StarterKit,
      Heading.configure({ levels: [2, 3, 4] }),
      Image,
      Underline,
      Link,
      Youtube,
    ],
    content: props.content,
  });

  return (
    <div>
      {editor !== null && (
        <>
          {props.writable && (
            <Toolbar
              editor={editor}
              save={() => props.save(editor.getHTML())}
            />
          )}
          <EditorContent className="" editor={editor} />
        </>
      )}
    </div>
  );
};

export default RichTextEditor;
