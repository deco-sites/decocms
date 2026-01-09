# PostHog Events

## Home (`/`)

| Where to click | Event |
|----------------|-------|
| "Book a demo" button in Hero | `hero_ai_platform_cta_click` |
| GitHub Stars in Header | `lp_header_github_click` |
| "Enterprise Context Layer" bullet | `backbone_mcp_mesh_bullet_click` |
| "Generate MCP Apps" bullet | `backbone_mcp_studio_bullet_click` |
| "Distribute and scale" bullet | `backbone_mcp_apps_+_store_bullet_click` |
| "Learn about MCP Mesh" link in card | `backbone_mcp_mesh_link_click` |
| "Get Studio Early Access" link in card | `backbone_mcp_studio_link_click` |
| "Book a demo" button in final CTA | `final_cta_simple_click` |
| Scroll 25% of page | `home_page_scroll_25` |
| Scroll 50% of page | `home_page_scroll_50` |
| Scroll 75% of page | `home_page_scroll_75` |
| Scroll 100% of page | `home_page_scroll_100` |

---

## MCP Mesh (`/mcp-mesh`)

| Where to click | Event |
|----------------|-------|
| Copy command in Hero | `mcp_mesh_hero_copy_command_click` |
| "View docs" button in Hero | `mcp_mesh_hero_docs_click` |
| Play video | `mcp_mesh_video_play_click_play` |
| Video reached 25% | `mcp_mesh_video_play_click_progress_25` |
| Video reached 50% | `mcp_mesh_video_play_click_progress_50` |
| Video reached 75% | `mcp_mesh_video_play_click_progress_75` |
| Pause video | `mcp_mesh_video_play_click_pause` |
| Video complete | `mcp_mesh_video_play_click_complete` |
| Copy command in final CTA | `mcp_mesh_final_cta_copy_command_click` |
| "Read our Docs" button in final CTA | `mcp_mesh_final_cta_docs_click` |

---

## MCP Studio (`/mcp-studio`)

| Where to click | Event |
|----------------|-------|
| Submit prompt in Hero | `lp_hero_prompt_submit` |
| Click on prompt template | `lp_hero_prompt_template_click` |

---

## deco.cx (`/deco-sites`)

| Where to click | Event |
|----------------|-------|
| "Talk to sales" button | `deco_sites_hero_talk_to_sales_click` |
| "Read our docs" button | `deco_sites_hero_read_docs_click` |

---

## Pricing (`/pricing`)

| Where to click | Event |
|----------------|-------|
| Toggle to "AI Platform" | `pricing_toggle_ai_platform_click` |
| Toggle to "deco.cx" | `pricing_toggle_deco_cx_click` |
| Copy command Free plan (AI Platform) | `pricing_ai_platform_free_copy_click` |
| Enterprise button (AI Platform) | `pricing_ai_platform_enterprise_cta_click` |
| Free button (deco.cx) | `pricing_deco_cx_free_cta_click` |
| Pro button (deco.cx) | `pricing_deco_cx_pro_cta_click` |
| Enterprise button (deco.cx) | `pricing_deco_cx_enterprise_cta_click` |

---

## Global

| Where to click | Event |
|----------------|-------|
| "Join our Discord" button in final CTA | `lp_finalcta_community_click` |

---

## How to add new events

```tsx
// Option 1: TrackedLink
import TrackedLink from "../islands/TrackedLink.tsx";

<TrackedLink href="/destination" event="event_name" properties={{ prop: "value" }}>
  Text
</TrackedLink>

// Option 2: trackEvent
import { trackEvent } from "../sdk/tracking.ts";

trackEvent("event_name", { prop: "value" });
```
