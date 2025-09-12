import Image from "apps/website/components/Image.tsx";
import Button from "site/components/ui/Button.tsx";
import Icon from "site/components/ui/Icon.tsx";
import BlogAuthorTag from "../components/blog/BlogAuthorTag.tsx";
import { BlogPostPage } from "apps/blog/types.ts";

interface Props {
  /**
   * @description The blog post page data
   */
  page?: BlogPostPage | null;
}

// Content styling with responsive design
const PARAGRAPH_STYLES =
  "[&_p]:text-dc-600 [&_p]:text-base [&_p]:md:text-lg [&_p]:lg:text-xl [&_p]:font-medium [&_p]:font-sans [&_p]:leading-relaxed [&_p]:md:leading-loose [&_p]:mb-4 [&_p]:md:mb-6 [&_p]:break-words [&_p]:hyphens-auto";
const HEADING_STYLES =
  "[&>h1]:text-dc-800 [&>h1]:text-2xl [&>h1]:md:text-3xl [&>h1]:lg:text-4xl [&>h1]:font-semibold [&>h1]:font-sans [&>h1]:leading-tight [&>h1]:my-6 [&>h1]:md:my-8 [&>h1]:lg:my-10 [&>h1]:break-words " +
  "[&>h2]:text-dc-800 [&>h2]:text-xl [&>h2]:md:text-2xl [&>h2]:lg:text-3xl [&>h2]:font-semibold [&>h2]:font-sans [&>h2]:leading-tight [&>h2]:md:leading-10 [&>h2]:mt-8 [&>h2]:md:mt-10 [&>h2]:mb-4 [&>h2]:md:mb-6 [&>h2]:break-words " +
  "[&>h3]:text-dc-800 [&>h3]:text-lg [&>h3]:md:text-xl [&>h3]:lg:text-2xl [&>h3]:font-semibold [&>h3]:font-sans [&>h3]:leading-tight [&>h3]:md:leading-7 [&>h3]:mt-6 [&>h3]:md:mt-8 [&>h3]:lg:mt-10 [&>h3]:mb-3 [&>h3]:md:mb-4 [&>h3]:break-words " +
  "[&>h4]:text-dc-800 [&>h4]:text-base [&>h4]:md:text-lg [&>h4]:lg:text-xl [&>h4]:font-semibold [&>h4]:font-sans [&>h4]:leading-tight [&>h4]:md:leading-7 [&>h4]:mt-6 [&>h4]:md:mt-8 [&>h4]:mb-3 [&>h4]:md:mb-4 [&>h4]:break-words " +
  "[&>h5]:text-dc-800 [&>h5]:text-sm [&>h5]:md:text-base [&>h5]:lg:text-lg [&>h5]:font-semibold [&>h5]:font-sans [&>h5]:leading-tight [&>h5]:mt-4 [&>h5]:md:mt-6 [&>h5]:mb-2 [&>h5]:md:mb-3 [&>h5]:break-words " +
  "[&>h6]:text-dc-800 [&>h6]:text-sm [&>h6]:md:text-base [&>h6]:font-semibold [&>h6]:font-sans [&>h6]:leading-tight [&>h6]:mt-4 [&>h6]:md:mt-6 [&>h6]:mb-2 [&>h6]:md:mb-3 [&>h6]:break-words";

const CODE_BLOCK_STYLES =
  "[&>pre]:bg-gray-100 [&>pre]:text-gray-800 [&>pre]:p-3 [&>pre]:md:p-4 [&>pre]:font-mono [&>pre]:text-xs [&>pre]:md:text-sm [&>pre]:border [&>pre]:rounded-md [&>pre]:overflow-x-auto [&>pre]:max-w-full [&>pre]:whitespace-pre-wrap [&>pre]:md:whitespace-pre [&>code]:block [&>code]:w-full [&>code]:break-all [&>code]:md:break-normal";
const IMAGE_STYLES =
  "[&_img]:rounded-lg [&_img]:md:rounded-2xl [&_img]:w-full [&_img]:h-auto [&_img]:my-6 [&_img]:md:my-8 [&_img]:lg:my-12 [&_img]:object-cover";
const BLOCKQUOTE_STYLES =
  "[&>blockquote]:my-4 [&>blockquote]:md:my-6 [&>blockquote]:border-l-2 [&>blockquote]:border-dc-300 [&>blockquote]:text-base [&>blockquote]:md:text-lg [&>blockquote]:lg:text-xl [&>blockquote]:italic [&>blockquote]:pl-4 [&>blockquote]:md:pl-6 [&>blockquote]:text-dc-600 [&>blockquote]:break-words";
