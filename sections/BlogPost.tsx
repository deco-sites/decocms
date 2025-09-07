import Image from "apps/website/components/Image.tsx";
import Button from "site/components/ui/Button.tsx";
import Icon from "site/components/ui/Icon.tsx";
import BlogAuthorTag from "../components/blog/BlogAuthorTag.tsx";
import { BlogAuthor, BlogCategory } from "../types/blog.ts";

// Define the BlogPost type locally to avoid import issues
interface BlogPost {
  title?: string;
  excerpt?: string;
  authors?: BlogAuthor[];
  categories?: BlogCategory[];
  date?: string;
  image?: string;
  slug?: string;
  content?: string;
}

interface BlogPostPage {
  post?: BlogPost;
}

interface Props {
  /**
   * @description The blog post page data
   */
  page?: BlogPostPage | null;
}

// Content styling with updated design
const PARAGRAPH_STYLES =
  "[&_p]:text-dc-600 [&_p]:text-xl [&_p]:font-medium [&_p]:font-helvetica-neue [&_p]:leading-loose [&_p]:mb-6";
const HEADING_STYLES =
  "[&>h1]:text-dc-800 [&>h1]:text-4xl [&>h1]:font-semibold [&>h1]:font-helvetica-neue [&>h1]:leading-tight [&>h1]:my-10 " +
  "[&>h2]:text-dc-800 [&>h2]:text-3xl [&>h2]:font-semibold [&>h2]:font-helvetica-neue [&>h2]:leading-10 [&>h2]:mt-10 [&>h2]:mb-6 " +
  "[&>h3]:text-dc-800 [&>h3]:text-2xl [&>h3]:font-semibold [&>h3]:font-helvetica-neue [&>h3]:leading-7 [&>h3]:mt-10 [&>h3]:mb-4 " +
  "[&>h4]:text-dc-800 [&>h4]:text-xl [&>h4]:font-semibold [&>h4]:font-helvetica-neue [&>h4]:leading-7 [&>h4]:mt-8 [&>h4]:mb-4 " +
  "[&>h5]:text-dc-800 [&>h5]:text-lg [&>h5]:font-semibold [&>h5]:font-helvetica-neue [&>h5]:leading-tight [&>h5]:mt-6 [&>h5]:mb-3 " +
  "[&>h6]:text-dc-800 [&>h6]:text-base [&>h6]:font-semibold [&>h6]:font-helvetica-neue [&>h6]:leading-tight [&>h6]:mt-6 [&>h6]:mb-3";

const CODE_BLOCK_STYLES =
  "[&>pre]:bg-gray-100 [&>pre]:text-gray-800 [&>pre]:p-4 [&>pre]:font-mono [&>pre]:text-sm [&>pre]:border [&>pre]:rounded-md [&>pre]:overflow-x-auto [&>code]:block [&>code]:w-full";
const IMAGE_STYLES = "[&_img]:rounded-2xl [&_img]:w-full [&_img]:my-12";
const BLOCKQUOTE_STYLES =
  "[&>blockquote]:my-6 [&>blockquote]:border-l-2 [&>blockquote]:border-dc-300 [&>blockquote]:text-xl [&>blockquote]:italic [&>blockquote]:pl-6 [&>blockquote]:text-dc-600";
const LIST_STYLES =
  "[&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-6 [&>ul]:text-dc-600 [&>ul]:text-xl [&>ul]:font-medium [&>ul]:font-helvetica-neue [&>ul]:leading-loose " +
  "[&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:mb-6 [&>ol]:text-dc-600 [&>ol]:text-xl [&>ol]:font-medium [&>ol]:font-helvetica-neue [&>ol]:leading-loose";

const CONTENT_STYLES =
  `${PARAGRAPH_STYLES} ${HEADING_STYLES} ${CODE_BLOCK_STYLES} ${IMAGE_STYLES} ${BLOCKQUOTE_STYLES} ${LIST_STYLES}`;

const DEFAULT_AVATAR =
  "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/1527/7286de42-e9c5-4fcb-ae8b-b992eea4b78e";

const DEFAULT_PROPS: BlogPost = {
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

// Extend the BlogPostPage type to include allPosts
interface ExtendedBlogPostPage extends BlogPostPage {
  allPosts?: BlogPost[];
}

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
    ? new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
    : "";

  return (
    <>
      {/* Hero Section */}
      <div className="w-full min-w-full relative bg-dc-50 flex flex-col justify-start items-center gap-20 overflow-hidden px-4 md:px-8 lg:px-16 pt-16">
        <div className="w-full md:w-[700px] max-w-[700px] flex flex-col justify-start items-start gap-8 relative z-10">
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
              <h1 className="self-stretch text-center text-dc-800 text-4xl md:text-5xl lg:text-6xl font-semibold font-helvetica-neue leading-tight">
                {title}
              </h1>
            </div>
            <div className="inline-flex flex-wrap justify-center items-center gap-4">
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
                  <div className="justify-start text-dc-500 text-xl font-medium font-helvetica-neue">
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
                          className="px-4 py-1 bg-dc-50 rounded-full outline outline-1 outline-offset-[-1px] outline-dc-200 flex justify-center items-center gap-2 hover:bg-dc-100 transition-colors"
                        >
                          <div className="justify-center text-dc-600 text-base font-semibold font-helvetica-neue leading-tight">
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
        <div className="self-stretch pb-6 flex flex-col justify-start items-center relative z-10">
          <div className="w-full md:w-[934px] aspect-video bg-primary-light rounded-[32px] overflow-hidden">
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
      <div className="w-full min-w-full bg-dc-50 flex justify-center items-start overflow-hidden px-4 md:px-8 lg:px-16 py-16">
        <div className="flex-1 max-w-full md:max-w-[700px] flex flex-col justify-start items-start">
          <div
            className={CONTENT_STYLES}
            dangerouslySetInnerHTML={{
              __html: content || "",
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
