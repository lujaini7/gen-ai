/* eslint-disable react/prop-types */
import { useRef, useEffect } from "react";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { GrResources } from "react-icons/gr";
import { IoLibrary } from "react-icons/io5";
import { fetchConversationsByChatAndBot } from "../../util";
import { useSelector } from "react-redux";

const references = [
  {
    title: "What Is The Future Of SEO In 2024 - SkillVertex",
    source: "skillvertex",
  },
  {
    title:
      "Exploring the Future of SEO in 2024: Trends and Predictions - seobase",
    source: "seobase",
  },
  {
    title: "The Future of SEO: Predictions and Strategies for 2024 - LinkedIn",
    source: "LinkedIn",
  },
];

const related = [
  "what are some examples of ai-powered seo tools",
  "how can businesses optimize their content for ai-powered search algorithms",
  "what are the potential risks of relying too heavily on ai for seo",
  "what are the most important seo trends to watch out for in 2024",
  "how can businesses adapt to the changing landscape of seo",
];
function Messages({ messages, me }) {
  const bottomRef = useRef(null);
  useEffect(() => {
    if (bottomRef && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });
  return (
    <ul className={"messagesList"}>
      {messages.map((m) => Message(m, me))}
      <div ref={bottomRef}></div>
    </ul>
  );
}

function Message(msg, me) {
  // const { username, color } = member.clientData;
  const content = msg?.content;
  // 2
  const messageFromMe = msg.author === "Human";
  const className = messageFromMe
    ? "messagesMessage currentMember"
    : "messagesMessage";
  // 3
  return (
    <li key={Math.random()} className={className}>
      <span className={"avatar"} style={{ backgroundColor: "lightblue" }} />
      <div className="ml-2">
        <div className={"messageContent"}>
          <div className={"username"}>
            {msg.author === "Human" ? "You" : msg?.author}
          </div>
          <div className={"text"}>
            {messageFromMe ? (
              content
            ) : (
              <BotReply
                text={msg?.content}
                references={msg?.references}
                related={msg?.related}
              />
            )}
          </div>
        </div>
        {!messageFromMe && (
          <div className="flex gap-1 mt-1 justify-end">
            <AiOutlineLike
              className="cursor-pointer hover:text-red"
              onMouseOver={({ target }) => (target.style.color = "#e91f63")}
              onMouseOut={({ target }) => (target.style.color = "#000")}
            />
            <AiOutlineDislike
              className="cursor-pointer"
              onMouseOver={({ target }) => (target.style.color = "#545252")}
              onMouseOut={({ target }) => (target.style.color = "#000")}
            />
          </div>
        )}
      </div>
    </li>
  );
}

function BotReply({ text, references, related }) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2 ">
        <IoLibrary className="text-xl" />
        <p className="text-xl font-bold">Sources</p>
      </div>
      <div className="flex justify-center gap-2 mb-4">
        {references?.map((reference, index) => (
          <div
            key={index}
            className="flex-1 overflow-hidden p-2 bg-[#c2c6cd] rounded-md cursor-pointer"
          >
            <p className="truncate text-ellipsis text-sm mb-2 text-wrap">
              {reference?.title}
            </p>
            <p className="text-xs">{reference?.source}</p>
          </div>
        ))}
      </div>
      <div className="mb-3">{text}</div>
      <div>
        <div className="flex items-center gap-2 mb-2 ">
          <GrResources className="text-xl font-bold" />
          <p className="text-xl font-bold">Related</p>
        </div>
        <div>
          {related?.map((item, index) => (
            <p
              className="border-t-2 border-black py-1 cursor-pointer hover:text-cyan-300"
              key={index}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Messages;
