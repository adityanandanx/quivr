"use client";
import Focus from "@tiptap/extension-focus";
import { Link } from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useBrainMention } from "@/app/chat/[chatId]/components/ActionsBar/components/ChatInput/components/ChatEditor/Editor/hooks/useBrainMention";
import { useChatStateUpdater } from "@/app/chat/[chatId]/components/ActionsBar/components/ChatInput/components/ChatEditor/Editor/hooks/useChatStateUpdater";
import { useChat } from "@/app/chat/[chatId]/hooks/useChat";

import styles from "./TextEditor.module.scss";
import { Toolbar } from "./components/Toolbar/Toolbar";

import { SearchBar } from "../ui/SearchBar/SearchBar";

const defaultContent = `

    <react-component>
      <p>This is editable. You can create a new component by pressing Mod+Enter.</p>
    </react-component>
    <h1>
      Hi there,
    </h1>
    <p>
      this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote><h1>
      Hi there,
    </h1>
    <p>
      this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote><h1>
      Hi there,
    </h1>
    <p>
      this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
`;

export const TextEditor = (): JSX.Element => {
  // const { currentBrain } = useBrainContext();
  const [message, setMessage] = useState("");
  const { BrainMention, items } = useBrainMention();

  const { messages, addQuestion, chatId } = useChat();

  const router = useRouter();

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({}),
        Focus.configure({
          className: styles.has_focus,
          mode: "shallowest",
        }),
        Link.configure({
          openOnClick: false,
        }),
        BrainMention,
      ],
      content: defaultContent,
      immediatelyRender: false,
      autofocus: true,
    },
    [items.length]
  );

  useChatStateUpdater({ editor, setMessage });

  if (!editor) {
    return <></>;
  }

  return (
    <div>
      <div className={styles.editor_wrapper}>
        <pre>{chatId}</pre>
        <pre>{JSON.stringify(messages, null, 2)}</pre>
        <Toolbar editor={editor} />
        <EditorContent className={styles.content_wrapper} editor={editor} />
        {/* <Editor message={message} setMessage={setMessage} onSubmit={() => ""} /> */}
      </div>
      <div className={styles.search_bar_wrapper}>
        <SearchBar
          onSearch={() => {
            console.log("Hi");
            console.log(chatId);
            if (chatId) {
              router.push(`/note/${chatId}`);
            }
          }}
          redirect={false}
        />
      </div>
    </div>
  );
};
