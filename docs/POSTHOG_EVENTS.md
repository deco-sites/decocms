# PostHog Events

## Home (`/`)

| Onde clicar | Evento |
|-------------|--------|
| Botão "Book a demo" no Hero | `hero_ai_platform_cta_click` |
| GitHub Stars no Header | `lp_header_github_click` |
| Bullet "Enterprise Context Layer" | `backbone_mcp_mesh_bullet_click` |
| Bullet "Generate MCP Apps" | `backbone_mcp_studio_bullet_click` |
| Bullet "Distribute and scale" | `backbone_mcp_apps_+_store_bullet_click` |
| Link "Learn about MCP Mesh" no card | `backbone_mcp_mesh_link_click` |
| Link "Get Studio Early Access" no card | `backbone_mcp_studio_link_click` |
| Botão "Book a demo" no CTA final | `final_cta_simple_click` |
| Scroll 25% da página | `home_page_scroll_25` |
| Scroll 50% da página | `home_page_scroll_50` |
| Scroll 75% da página | `home_page_scroll_75` |
| Scroll 100% da página | `home_page_scroll_100` |

---

## MCP Mesh (`/mcp-mesh`)

| Onde clicar | Evento |
|-------------|--------|
| Copiar comando no Hero | `mcp_mesh_hero_copy_command_click` |
| Botão "View docs" no Hero | `mcp_mesh_hero_docs_click` |
| Play no vídeo | `mcp_mesh_video_play_click_play` |
| Vídeo atingiu 25% | `mcp_mesh_video_play_click_progress_25` |
| Vídeo atingiu 50% | `mcp_mesh_video_play_click_progress_50` |
| Vídeo atingiu 75% | `mcp_mesh_video_play_click_progress_75` |
| Pausar vídeo | `mcp_mesh_video_play_click_pause` |
| Vídeo completo | `mcp_mesh_video_play_click_complete` |
| Copiar comando no CTA final | `mcp_mesh_final_cta_copy_command_click` |
| Botão "Read our Docs" no CTA final | `mcp_mesh_final_cta_docs_click` |

---

## MCP Studio (`/mcp-studio`)

| Onde clicar | Evento |
|-------------|--------|
| Enviar prompt no Hero | `lp_hero_prompt_submit` |
| Clicar em template de prompt | `lp_hero_prompt_template_click` |

---

## deco.cx (`/deco-sites`)

| Onde clicar | Evento |
|-------------|--------|
| Botão "Talk to sales" | `deco_sites_hero_talk_to_sales_click` |
| Botão "Read our docs" | `deco_sites_hero_read_docs_click` |

---

## Pricing (`/pricing`)

| Onde clicar | Evento |
|-------------|--------|
| Toggle para "AI Platform" | `pricing_toggle_ai_platform_click` |
| Toggle para "deco.cx" | `pricing_toggle_deco_cx_click` |
| Copiar comando plano Free (AI Platform) | `pricing_ai_platform_free_copy_click` |
| Botão Enterprise (AI Platform) | `pricing_ai_platform_enterprise_cta_click` |
| Botão Free (deco.cx) | `pricing_deco_cx_free_cta_click` |
| Botão Pro (deco.cx) | `pricing_deco_cx_pro_cta_click` |
| Botão Enterprise (deco.cx) | `pricing_deco_cx_enterprise_cta_click` |

---

## Global

| Onde clicar | Evento |
|-------------|--------|
| Botão "Join our Discord" no CTA final | `lp_finalcta_community_click` |

---

## Como adicionar novos eventos

```tsx
// Opção 1: TrackedLink
import TrackedLink from "../islands/TrackedLink.tsx";

<TrackedLink href="/destino" event="nome_do_evento" properties={{ prop: "valor" }}>
  Texto
</TrackedLink>

// Opção 2: trackEvent
import { trackEvent } from "../sdk/tracking.ts";

trackEvent("nome_do_evento", { prop: "valor" });
```