const LIST_STYLES =
  "[&>ul]:list-disc [&>ul]:pl-4 [&>ul]:md:pl-6 [&>ul]:mb-4 [&>ul]:md:mb-6 [&>ul]:text-dc-600 [&>ul]:text-base [&>ul]:md:text-lg [&>ul]:lg:text-xl [&>ul]:font-medium [&>ul]:font-sans [&>ul]:leading-relaxed [&>ul]:md:leading-loose [&>ul]:break-words " +
  "[&>ol]:list-decimal [&>ol]:pl-4 [&>ol]:md:pl-6 [&>ol]:mb-4 [&>ol]:md:mb-6 [&>ol]:text-dc-600 [&>ol]:text-base [&>ol]:md:text-lg [&>ol]:lg:text-xl [&>ol]:font-medium [&>ol]:font-sans [&>ol]:leading-relaxed [&>ol]:md:leading-loose [&>ol]:break-words";

const CONTENT_STYLES =
  `${PARAGRAPH_STYLES} ${HEADING_STYLES} ${CODE_BLOCK_STYLES} ${IMAGE_STYLES} ${BLOCKQUOTE_STYLES} ${LIST_STYLES}`;

const DEFAULT_AVATAR =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e";

const DEFAULT_PROPS: BlogPostPage["post"] = {
  title: "Connect Your AI Workforce to Your Entire Tech Stack",
  excerpt: "Excerpt goes here",
  authors: [
    {
      name: "Full name",
      email: "author@deco.cx",
      image: DEFAULT_AVATAR,
    },
  ],
  categories: [
    { name: "Platform", slug: "platform" },
    { name: "Updates", slug: "updates" },
  ],
  date: "2025-05-21",
  image:
    "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9",
  slug: "blog-post",
  content:
    '<h1>Heading 1</h1><p>This is a paragraph under <strong>Heading 1</strong>. It can contain <em>italic</em> text, <strong>bold</strong> text, and even <code>code snippets</code>.</p><h2>Introduction</h2><p>Mi tincidunt elit, id quisque ligula ac diam, amet. Vel etiam suspendisse morbi eleifend faucibus eget vestibulum felis. Dictum quis montes, sit sit. Tellus aliquam enim urna, etiam. Mauris posuere vulputate arcu amet, vitae nisi, tellus tincidunt. At feugiat sapien varius id.</p><p>Eget quis mi enim, leo lacinia pharetra, semper. Eget in volutpat mollis at volutpat lectus velit, sed auctor. Porttitor fames arcu quis fusce augue enim. Quis at habitant diam at. Suscipit tristique risus, at donec. In turpis vel et quam imperdiet. Ipsum molestie aliquet sodales id est ac volutpat.</p><h2>Heading 2</h2><p>More text can be placed here. This section is under <strong>Heading 2</strong>.</p><h3>Heading 3 with Code Block</h3><p>This is an example of a code block:</p><pre><code>// This is a code block console.log("Hello, World!");</code></pre><h4>Heading 4 with Image</h4><p>Below is an image:</p><img src="https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/4763/682eb374-def2-4e85-a45d-b3a7ff8a31a9" alt="Description of Image"><p><strong>Dolor enim eu tortor urna sed duis nulla. Aliquam vestibulum, nulla odio nisl vitae. In aliquet pellentesque aenean hac vestibulum turpis mi bibendum diam. Tempor integer aliquam in vitae malesuada fringilla.</strong></p><p>Collaboratively deploy intuitive partnerships whereas customized e-markets. Energistically maintain performance based strategic theme areas whereas just in time methodologies. Phosfluorescently drive functionalized intellectual capital and.</p><blockquote>"Ipsum sit mattis nulla quam nulla. Gravida id gravida ac enim mauris id. Non pellentesque congue eget consectetur turpis. Sapien, dictum molestie sem tempor. Diam elit, orci, tincidunt aenean tempus."</blockquote><p>Tristique odio senectus nam posuere ornare leo metus, ultricies. Blandit duis ultricies vulputate morbi feugiat cras placerat elit. Aliquam tellus lorem sed ac. Montes, sed mattis pellentesque suscipit accumsan. Cursus viverra aenean magna risus elementum faucibus molestie pellentesque. Arcu ultricies sed mauris vestibulum.<h2>Conclusion</h2><p>Morbi sed imperdiet in ipsum, adipiscing elit dui lectus. Tellus id scelerisque est ultricies ultricies. Duis est sit sed leo nisl, blandit elit sagittis. Quisque tristique consequat quam sed. Nisl at scelerisque amet nulla purus habitasse.</p><p>Nunc sed faucibus bibendum feugiat sed interdum. Ipsum egestas condimentum mi massa. In tincidunt pharetra consectetur sed duis facilisis metus. Etiam egestas in nec sed et. Quis lobortis at sit dictum eget nibh tortor commodo cursus.</p><p>Odio felis sagittis, morbi feugiat tortor vitae feugiat fusce aliquet. Nam elementum urna nisi aliquet erat dolor enim. Ornare id morbi eget ipsum. Aliquam senectus neque ut id eget consectetur dictum. Donec posuere pharetra odio consequat scelerisque et, nunc tortor. Nulla adipiscing erat a erat. Condimentum lorem posuere gravida enim posuere cursus diam.</p>',
};

