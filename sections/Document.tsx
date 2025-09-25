import { CONTENT_STYLES } from "./BlogPost.tsx";

export interface Props {
  /**
   * @format rich-text
   */
  content: string;
}

const Document = ({ content }: Props) => {
  console.log("rendering document", content.slice(0, 100));
  return (
    <div className="w-full min-w-full bg-dc-50 flex justify-center items-start overflow-hidden px-4 md:px-8 lg:px-16 py-12 md:py-16">
        <div className="flex-1 max-w-full md:max-w-[700px] flex flex-col justify-start items-start overflow-hidden">
            <div
            className={`${CONTENT_STYLES} w-full overflow-hidden`}
            id="blog-post-content"
            dangerouslySetInnerHTML={{
                __html: content.replaceAll("&lt;iframe", "<iframe ").replaceAll(
                "&lt;/iframe&gt;",
                " </iframe>",
                ).replaceAll("allowfullscreen&gt;", "allowfullscreen>") || "",
            }}
            />
        </div>
    </div>
  );
};

export default Document;