export default function BlogPost({ page }: Props) {
  // Add null checks when destructuring
  const post = page?.post || DEFAULT_PROPS;
  const title = post?.title || "";
  const authors = post?.authors || [];
  const image = post?.image || "";
  const date = post?.date || "";
  const content = post?.content || "";
  const categories = post?.categories || [];

  const formattedDate = date
    ? (() => {
      try {
        const dateObj = new Date(date);
        const dateStr = dateObj.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        const timeStr = dateObj.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        });
        return `${dateStr} at ${timeStr}`;
      } catch (e) {
        return date;
      }
    })()
    : "";

  return (
    <>
      {/* Hero Section */}
      <div className="w-full min-w-full relative bg-dc-50 flex flex-col justify-start items-center gap-12 md:gap-16 lg:gap-20 overflow-hidden px-4 md:px-8 lg:px-16 pt-16 md:pt-32">
        <div className="w-full md:w-[700px] max-w-[700px] flex flex-col justify-start items-start gap-6 md:gap-8 relative z-10">
          <div className="self-stretch flex flex-col justify-start items-center gap-6">
            <div className="self-stretch flex flex-col justify-start items-center gap-4">
              <div className="w-full flex justify-center">
                <Button
                  href="/blog"
                  variant="ghost"
                  size="small"
                >
                  <Icon name="arrow_back" class="text-dc-500" />
                  <span>Blog</span>
                </Button>
              </div>
              <h1 className="self-stretch text-center text-dc-800 text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold font-sans leading-tight break-words hyphens-auto">
                {title}
              </h1>
            </div>
            <div className="inline-flex flex-wrap justify-center items-center gap-2 md:gap-4">
              {/* Authors */}
              <BlogAuthorTag
                authors={authors}
                avatarSize={32}
                showName={true}
                textSize="base"
                textColor="text-dc-600"
                outlineColor="outline-white"
              />

              {/* Date */}
              {formattedDate && (
                <>
                  <div className="w-1 h-1 bg-dc-500 rounded-[1px]"></div>
                  <div className="justify-start text-dc-500 text-base md:text-lg lg:text-xl font-medium font-sans">
                    {formattedDate}
                  </div>
                </>
              )}

              {/* Categories */}
              {categories && categories.length > 0 && (
                <>
                  <div className="w-1 h-1 bg-dc-500 rounded-[1px]"></div>
                  <div className="flex flex-wrap justify-start items-start gap-2">
                    {categories.map((category, index) => {
                      if (!category) return null;
                      return (
                        <a
                          href={`/blog/${category.slug}`}
                          key={index}
                          className="px-3 md:px-4 py-1 bg-dc-50 rounded-full outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-center items-center gap-2 hover:bg-dc-100 transition-colors"
                        >
                          <div className="justify-center text-dc-600 text-sm md:text-base font-semibold font-sans leading-tight">
                            {category.name}
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="self-stretch pb-4 md:pb-6 flex flex-col justify-start items-center relative z-10">
          <div className="w-full md:w-[934px] aspect-video bg-primary-light rounded-2xl md:rounded-[32px] overflow-hidden">
            {image && (
              <Image
                src={image}
                alt={title}
                width={934}
                height={623}
                class="w-full h-full object-cover"
              />
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
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
    </>
  );
}

export function loader(
  props: Props,
  req: Request,
  ctx: any,
) {
  try {
    const relatedLoader = ctx.invoke("blog/loaders/BlogpostList.ts", {
      count: 3,
      postSlugs: [], // Empty to get all posts
      sortBy: "date_desc",
    });

    return {
      ...props,
      relatedPosts: relatedLoader?.posts || [],
    };
  } catch (error) {
    console.error("Error in BlogPost loader:", error);
    return props;
  }
}
